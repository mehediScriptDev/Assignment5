import React from 'react';
import { Link } from 'react-router';
import {
  FiBriefcase,
  FiPlus,
  FiUsers,
  FiClock,
  FiStar,
  FiMapPin,
  FiEye,
  FiEdit,
  FiCheck,
  FiDownload,
  FiList,
  FiSettings
} from 'react-icons/fi';
import { BiBuilding } from 'react-icons/bi';
import { FaLightbulb } from 'react-icons/fa';

const CompanyDashboard = () => {
  return (
    <main className="bg-background text-foreground antialiased">
      {/* Header removed — use global layout header instead */}

      {/* Page content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, TechCorp! <span aria-hidden>👋</span></h1>
          <p className="text-[hsl(var(--color-muted-foreground))]">Here's what's happening with your job postings today</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <FiBriefcase className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-1">24</h3>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))]">Active Jobs</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                <FiUsers className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-1">156</h3>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))]">Total Applicants</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-lg bg-yellow-100 flex items-center justify-center">
                <FiClock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-1">32</h3>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))]">Pending Reviews</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <FiStar className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-1">18</h3>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))]">Shortlisted</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="card">
              <div className="p-6 border-b border-[hsl(var(--color-border))]">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Recent Job Posts</h2>
                  <button className="text-sm text-[hsl(var(--color-primary))] hover:underline">View All</button>
                </div>
              </div>

              <div className="divide-y divide-[hsl(var(--color-border))]">
                {/* Job item example */}
                <div className="p-6 hover:bg-[hsl(var(--color-accent))] transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1"><a href="#" className="hover:text-[hsl(var(--color-primary))]">Senior Full Stack Developer</a></h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-[hsl(var(--color-muted-foreground))]">
                        <span className="flex items-center gap-1"><FiMapPin className="h-3 w-3" />San Francisco, CA</span>
                        <span className="flex items-center gap-1"><FiBriefcase className="h-3 w-3" />Full-time</span>
                        <span className="flex items-center gap-1"><FiClock className="h-3 w-3" />Posted 2 days ago</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-[hsl(var(--color-muted-foreground))]"><span className="font-semibold text-[hsl(var(--color-foreground))]">24</span> applicants</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="btn btn-outline text-xs h-8"><FiEye className="h-3 w-3 mr-1" />View</button>
                      <button className="btn btn-outline text-xs h-8"><FiEdit className="h-3 w-3 mr-1" />Edit</button>
                    </div>
                  </div>
                </div>

                {/* additional job items (omitted for brevity) */}

              </div>
            </div>

            <div className="card">
              <div className="p-6 border-b border-[hsl(var(--color-border))]">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Recent Applicants</h2>
                  <button className="text-sm text-[hsl(var(--color-primary))] hover:underline">View All</button>
                </div>
              </div>

              <div className="divide-y divide-[hsl(var(--color-border))]">
                <div className="p-6 hover:bg-[hsl(var(--color-accent))] transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-[hsl(var(--color-secondary))] flex items-center justify-center shrink-0">
                      <FiUsers className="h-6 w-6 text-[hsl(var(--color-primary))]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold mb-1">Sarah Johnson</h3>
                          <p className="text-sm text-[hsl(var(--color-muted-foreground))]">Applied for <span className="font-medium text-[hsl(var(--color-foreground))]">Senior Full Stack Developer</span></p>
                        </div>
                        <span className="text-xs text-[hsl(var(--color-muted-foreground))]">2 hours ago</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="badge badge-secondary">React</span>
                        <span className="badge badge-secondary">Node.js</span>
                        <span className="badge badge-secondary">AWS</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button className="btn btn-primary text-xs h-8"><FiCheck className="h-3 w-3 mr-1" />Shortlist</button>
                        <button className="btn btn-outline text-xs h-8"><FiEye className="h-3 w-3 mr-1" />View Profile</button>
                        <button className="btn btn-outline text-xs h-8"><FiDownload className="h-3 w-3 mr-1" />Resume</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* additional applicants omitted for brevity */}

              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Link to="/company/create-job" className="btn btn-primary w-full justify-start"><FiPlus className="h-4 w-4 mr-2" />Post New Job</Link>
                <Link to="/company/manage-jobs" className="btn btn-outline w-full justify-start"><FiList className="h-4 w-4 mr-2" />Manage Jobs</Link>
                <Link to="/company/applicants" className="btn btn-outline w-full justify-start"><FiUsers className="h-4 w-4 mr-2" />View Applicants</Link>
                <Link to="/company/settings" className="btn btn-outline w-full justify-start"><FiSettings className="h-4 w-4 mr-2" />Company Settings</Link>
              </div>
            </div>

            <div className="card p-6 bg-blue-50 border-blue-200">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                  <FaLightbulb className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-blue-900">Pro Tip</h4>
                  <p className="text-sm text-blue-800">Jobs with detailed descriptions get 40% more quality applicants. Keep your postings updated!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CompanyDashboard;
