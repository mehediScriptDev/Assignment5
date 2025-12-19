import React from 'react';
import { Link } from 'react-router';

const AppliedJobs = () => {
  return (
    <main className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Link to="/user-dashboard" className="hover:text-primary">Dashboard</Link>
          <i data-lucide="chevron-right" className="h-4 w-4"></i>
          <span className="text-foreground">Applied Jobs</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Applied Jobs</h1>
            <p className="text-muted-foreground">Track all your job applications in one place</p>
          </div>
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">12</span> applications
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1">
          <div className="card p-6 sticky top-20">
            <h2 className="font-semibold mb-4">Filters</h2>
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Application Status</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-input" defaultChecked />
                  <span className="text-sm">All</span>
                  <span className="ml-auto text-xs text-muted-foreground">12</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-input" />
                  <span className="text-sm">Under Review</span>
                  <span className="ml-auto text-xs text-muted-foreground">5</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-input" />
                  <span className="text-sm">Shortlisted</span>
                  <span className="ml-auto text-xs text-muted-foreground">3</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-input" />
                  <span className="text-sm">Rejected</span>
                  <span className="ml-auto text-xs text-muted-foreground">2</span>
                </label>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Application Date</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="date" className="border-input" defaultChecked />
                  <span className="text-sm">All Time</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="date" className="border-input" />
                  <span className="text-sm">Last 7 Days</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="date" className="border-input" />
                  <span className="text-sm">Last 30 Days</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="date" className="border-input" />
                  <span className="text-sm">Last 3 Months</span>
                </label>
              </div>
            </div>

            <button className="btn btn-outline w-full">
              <i data-lucide="rotate-ccw" className="h-4 w-4 mr-2"></i>
              Reset Filters
            </button>
          </div>
        </aside>

        <div className="lg:col-span-3 space-y-4">
          {/* Sort area */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <div className="relative">
                <button className="btn btn-outline text-sm h-9">
                  <span>Newest First</span>
                  <i data-lucide="chevron-down" className="h-4 w-4 ml-2"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Example application cards - replicate the HTML structure */}
          <div className="card p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="shrink-0">
                <div className="h-16 w-16 rounded-lg bg-secondary flex items-center justify-center">
                  <i data-lucide="building-2" className="h-8 w-8 text-primary"></i>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">
                      <Link to="/job-details" className="hover:text-primary">Senior Full Stack Developer</Link>
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      <Link to="/company-profile" className="hover:text-primary">TechCorp Solutions</Link>
                    </p>
                  </div>
                  <span className="badge badge-warning">Under Review</span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><i data-lucide="map-pin" className="h-4 w-4"></i> San Francisco, CA</span>
                  <span className="flex items-center gap-1"><i data-lucide="briefcase" className="h-4 w-4"></i> Full-time</span>
                  <span className="flex items-center gap-1"><i data-lucide="dollar-sign" className="h-4 w-4"></i> $120k - $160k</span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><i data-lucide="clock" className="h-3 w-3"></i> Applied on Nov 25, 2025</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link to="/job-details" className="btn btn-outline text-sm h-9">
                      <i data-lucide="eye" className="h-4 w-4 mr-2"></i>
                      View Job
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Load More */}
          <div className="flex justify-center pt-6">
            <button className="btn btn-outline">
              <i data-lucide="loader-2" className="h-4 w-4 mr-2"></i>
              Load More Applications
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AppliedJobs;
