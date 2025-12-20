import React, { useEffect, useState } from 'react';
import client from '../../../api/client';
import { Link } from 'react-router';
import { FiBriefcase, FiUsers } from 'react-icons/fi';

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await client.get('/jobs');
        if (res.data && res.data.success) setJobs(res.data.data || []);
      } catch (e) {
        console.error('Failed to load jobs', e);
        setError('Failed to load jobs');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className="py-6 text-center text-sm text-muted-foreground">Loading jobs...</div>;
  if (error) return <div className="py-6 text-center text-sm text-destructive">{error}</div>;

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
            <button className="btn btn-outline">Load More Jobs</button>
            <div className="text-sm text-muted-foreground mt-2">Showing {Math.min(jobs.length,5)} of {jobs.length} jobs</div>
          </div>
        </div>
      )}
    </section>
  );
};

export default JobsList;
