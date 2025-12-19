import React from 'react';
import { Link } from 'react-router';

const Applicants = () => {
  return (
    <main className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Link to="/manage-jobs" className="hover:text-primary">Manage Jobs</Link>
          <i data-lucide="chevron-right" className="h-4 w-4"></i>
          <span className="text-foreground">Applicants</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Applicants</h1>
      </div>

      <div className="space-y-4">
        <div className="card p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center">
              <i data-lucide="user" className="h-6 w-6 text-primary"></i>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Jane Smith</h3>
              <div className="text-sm text-muted-foreground">Frontend Developer • Applied 3 days ago</div>
            </div>
            <div className="flex items-center gap-2">
              <button className="btn btn-outline">View</button>
              <button className="btn btn-primary">Shortlist</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Applicants;
