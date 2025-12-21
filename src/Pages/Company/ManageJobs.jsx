import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import {
  FiBriefcase,
  FiPlus,
  FiChevronRight,
  FiSearch,
  FiMapPin,
  FiFilter,
  FiChevronDown,
  FiEdit,
  FiTrash2,
  FiPauseCircle,
  FiPlayCircle,
  FiCheckCircle,
  FiChevronLeft
} from 'react-icons/fi';
import { BiBuilding } from 'react-icons/bi';
import client from '../../api/client';
import { useToast } from '../../context/ToastContext';

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const PAGE_SIZE = 6;
  const navigate = useNavigate();
  const { showToast } = useToast();

  const fetchJobs = async (p = 1, q = '') => {
    try {
      setLoading(true);
      const res = await client.get('/companies/jobs', { params: { page: p, limit: PAGE_SIZE, search: q } });
      if (res.data && res.data.success) {
        setJobs(res.data.data || []);
        setTotal(res.data.count || 0);
        setTotalPages(res.data.totalPages || 1);
        setPage(res.data.currentPage || p);
      } else {
        showToast && showToast(res.data?.message || 'Failed to load jobs', { type: 'error' });
      }
    } catch (err) {
      console.error('Failed to fetch jobs', err);
      showToast && showToast(err?.response?.data?.message || err.message || 'Server error', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchJobs(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this job? This action cannot be undone.')) return;
    try {
      const res = await client.delete(`/jobs/${id}`);
      if (res.data && res.data.success) {
        showToast && showToast('Job deleted', { type: 'success' });
        fetchJobs(page, search);
      } else {
        showToast && showToast(res.data?.message || 'Failed to delete job', { type: 'error' });
      }
    } catch (err) {
      console.error('Delete error', err);
      showToast && showToast(err?.response?.data?.message || err.message || 'Server error', { type: 'error' });
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const submitSearch = (e) => {
    e.preventDefault();
    fetchJobs(1, search);
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === page) return;
    setPage(newPage);
    fetchJobs(newPage, search);
  };

  return (
    <div className="bg-background text-foreground antialiased">
      {/* Header is provided by global layout */}

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-[hsl(var(--color-muted-foreground))] mb-2">
            <Link to="/company/dashboard" className="hover:text-[hsl(var(--color-primary))]">Dashboard</Link>
            <FiChevronRight className="h-4 w-4" />
            <span className="text-[hsl(var(--color-foreground))]">Manage Jobs</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Manage Jobs</h1>
              <p className="text-[hsl(var(--color-muted-foreground))]">View and manage all your job postings</p>
            </div>
            <Link to="/company/create-job" className="btn btn-primary">
              <FiPlus className="h-4 w-4 mr-2" />
              Create New Job
            </Link>
          </div>
        </div>

        {/* Filters and Search */}
        <form className="card p-4 mb-6" onSubmit={submitSearch}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(var(--color-muted-foreground))]" />
                <input type="search" value={search} onChange={handleSearch} placeholder="Search jobs by title, location..." className="input pl-10" />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <button type="button" onClick={() => fetchJobs(1, search)} className="btn btn-outline">Search</button>
              </div>
              <div className="relative">
                <button type="button" onClick={() => { setSearch(''); fetchJobs(1, ''); }} className="btn btn-outline">Reset</button>
              </div>
            </div>
          </div>
        </form>

        {/* Jobs Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[hsl(var(--color-muted))] border-b border-[hsl(var(--color-border))]">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-medium"><input type="checkbox" className="rounded border-[hsl(var(--color-input))]" /></th>
                  <th className="text-left py-4 px-6 text-sm font-medium">Job Title</th>
                  <th className="text-left py-4 px-6 text-sm font-medium">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-medium">Applicants</th>
                  <th className="text-left py-4 px-6 text-sm font-medium">Posted Date</th>
                  <th className="text-left py-4 px-6 text-sm font-medium">Expires</th>
                  <th className="text-right py-4 px-6 text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[hsl(var(--color-border))]">
                {loading ? (
                  Array.from({ length: PAGE_SIZE }).map((_, i) => (
                    <tr key={`skeleton-${i}`} className="animate-pulse">
                      <td className="py-4 px-6"><div className="h-4 w-4 rounded bg-[hsl(var(--color-muted))]" /></td>
                      <td className="py-4 px-6">
                        <div className="h-4 bg-[hsl(var(--color-muted))] rounded w-3/4 mb-2" />
                        <div className="h-3 bg-[hsl(var(--color-muted))] rounded w-1/2" />
                      </td>
                      <td className="py-4 px-6"><div className="h-4 bg-[hsl(var(--color-muted))] rounded w-16" /></td>
                      <td className="py-4 px-6"><div className="h-4 bg-[hsl(var(--color-muted))] rounded w-8" /></td>
                      <td className="py-4 px-6"><div className="h-4 bg-[hsl(var(--color-muted))] rounded w-24" /></td>
                      <td className="py-4 px-6"><div className="h-4 bg-[hsl(var(--color-muted))] rounded w-24" /></td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end">
                          <div className="h-8 bg-[hsl(var(--color-muted))] rounded w-24" />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : jobs.length === 0 ? (
                  <tr><td colSpan={7} className="p-6">No jobs found</td></tr>
                ) : (
                  jobs.map((job) => (
                    <tr key={job.id} className="hover:bg-[hsl(var(--color-accent))] transition-colors">
                      <td className="py-4 px-6"><input type="checkbox" className="rounded border-[hsl(var(--color-input))]" /></td>
                      <td className="py-4 px-6">
                        <div>
                          <Link to={`/jobs/${job.slug}`} className="font-medium hover:text-[hsl(var(--color-primary))]">{job.title}</Link>
                          <div className="flex items-center gap-3 mt-1 text-xs text-[hsl(var(--color-muted-foreground))]">
                            <span className="flex items-center gap-1"><FiMapPin className="h-3 w-3" />{job.location || 'Remote'}</span>
                            <span className="flex items-center gap-1"><FiBriefcase className="h-3 w-3" />{job.type || ''}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6"><span className={`badge ${job.status === 'Active' ? 'badge-success' : 'badge-outline'}`}>{job.status}</span></td>
                      <td className="py-4 px-6"><div className="flex items-center gap-2"><span className="font-medium">{job.applicants ?? 0}</span></div></td>
                      <td className="py-4 px-6 text-sm text-[hsl(var(--color-muted-foreground))]">{job.createdAt ? new Date(job.createdAt).toLocaleDateString() : ''}</td>
                      <td className="py-4 px-6 text-sm text-[hsl(var(--color-muted-foreground))]">{job.deadline ? new Date(job.deadline).toLocaleDateString() : '-'}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => navigate(`/company/create-job?jobId=${job.id}`)} className="btn-ghost p-2" title="Edit"><FiEdit className="h-4 w-4" /></button>
                          <button onClick={() => handleDelete(job.id)} className="btn-ghost p-2 text-red-600" title="Delete"><FiTrash2 className="h-4 w-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* (Removed duplicate pagination — using the bottom pagination controls instead) */}
          </div>

          {/* Bulk Actions Bar (hidden by default) */}
          <div className="hidden p-4 bg-[hsl(var(--color-accent))] border-t border-[hsl(var(--color-border))]" id="bulkActionsBar">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium"><span id="selectedCount">0</span> jobs selected</span>
              <div className="flex items-center gap-2">
                <button className="btn btn-outline text-sm h-9"><FiPauseCircle className="h-3 w-3 mr-2" />Deactivate</button>
                <button className="btn btn-outline text-sm h-9"><FiPlayCircle className="h-3 w-3 mr-2" />Activate</button>
                <button className="btn btn-outline text-sm h-9 text-red-600"><FiTrash2 className="h-3 w-3 mr-2" />Delete</button>
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t border-[hsl(var(--color-border))]">
            <div className="flex items-center justify-between">
              <div className="text-sm text-[hsl(var(--color-muted-foreground))]">Showing <span className="font-medium">{Math.max(1, (page - 1) * PAGE_SIZE + 1)}</span> to <span className="font-medium">{Math.min(total, page * PAGE_SIZE)}</span> of <span className="font-medium">{total}</span> jobs</div>
              <div className="flex items-center gap-2">
                <button onClick={() => handlePageChange(page - 1)} className="btn btn-outline h-9 px-3" disabled={loading || page <= 1}><FiChevronLeft className="h-4 w-4" /></button>

                {(() => {
                  const buttons = [];
                  const maxButtons = 5; // show a few page buttons
                  let start = Math.max(1, page - Math.floor(maxButtons / 2));
                  let end = start + maxButtons - 1;
                  if (end > totalPages) { end = totalPages; start = Math.max(1, end - maxButtons + 1); }
                  for (let i = start; i <= end; i++) {
                    buttons.push(
                      <button key={i} onClick={() => handlePageChange(i)} className={`h-9 px-3 ${i === page ? 'btn btn-primary' : 'btn btn-outline'}`} disabled={loading || i === page}>{i}</button>
                    );
                  }
                  return buttons;
                })()}

                <button onClick={() => handlePageChange(page + 1)} className="btn btn-outline h-9 px-3" disabled={loading || page >= totalPages}><FiChevronRight className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManageJobs;