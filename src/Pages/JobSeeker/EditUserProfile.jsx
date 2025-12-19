import React from 'react';
import { Link } from 'react-router';

const EditUserProfile = () => {
  return (
    <main className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Edit Profile</h1>
        <p className="text-muted-foreground">Update your personal details and resume.</p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="card p-6">
          <label className="label">Full name</label>
          <input className="input mb-4" placeholder="John Doe" />

          <label className="label">Email</label>
          <input className="input mb-4" placeholder="john.doe@example.com" />

          <div className="flex gap-2">
            <button className="btn btn-primary">Save</button>
            <Link to="/user-profile" className="btn btn-outline">Cancel</Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EditUserProfile;
