import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { FiMail, FiPhone, FiMapPin, FiBriefcase, FiFileText, FiEdit } from 'react-icons/fi';
import client from '../../api/client';

const getFileUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  const baseUrl = import.meta.env.VITE_API_BASE?.replace('/api', '') || 'http://localhost:5000';
  return `${baseUrl}${path}`;
};

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const res = await client.get('/users/profile');
        if (mounted) {
          if (res.data && res.data.success) {
            const userData = res.data.data;
            // Parse skills if it's a string
            if (userData.skills && typeof userData.skills === 'string') {
              try {
                userData.skills = JSON.parse(userData.skills);
              } catch (e) {
                userData.skills = [];
              }
            }
            setUser(userData);
          } else {
            setError('Failed to load user');
          }
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

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-2 text-muted-foreground">Loading profile…</p>
      </div>
    </div>
  );
  if (error) return (
    <div className="py-6 text-center">
      <p className="text-red-600">{error}</p>
    </div>
  );

  if (!user) return null;

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Profile</h1>
          <p className="text-muted-foreground">View and manage your public profile.</p>
        </div>
        <Link to="/edit-user-profile" className="btn btn-primary">
          <FiEdit className="h-4 w-4 mr-2" />
          Edit Profile
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar - Profile Card */}
        <div className="card p-6">
          <div className="text-center">
            <div className="inline-flex h-24 w-24 rounded-full bg-secondary items-center justify-center overflow-hidden mb-4 border-2 border-border">
              {user.profilePictureUrl ? (
                <img src={getFileUrl(user.profilePictureUrl)} alt="avatar" className="h-full w-full object-cover" />
              ) : (
                <div className="text-2xl font-bold text-primary">
                  {(user.name || '').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
              )}
            </div>
            <h2 className="text-xl font-semibold mb-1">{user.name}</h2>
            {user.title && <p className="text-sm text-muted-foreground mb-4">{user.title}</p>}
          </div>

          <div className="mt-6 space-y-4">
            {user.email && (
              <div className="flex items-start gap-3">
                <FiMail className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium mb-1">Email</div>
                  <a href={`mailto:${user.email}`} className="text-muted-foreground hover:text-primary">{user.email}</a>
                </div>
              </div>
            )}
            
            {user.phone && (
              <div className="flex items-start gap-3">
                <FiPhone className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium mb-1">Phone</div>
                  <a href={`tel:${user.phone}`} className="text-muted-foreground hover:text-primary">{user.phone}</a>
                </div>
              </div>
            )}
            
            {user.location && (
              <div className="flex items-start gap-3">
                <FiMapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium mb-1">Location</div>
                  <p className="text-muted-foreground">{user.location}</p>
                </div>
              </div>
            )}
          </div>

          {user.resumeUrl && (
            <div className="mt-6 pt-6 border-t border-border">
              <a 
                className="btn btn-outline w-full" 
                href={getFileUrl(user.resumeUrl)} 
                target="_blank" 
                rel="noreferrer"
              >
                <FiFileText className="h-4 w-4 mr-2" />
                Download Resume
              </a>
            </div>
          )}
        </div>

        {/* Right Content - Bio and Skills */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6">
            <h3 className="text-xl font-semibold mb-4">About Me</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {user.bio || 'No bio added yet. Click "Edit Profile" to add information about yourself.'}
            </p>
          </div>

          {user.skills && Array.isArray(user.skills) && user.skills.length > 0 && (
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {user.skills.map(skill => (
                  <span key={skill} className="badge badge-secondary">{skill}</span>
                ))}
              </div>
            </div>
          )}

          <div className="card p-6">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 gap-4">
              <Link to="/applied-jobs" className="btn btn-outline">
                <FiBriefcase className="h-4 w-4 mr-2" />
                My Applications
              </Link>
              <Link to="/user-dashboard" className="btn btn-outline">
                <FiBriefcase className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserProfile;
