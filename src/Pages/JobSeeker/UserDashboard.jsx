import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import client from '../../api/client';

const UserDashboard = () => {
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
        if (res.data && res.data.success) setRecommendations(res.data.data || []);
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
    if (!confirm('Are you sure you want to withdraw this application?')) return;
    try {
      await client.delete(`/applications/${applicationId}`);
      setApplications(prev => prev.filter(a => a.id !== applicationId));
      alert('Application withdrawn');
    } catch (err) {
      console.error('Withdraw failed', err);
      alert(err?.response?.data?.message || 'Failed to withdraw application');
    }
  };

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your activity and recommended jobs.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <div className="card p-6 mb-6">
            <h3 className="font-semibold mb-2">Profile</h3>
            <p className="text-sm text-muted-foreground mb-4">Complete your profile to get better matches.</p>
            <Link to="/edit-user-profile" className="btn btn-primary">Edit Profile</Link>
          </div>

          <div className="card p-6">
            <h3 className="font-semibold mb-2">Recent Applications</h3>
            {loadingApps ? (
              <p className="text-sm text-muted-foreground">Loading...</p>
            ) : applications.length === 0 ? (
              <p className="text-sm text-muted-foreground">You have no recent applications.</p>
            ) : (
              <div className="space-y-4">
                {applications.slice(0,5).map(app => {
                  const job = app.job || {};
                  const appliedDate = app.createdAt ? new Date(app.createdAt).toLocaleDateString() : '';
                  const salary = job.salaryMin || job.salaryMax ? `${job.salaryMin ? `$${job.salaryMin}` : ''}${job.salaryMin && job.salaryMax ? ' - ' : ''}${job.salaryMax ? `$${job.salaryMax}` : ''}` : '';
                  const statusClass = (() => {
                    switch ((app.status || '').toLowerCase()) {
                      case 'under review':
                      case 'new':
                        return 'badge badge-default';
                      case 'interview scheduled':
                      case 'interviewed':
                        return 'badge badge-info';
                      case 'pending':
                        return 'badge badge-secondary';
                      case 'shortlisted':
                        return 'badge badge-success';
                      case 'rejected':
                        return 'badge badge-danger';
                      default:
                        return 'badge badge-outline';
                    }
                  })();

                  return (
                    <article key={app.id} className="card p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="h-10 w-10 rounded-md bg-secondary flex items-center justify-center">
                            <i data-lucide="briefcase" className="h-5 w-5 text-primary"></i>
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg">{job.title || 'Job Title'}</h4>
                            <div className="text-sm text-muted-foreground">{job.company?.name || ''}</div>
                            <div className="text-sm text-muted-foreground mt-2 flex items-center gap-3">
                              <span className="flex items-center gap-2"><i data-lucide="map-pin" className="h-4 w-4"></i>{job.location || ''}</span>
                              <span className="flex items-center gap-2">• Applied on {appliedDate}</span>
                              {salary && <span className="flex items-center gap-2">• {salary}</span>}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-3">
                          <span className={statusClass}>{app.status || 'Status'}</span>
                          <div className="flex items-center gap-2">
                            <Link to={`/jobs/${job.slug}`} className="btn btn-outline text-sm">View Job</Link>
                            {app.status && ['new', 'under review', 'pending'].includes((app.status || '').toLowerCase()) ? (
                              <button onClick={() => withdraw(app.id)} className="btn btn-ghost text-sm">Withdraw Application</button>
                            ) : (
                              <button className="btn btn-ghost text-sm">Reschedule</button>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="card p-6 lg:col-span-2">
          <h3 className="font-semibold mb-2">Recommended Jobs</h3>
          {loadingRecs ? (
            <p className="text-sm text-muted-foreground">Loading recommendations...</p>
          ) : recommendations.length === 0 ? (
            <p className="text-sm text-muted-foreground">No recommendations available yet.</p>
          ) : (
            <ul className="space-y-4">
              {recommendations.map(job => (
                <li key={job.id} className="border p-4 rounded flex items-start justify-between">
                  <div>
                    <Link to={`/jobs/${job.slug}`} className="font-semibold text-lg">{job.title}</Link>
                    <div className="text-sm text-muted-foreground">{job.company?.name}</div>
                    <div className="text-sm mt-2">{job.location} • {job.type}</div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Link to={`/jobs/${job.slug}`} className="btn btn-outline">View</Link>
                    <Link to={`/jobs/${job.slug}`} className="btn btn-primary">Apply</Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
};

export default UserDashboard;
