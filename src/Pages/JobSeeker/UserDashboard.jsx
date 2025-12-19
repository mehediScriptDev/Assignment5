import React from 'react';
import { Link } from 'react-router';

const UserDashboard = () => {
  return (
    <main className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your activity and recommended jobs.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card p-6">
          <h3 className="font-semibold mb-2">Profile</h3>
          <p className="text-sm text-muted-foreground mb-4">Complete your profile to get better matches.</p>
          <Link to="/edit-user-profile" className="btn btn-primary">Edit Profile</Link>
        </div>

        <div className="card p-6 lg:col-span-2">
          <h3 className="font-semibold mb-2">Recommended Jobs</h3>
          <p className="text-sm text-muted-foreground">Jobs tailored to your profile will appear here.</p>
        </div>
      </div>
    </main>
  );
};

export default UserDashboard;
