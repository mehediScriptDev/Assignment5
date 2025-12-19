import React from 'react';
import { Link } from 'react-router';

const ManageJobs = () => {
  return (
    <main className="container mx-auto px-4 py-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Jobs</h1>
        <Link to="/create-job" className="btn btn-primary"><i data-lucide="plus" className="h-4 w-4 mr-2"></i>New Job</Link>
      </div>

      <div className="card">
        <div className="p-6 border-b border-border">
          <h2 className="font-semibold">Your Jobs</h2>
        </div>
        <div className="divide-y divide-border">
          <div className="p-6 flex items-start justify-between">
            <div>
              <h3 className="font-semibold">Senior Full Stack Developer</h3>
              <div className="text-sm text-muted-foreground">Remote • Full-time</div>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/applicants" className="btn btn-outline">Applicants</Link>
              <button className="btn btn-outline">Edit</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ManageJobs;
