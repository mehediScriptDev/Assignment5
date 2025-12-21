import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import client from '../../api/client';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const res = await client.get('/auth/me');
        if (mounted) {
          if (res.data && res.data.success) setUser(res.data.data);
          else setError('Failed to load user');
        }
      } catch (e) {
        console.error('Failed to load current user', e);
        if (mounted) setError(e?.response?.data?.message || 'Failed to load user');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  if (loading) return <div className="py-6 text-center">Loading profile…</div>;
  if (error) return <div className="py-6 text-center text-destructive">{error}</div>;

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Profile</h1>
        <p className="text-muted-foreground">View and manage your public profile.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card p-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
              {user.profilePictureUrl ? (
                <img src={user.profilePictureUrl} alt="avatar" className="h-full w-full object-cover" />
              ) : (
                <div className="text-primary font-semibold">{(user.name || '').split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
              )}
            </div>
            <div>
              <h3 className="font-semibold">{user.name}</h3>
              {user.location && <p className="text-sm text-muted-foreground">{user.location}</p>}
              {user.title && <div className="text-sm text-muted-foreground">{user.title}</div>}
            </div>
          </div>

          <div className="mt-4">
            <div className="text-sm"><strong>Email:</strong> {user.email}</div>
            {user.phone && <div className="text-sm"><strong>Phone:</strong> {user.phone}</div>}
            {user.resumeUrl && (
              <div className="mt-2">
                <a className="btn btn-outline btn-sm" href={user.resumeUrl} target="_blank" rel="noreferrer">Download Resume</a>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-2 card p-6">
          <h3 className="font-semibold mb-2">About</h3>
          <p className="text-sm text-muted-foreground">{user.bio || 'No bio added yet.'}</p>

          {Array.isArray(user.skills) && user.skills.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium">Skills</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {user.skills.map(s => <span key={s} className="badge badge-outline">{s}</span>)}
              </div>
            </div>
          )}

          <div className="mt-6">
            <Link to="/edit-user-profile" className="btn btn-outline">Edit Profile</Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserProfile;
