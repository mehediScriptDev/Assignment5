import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import {
  FiChevronRight,
  FiLoader,
  FiMapPin,
  FiMail,
  FiBriefcase,
  FiEye,
  FiDownload,
  FiCheck,
  FiX,
  FiClock,
  FiSearch,
  FiChevronLeft,
  FiChevronRight as FiCR
} from 'react-icons/fi';
import client from '../../api/client';
import { useToast } from '../../context/ToastContext';

const PAGE_SIZE = 8;

const Applicants = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [statusFilters, setStatusFilters] = useState({ new: true, shortlisted: false, interviewed: false, rejected: false });
  const [experienceFilters, setExperienceFilters] = useState({ entry: false, mid: true, senior: true });
  const [appliedDate, setAppliedDate] = useState('24h');
  const { showToast } = useToast();

  const fetchApplicants = async (p = 1, opts = {}) => {
    try {
      setLoading(true);
      const params = { page: p, limit: PAGE_SIZE };
      if (opts.search !== undefined) params.search = opts.search;
      else if (search) params.search = search;
      if (opts.status !== undefined) params.status = opts.status;
      else if (status) params.status = status;

      const res = await client.get('/companies/applicants', { params });
      if (res.data && res.data.success) {
        setApplicants(res.data.data || []);
        setTotal(res.data.count || 0);
        setTotalPages(res.data.totalPages || 1);
        setPage(res.data.currentPage || p);
      } else {
        showToast && showToast(res.data?.message || 'Failed to load applicants', { type: 'error' });
      }
    } catch (err) {
      console.error('Failed to fetch applicants', err);
      showToast && showToast(err?.response?.data?.message || err.message || 'Server error', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchApplicants(1); }, []);

  const handleSearch = (e) => setSearch(e.target.value);
  const submitSearch = (e) => { e.preventDefault(); fetchApplicants(1, { search }); };

  const handleResetFilters = () => {
    setSearch('');
    setStatus('');
    setStatusFilters({ new: true, shortlisted: false, interviewed: false, rejected: false });
    setExperienceFilters({ entry: false, mid: true, senior: true });
    setAppliedDate('24h');
    fetchApplicants(1, { search: '', status: '' });
  };

  const openResume = (app) => {
    const resume = app.resumeUrl || app.resume || app.resumeUrl;
    if (!resume) {
      showToast && showToast('No resume available for this applicant', { type: 'error' });
      return;
    }
    try {
      const base = client.defaults?.baseURL || '';
      const href = resume.startsWith('http') ? resume : `${base}${resume}`;
      window.open(href, '_blank');
    } catch (e) {
      console.error('Open resume failed', e);
      showToast && showToast('Could not open resume', { type: 'error' });
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      // confirmation for rejecting
      if (newStatus === 'Rejected') {
        let confirmed = false;
        try {
          const Swal = (await import('sweetalert2')).default;
          const result = await Swal.fire({ title: 'Reject applicant?', text: 'This will mark application as rejected.', icon: 'warning', showCancelButton: true });
          confirmed = !!result.isConfirmed;
        } catch (e) {
          confirmed = confirm('Reject applicant?');
        }
        if (!confirmed) return;
      }

      const res = await client.patch(`/applications/${id}/status`, { status: newStatus });
      if (res.data && res.data.success) {
        showToast && showToast('Status updated', { type: 'success' });
        fetchApplicants(page);
      } else {
        showToast && showToast(res.data?.message || 'Failed to update status', { type: 'error' });
      }
    } catch (err) {
      console.error('Update status error', err);
      showToast && showToast(err?.response?.data?.message || err.message || 'Server error', { type: 'error' });
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === page) return;
    fetchApplicants(newPage);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-[hsl(var(--color-muted-foreground))] mb-2">
          <Link to="/company/dashboard" className="hover:text-[hsl(var(--color-primary))]">Dashboard</Link>
          <FiChevronRight className="h-4 w-4" />
          <span className="text-[hsl(var(--color-foreground))]">Applicants</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Job Applicants</h1>
            <p className="text-[hsl(var(--color-muted-foreground))]">Review and manage applicants</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Filters</h3>
              <button onClick={handleResetFilters} className="text-sm text-[hsl(var(--color-primary))] hover:underline">Reset</button>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-medium mb-3">Application Status</h4>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={statusFilters.new} onChange={() => { setStatusFilters(prev => { const next = { ...prev, new: !prev.new }; const list = Object.keys(next).filter(k => next[k]).map(k => k); fetchApplicants(1, { status: list.join(',') }); return next; }); }} className="rounded border-[hsl(var(--color-input))]" />
                  <span className="text-sm">New Applications</span>
                  <span className="ml-auto text-sm text-[hsl(var(--color-muted-foreground))]">({total})</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={statusFilters.shortlisted} onChange={() => { setStatusFilters(prev => { const next = { ...prev, shortlisted: !prev.shortlisted }; const list = Object.keys(next).filter(k => next[k]).map(k => k); fetchApplicants(1, { status: list.join(',') }); return next; }); }} className="rounded border-[hsl(var(--color-input))]" />
                  <span className="text-sm">Shortlisted</span>
                  <span className="ml-auto text-sm text-[hsl(var(--color-muted-foreground))]">(0)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={statusFilters.interviewed} onChange={() => { setStatusFilters(prev => { const next = { ...prev, interviewed: !prev.interviewed }; const list = Object.keys(next).filter(k => next[k]).map(k => k); fetchApplicants(1, { status: list.join(',') }); return next; }); }} className="rounded border-[hsl(var(--color-input))]" />
                  <span className="text-sm">Interviewed</span>
                  <span className="ml-auto text-sm text-[hsl(var(--color-muted-foreground))]">(0)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={statusFilters.rejected} onChange={() => { setStatusFilters(prev => { const next = { ...prev, rejected: !prev.rejected }; const list = Object.keys(next).filter(k => next[k]).map(k => k); fetchApplicants(1, { status: list.join(',') }); return next; }); }} className="rounded border-[hsl(var(--color-input))]" />
                  <span className="text-sm">Rejected</span>
                  <span className="ml-auto text-sm text-[hsl(var(--color-muted-foreground))]">(0)</span>
                </label>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-medium mb-3">Experience Level</h4>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={experienceFilters.entry} onChange={() => setExperienceFilters(prev => ({ ...prev, entry: !prev.entry }))} className="rounded border-[hsl(var(--color-input))]" />
                  <span className="text-sm">Entry Level (0-2 years)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={experienceFilters.mid} onChange={() => setExperienceFilters(prev => ({ ...prev, mid: !prev.mid }))} className="rounded border-[hsl(var(--color-input))]" />
                  <span className="text-sm">Mid Level (3-5 years)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={experienceFilters.senior} onChange={() => setExperienceFilters(prev => ({ ...prev, senior: !prev.senior }))} className="rounded border-[hsl(var(--color-input))]" />
                  <span className="text-sm">Senior (5+ years)</span>
                </label>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-3">Applied Date</h4>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="applied-date" checked={appliedDate === '24h'} onChange={() => { setAppliedDate('24h'); fetchApplicants(1, { date: 'last 7 days' }); }} className="border-[hsl(var(--color-input))]" />
                  <span className="text-sm">Last 24 hours</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="applied-date" checked={appliedDate === '7d'} onChange={() => { setAppliedDate('7d'); fetchApplicants(1, { date: 'last 7 days' }); }} className="border-[hsl(var(--color-input))]" />
                  <span className="text-sm">Last 7 days</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="applied-date" checked={appliedDate === '30d'} onChange={() => { setAppliedDate('30d'); fetchApplicants(1, { date: 'last 30 days' }); }} className="border-[hsl(var(--color-input))]" />
                  <span className="text-sm">Last 30 days</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="applied-date" checked={appliedDate === 'all'} onChange={() => { setAppliedDate('all'); fetchApplicants(1, { date: '' }); }} className="border-[hsl(var(--color-input))]" />
                  <span className="text-sm">All time</span>
                </label>
              </div>
            </div>
          </div>
        </aside>

        <div className="lg:col-span-3">
          <div className="space-y-4">
            {loading ? (
              <div className="p-6">Loading applicants...</div>
            ) : applicants.length === 0 ? (
              <div className="p-6">No applicants found</div>
            ) : (
              applicants.map((app) => {
                const user = app.user || {};
                const job = app.job || {};
                return (
                  <div key={app.id} className="card p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="shrink-0">
                        <div className="h-16 w-16 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">{(user.name || user.email || 'A').slice(0,2).toUpperCase()}</div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                          <div>
                            <h3 className="text-lg font-semibold">{user.name || user.email || 'Applicant'}</h3>
                            <div className="text-sm text-[hsl(var(--color-muted-foreground))] flex items-center gap-3 mt-1">
                              <span className="flex items-center gap-1"><FiMail className="h-4 w-4" /> {user.email}</span>
                              <span className="flex items-center gap-1"><FiBriefcase className="h-4 w-4" /> {user.experienceLevel || '-'}</span>
                              <span className="flex items-center gap-1"><FiClock className="h-4 w-4" /> {app.createdAt ? new Date(app.createdAt).toLocaleString() : ''}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`badge ${app.status === 'Shortlisted' ? 'badge-success' : app.status === 'Rejected' ? 'badge-outline' : 'badge-info'}`}>{app.status}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="badge badge-secondary">{job.title || '—'}</span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Link to={`/company/applicants/${app.id}`} className="btn btn-outline inline-flex items-center"><FiEye className="h-4 w-4 mr-2" /> View Profile</Link>
                          <button onClick={() => openResume(app)} className="btn btn-outline inline-flex items-center"><FiDownload className="h-4 w-4 mr-2" /> Resume</button>
                          {app.status !== 'Shortlisted' && <button onClick={() => updateStatus(app.id, 'Shortlisted')} className="btn btn-primary inline-flex items-center"><FiCheck className="h-4 w-4 mr-2" /> Shortlist</button>}
                          {app.status !== 'Rejected' && <button onClick={() => updateStatus(app.id, 'Rejected')} className="btn btn-ghost inline-flex items-center text-red-600"><FiX className="h-4 w-4 mr-2" /> Reject</button>}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-[hsl(var(--color-muted-foreground))]">Showing page <span className="font-medium">{page}</span> of <span className="font-medium">{totalPages}</span> — <span className="font-medium">{total}</span> applicants</div>
            <div className="flex items-center gap-2">
              <button onClick={() => handlePageChange(page - 1)} className="btn btn-outline h-9 px-3" disabled={loading || page <= 1}><FiChevronLeft className="h-4 w-4" /></button>
              {(() => {
                const buttons = [];
                const maxButtons = 5;
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
              <button onClick={() => handlePageChange(page + 1)} className="btn btn-outline h-9 px-3" disabled={loading || page >= totalPages}><FiCR className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Applicants;
