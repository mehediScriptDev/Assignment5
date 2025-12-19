import React from 'react';
import { Link } from 'react-router';

const UserProfile = () => {
  return (
    <main className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Profile</h1>
        <p className="text-muted-foreground">View and manage your public profile.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card p-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center">
              <i data-lucide="user" className="h-8 w-8 text-primary"></i>
            </div>
            <div>
              <h3 className="font-semibold">John Doe</h3>
              <p className="text-sm text-muted-foreground">San Francisco, CA</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 card p-6">
          <h3 className="font-semibold mb-2">About</h3>
          <p className="text-sm text-muted-foreground">Short bio goes here.</p>
          <div className="mt-4">
            <Link to="/edit-user-profile" className="btn btn-outline">Edit Profile</Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserProfile;
