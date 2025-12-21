import React, { useEffect, useState, useContext, useMemo } from 'react';
import { Link } from 'react-router';
import client from '../../api/client';
import { AuthContext } from '../../context/AuthContext';
import { FiBriefcase, FiMapPin, FiUsers, FiUser, FiEdit2, FiFileText, FiCheckCircle, FiClock, FiXCircle } from 'react-icons/fi';
import { useToast } from '../../context/ToastContext';

const UserDashboard = () => {
  const { showToast } = useToast();
  const [applications, setApplications] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loadingApps, setLoadingApps] = useState(true);
  const [loadingRecs, setLoadingRecs] = useState(true);

  useEffect(() => {
    const loadApps = async () => {
      try {
        setLoadingApps(true);
        const res = await client.get('/applications/my-applications');
        if (res.data && res.data.success) setApplications(res.data.data || []);
      } catch (e) {
        console.error('Failed to load applications', e);
      } finally {
        setLoadingApps(false);
      }
    };

    const loadRecs = async () => {
      try {
        setLoadingRecs(true);
        const res = await client.get('/jobs/recommendations');
        console.debug('Recommendations response:', res?.data);
        if (res.data && res.data.success && Array.isArray(res.data.data) && res.data.data.length > 0) {
          setRecommendations(res.data.data || []);
        } else {
          // Fallback: load general jobs so the dashboard still shows suggestions
          console.debug('No recommendations returned; falling back to /jobs');
          const fallback = await client.get('/jobs');
          if (fallback.data && fallback.data.success) setRecommendations(fallback.data.data || []);
        }
      } catch (e) {
        console.error('Failed to load recommendations', e);
      } finally {
        setLoadingRecs(false);
      }
    };

    loadApps();
    loadRecs();
  }, []);

  const withdraw = async (applicationId) => {
    // Use SweetAlert2 if available for confirm, otherwise fallback to window.confirm
    try {
      let confirmed = false;
      try {
        const Swal = (await import('sweetalert2')).default;
        const result = await Swal.fire({ title: 'Withdraw application?', text: 'Are you sure you want to withdraw this application?', icon: 'warning', showCancelButton: true, confirmButtonText: 'Withdraw' });
        confirmed = !!result.isConfirmed;
      } catch (e) {
        confirmed = confirm('Are you sure you want to withdraw this application?');
      }
      if (!confirmed) return;
      await client.delete(`/applications/${applicationId}`);
      setApplications(prev => prev.filter(a => a.id !== applicationId));
      showToast && showToast('Application withdrawn', { type: 'success' });
    } catch (err) {
      console.error('Withdraw failed', err);
      showToast && showToast(err?.response?.data?.message || 'Failed to withdraw application', { type: 'error' });
    }
  };

  const auth = useContext(AuthContext);
  const name = auth?.user?.name || 'User';

  const stats = useMemo(() => {
    const total = applications.length;
    const pending = applications.filter(a => a.status === 'pending').length;
    const accepted = applications.filter(a => a.status === 'accepted').length;
    const rejected = applications.filter(a => a.status === 'rejected').length;
    return { total, pending, accepted, rejected };
  }, [applications]);

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {name}! <span aria-hidden>👋</span></h1>
        <p className="text-muted-foreground">Here's what's happening with your job search today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Applications</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <FiBriefcase className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Pending</p>
              <p className="text-2xl font-bold">{stats.pending}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
              <FiClock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Accepted</p>
              <p className="text-2xl font-bold">{stats.accepted}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
              <FiCheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Rejected</p>
              <p className="text-2xl font-bold">{stats.rejected}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
              <FiXCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Recent Applications section removed per request */}

          <div className="card p-6 mt-6">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold mb-0">Recommended for You</h3>
              <Link to="/jobs" className="text-sm text-muted-foreground hover:underline">Browse All Jobs</Link>
            </div>
          {loadingRecs ? (
            <p className="text-sm text-muted-foreground">Loading recommendations...</p>
          ) : recommendations.length === 0 ? (
            <p className="text-sm text-muted-foreground">No recommendations available yet.</p>
          ) : (
            <div className="space-y-4">
              {recommendations.map(job => (
                <article key={job.id} className="card p-6 rounded-lg">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-md bg-secondary flex items-center justify-center">
                        <FiBriefcase className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg"><Link to={`/jobs/${job.slug}`}>{job.title}</Link></h3>
                        <div className="text-sm text-muted-foreground mt-1">{job.company?.name}</div>
                        <p className="text-sm text-muted-foreground mt-3 max-w-3xl">{(job.description || job.summary || '').slice(0,200)}</p>

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
                        {(() => {
                          const foundApp = applications.find(a => (a.job && a.job.id === job.id) || a.jobId === job.id || a.job_id === job.id);
                          if (foundApp) {
                            return (
                              <button
                                className="btn btn-primary"
                                style={{ background: '#fff8e1', borderColor: '#fff8e1', color: '#111827' }}
                                onClick={() => withdraw(foundApp.id)}
                              >
                                Withdraw
                              </button>
                            );
                          }
                          return <Link to={`/jobs/${job.slug}`} className="btn btn-primary">Apply Now</Link>;
                        })()}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
          </div>
        </div>

        <aside className="lg:col-span-1">
          <div className="card p-6 mb-6">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/user-profile" className="flex items-center gap-3 text-sm hover:text-primary">
                  <FiUser className="text-primary" size={18} />
                  <span>View Profile</span>
                </Link>
              </li>
              <li>
                <Link to="/edit-user-profile" className="flex items-center gap-3 text-sm hover:text-primary">
                  <FiEdit2 className="text-primary" size={18} />
                  <span>Edit Profile</span>
                </Link>
              </li>
              <li>
                <Link to="/applied-jobs" className="flex items-center gap-3 text-sm hover:text-primary">
                  <FiFileText className="text-primary" size={18} />
                  <span>My Applications</span>
                </Link>
              </li>
              
            </ul>
          </div>

          <div className="card p-4 bg-primary/5">
            <h4 className="font-semibold mb-2">Pro Tip</h4>
            <p className="text-sm text-muted-foreground">Applications submitted within 24 hours of posting have a 3x higher response rate.</p>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default UserDashboard;
