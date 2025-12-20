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
              <ul className="space-y-3">
                {applications.slice(0,5).map(app => (
                  <li key={app.id} className="border p-3 rounded">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{app.job?.title || 'Job'}</div>
                        <div className="text-sm text-muted-foreground">{app.job?.company?.name || ''}</div>
                      </div>
                      <div className="text-sm text-muted-foreground">{new Date(app.createdAt).toLocaleDateString()}</div>
                    </div>
                  </li>
                ))}
              </ul>
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
