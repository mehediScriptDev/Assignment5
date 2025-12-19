import React from 'react';
import { Link } from 'react-router';

const JobDetails = () => {
  return (
    <main className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Link to="/user-dashboard" className="hover:text-primary">Dashboard</Link>
          <i data-lucide="chevron-right" className="h-4 w-4"></i>
          <span className="text-foreground">Job Details</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Senior Full Stack Developer</h1>
        <p className="text-muted-foreground">Company • Location • Salary</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="card p-6">
            <h3 className="font-semibold mb-2">Job description</h3>
            <p className="text-sm text-muted-foreground">Full job description goes here.</p>
          </div>
          <div className="card p-6">
            <h3 className="font-semibold mb-2">Responsibilities</h3>
            <ul className="list-disc pl-5 text-sm text-muted-foreground">
              <li>Build and maintain web applications</li>
            </ul>
          </div>
        </div>
        <aside className="lg:col-span-1">
          <div className="card p-6">
            <h3 className="font-semibold mb-2">Apply</h3>
            <button className="btn btn-primary w-full">Withdraw Application</button>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default JobDetails;
