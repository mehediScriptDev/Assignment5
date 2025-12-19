import React from 'react';
import { Link } from 'react-router';

const CompanyDashboard = () => {
  return (
    <main className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Welcome back, TechCorp! 👋</h1>
        <p className="text-muted-foreground">Here's what's happening with your job postings today</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <i data-lucide="briefcase" className="h-6 w-6 text-blue-600"></i>
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-1">24</h3>
          <p className="text-sm text-muted-foreground">Active Jobs</p>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
              <i data-lucide="users" className="h-6 w-6 text-green-600"></i>
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-1">156</h3>
          <p className="text-sm text-muted-foreground">Total Applicants</p>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 rounded-lg bg-yellow-100 flex items-center justify-center">
              <i data-lucide="clock" className="h-6 w-6 text-yellow-600"></i>
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-1">32</h3>
          <p className="text-sm text-muted-foreground">Pending Reviews</p>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <i data-lucide="star" className="h-6 w-6 text-purple-600"></i>
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-1">18</h3>
          <p className="text-sm text-muted-foreground">Shortlisted</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Recent Job Posts</h2>
                <Link to="/manage-jobs" className="text-sm text-primary">View All</Link>
              </div>
            </div>
            <div className="divide-y divide-border">
              <div className="p-6 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">Senior Full Stack Developer</h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">Remote • Full-time • $120k - $160k</div>
                  </div>
                  <div className="text-sm text-muted-foreground">3 applicants</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="lg:col-span-1">
          <div className="card p-6">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <Link to="/create-job" className="btn btn-primary w-full mb-3"><i data-lucide="plus" className="h-4 w-4 mr-2"></i>Post Job</Link>
            <Link to="/manage-jobs" className="btn btn-outline w-full">Manage Jobs</Link>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default CompanyDashboard;
