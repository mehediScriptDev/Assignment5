import React, { useEffect, useState, useRef } from 'react';
import client from '../../../api/client';
import { Link } from 'react-router';
import { FiBriefcase, FiUsers } from 'react-icons/fi';

// Helper to map salary range labels to numeric bounds
const salaryRangeToBounds = (rangeLabel) => {
  if (!rangeLabel) return [null, null];
  const r = rangeLabel.replace(/\s+/g, '');
  if (r === '$0-$50k') return [0, 50000];
  if (r === '$50k-$100k') return [50000, 100000];
  if (r === '$100k-$150k') return [100000, 150000];
  if (r === '$150k+') return [150000, null];
  // fallback: attempt to parse numbers
  const nums = rangeLabel.match(/(\d+[\,\d]*)/g);
  if (!nums) return [null, null];
  const parsed = nums.map(n => parseInt(n.toString().replace(/,/g, '')));
  if (parsed.length === 1) return [parsed[0], null];
  return [parsed[0], parsed[1]];
};

const JobsList = ({ filters = {}, search = '', pageSize = 10 }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const cancelRef = useRef(null);

  // Build query params from filters and search
  const buildParams = (p = page) => {
    const params = { page: p, limit: pageSize };
    if (search && search.trim()) params.search = search.trim();

    // Types
    if (filters.jobTypes && filters.jobTypes.length > 0) {
      params.type = filters.jobTypes.join(',');
    }

    if (filters.experienceLevels && filters.experienceLevels.length > 0) {
      // Normalize common UI labels to backend expected enums
      const mapExp = (label) => {
        const l = label.toLowerCase();
        if (l.includes('entry')) return 'Entry';
        if (l.includes('mid')) return 'Mid';
        if (l.includes('senior')) return 'Senior';
        if (l.includes('lead') || l.includes('principal')) return 'Lead';
        if (l.includes('expert')) return 'Expert';
        return label;
      };
      params.experienceLevel = filters.experienceLevels.map(mapExp).join(',');
    }

    if (filters.skills && filters.skills.length > 0) {
      params.skills = filters.skills.join(',');
    }

    if (filters.salaryRanges && filters.salaryRanges.length > 0) {
      // derive min and max from selected ranges
      let mins = [];
      let maxs = [];
      filters.salaryRanges.forEach(r => {
        const [min, max] = salaryRangeToBounds(r);
        if (min !== null && min !== undefined) mins.push(min);
        if (max !== null && max !== undefined) maxs.push(max);
      });
      if (mins.length > 0) params.minSalary = Math.min(...mins);
      if (maxs.length > 0) params.maxSalary = Math.max(...maxs);
    }

    return params;
  };

  useEffect(() => {
    // reset when filters or search change
    setPage(1);
    setJobs([]);
    setTotalPages(1);
  }, [JSON.stringify(filters), search]);

    useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        // cancel previous
        if (cancelRef.current) cancelRef.current.cancel && cancelRef.current.cancel();

        const params = buildParams(page);
        console.debug('JobsList: fetching /jobs with params', params);
        const res = await client.get('/jobs', { params });
        console.debug('JobsList: response', res && res.data);
        if (res.data && res.data.success) {
          const data = res.data.data || [];
          setTotalPages(res.data.totalPages || 1);
          setJobs(prev => (page === 1 ? data : [...prev, ...data]));
        } else {
          setError('Failed to load jobs');
        }
      } catch (e) {
        console.error('Failed to load jobs', e);
        setError(e?.response?.data?.message || 'Failed to load jobs');
      } finally {
        setLoading(false);
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, JSON.stringify(filters), search]);

  if (loading && jobs.length === 0) return <div className="py-6 text-center text-sm text-muted-foreground">Loading jobs...</div>;
  if (error && jobs.length === 0) return <div className="py-6 text-center text-sm text-destructive">{error}</div>;

  const onLoadMore = () => {
    if (page < totalPages && !loading) {
      console.debug('JobsList: load more, current page', page);
      setPage(prev => prev + 1);
    }
  };

  return (
    <section className="container mx-auto px-4 py-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Available Jobs</h2>
        <div className="text-sm text-muted-foreground">Showing {jobs.length} results</div>
      </div>

      {jobs.length === 0 ? (
        <div className="text-sm text-muted-foreground">No jobs found.</div>
      ) : (
        <div className="space-y-6">
          {jobs.map(job => (
            <article key={job.id} className="card p-6 rounded-lg">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-md bg-secondary flex items-center justify-center">
                      <FiBriefcase className="h-6 w-6 text-primary" />
                    </div>
                  <div>
                    <h3 className="font-semibold text-lg">{job.title}</h3>
                    <div className="text-sm text-muted-foreground mt-1">{job.company?.name} • {job.location} • {job.postedAgo || '2 days ago'}</div>
                    <p className="text-sm text-muted-foreground mt-3 max-w-3xl">{job.description?.slice(0, 200) || job.summary || ''}</p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {(job.skills || []).slice(0,5).map(s => (
                        <span key={s} className="badge badge-outline text-xs">{s}</span>
                      ))}
                    </div>

                    <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="font-semibold">{job.salaryMin || job.salaryMax ? `${job.salaryMin ? `$${job.salaryMin}` : ''}${job.salaryMin && job.salaryMax ? ' - ' : ''}${job.salaryMax ? `$${job.salaryMax}` : ''}` : ''}</div>
                      <div className="flex items-center gap-2"><FiUsers className="h-4 w-4" />{job.applicants || 0} applicants</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Link to={`/jobs/${job.slug}`} className="btn btn-outline">View Details</Link>
                    <Link to={`/jobs/${job.slug}`} className="btn btn-primary">Apply Now</Link>
                  </div>
                </div>
              </div>
            </article>
          ))}

          <div className="text-center mt-6">
            <div className="mb-2 text-sm text-muted-foreground">Page {page} of {totalPages}</div>
            <button className="btn btn-outline" onClick={onLoadMore} disabled={loading || page >= totalPages}>
              {loading ? (page === 1 ? 'Loading...' : 'Loading more…') : (page < totalPages ? 'Load More Jobs' : 'No More Jobs')}
            </button>
            <div className="text-sm text-muted-foreground mt-2">Showing {jobs.length} jobs</div>
          </div>
        </div>
      )}
    </section>
  );
};

export default JobsList;
