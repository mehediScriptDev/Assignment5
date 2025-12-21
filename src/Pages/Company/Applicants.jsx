import React from 'react';
import { Link } from 'react-router';
import {
  FiChevronRight,
  FiLoader,
  FiMapPin,
  FiMail,
  FiBriefcase,
  FiEye,
  FiDownload,
  FiCheck,
  FiX,
  FiClock,
} from 'react-icons/fi';

const Applicants = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-[hsl(var(--color-muted-foreground))] mb-2">
          <Link to="/company/dashboard" className="hover:text-[hsl(var(--color-primary))]">Dashboard</Link>
          <FiChevronRight className="h-4 w-4" />
          <span className="text-[hsl(var(--color-foreground))]">Applicants</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Job Applicants</h1>
            <p className="text-[hsl(var(--color-muted-foreground))]">Review and manage applicants</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Filters</h3>
              <button className="text-sm text-[hsl(var(--color-primary))] hover:underline">Reset</button>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-medium mb-3">Application Status</h4>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-[hsl(var(--color-input))]" />
                  <span className="text-sm">New Applications</span>
                  <span className="ml-auto text-sm text-[hsl(var(--color-muted-foreground))]">(8)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-[hsl(var(--color-input))]" />
                  <span className="text-sm">Shortlisted</span>
                  <span className="ml-auto text-sm text-[hsl(var(--color-muted-foreground))]">(8)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-[hsl(var(--color-input))]" />
                  <span className="text-sm">Interviewed</span>
                  <span className="ml-auto text-sm text-[hsl(var(--color-muted-foreground))]">(5)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-[hsl(var(--color-input))]" />
                  <span className="text-sm">Rejected</span>
                  <span className="ml-auto text-sm text-[hsl(var(--color-muted-foreground))]">(3)</span>
                </label>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-medium mb-3">Experience Level</h4>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-[hsl(var(--color-input))]" />
                  <span className="text-sm">Entry Level (0-2 years)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-[hsl(var(--color-input))]" />
                  <span className="text-sm">Mid Level (3-5 years)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-[hsl(var(--color-input))]" />
                  <span className="text-sm">Senior (5+ years)</span>
                </label>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-3">Applied Date</h4>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="applied-date" defaultChecked className="border-[hsl(var(--color-input))]" />
                  <span className="text-sm">Last 24 hours</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="applied-date" className="border-[hsl(var(--color-input))]" />
                  <span className="text-sm">Last 7 days</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="applied-date" className="border-[hsl(var(--color-input))]" />
                  <span className="text-sm">Last 30 days</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="applied-date" className="border-[hsl(var(--color-input))]" />
                  <span className="text-sm">All time</span>
                </label>
              </div>
            </div>
          </div>
        </aside>

        {/* Applicants List */}
        <div className="lg:col-span-3">
          <div className="space-y-4">
            {/* Applicant 1 */}
            <div className="card p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="shrink-0">
                  <div className="h-16 w-16 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">JD</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-lg font-semibold">John Doe</h3>
                      <div className="text-sm text-[hsl(var(--color-muted-foreground))] flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1"><FiMail className="h-4 w-4" /> john.doe@example.com</span>
                        <span className="flex items-center gap-1"><FiBriefcase className="h-4 w-4" /> 7 years experience</span>
                        <span className="flex items-center gap-1"><FiClock className="h-4 w-4" /> Applied 2 hours ago</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="badge badge-info">New</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="badge badge-secondary">JavaScript</span>
                    <span className="badge badge-secondary">React</span>
                    <span className="badge badge-secondary">Node.js</span>
                    <span className="badge badge-secondary">TypeScript</span>
                    <span className="badge badge-secondary">AWS</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button className="btn btn-outline inline-flex items-center"><FiEye className="h-4 w-4 mr-2" /> View Profile</button>
                    <button className="btn btn-outline inline-flex items-center"><FiDownload className="h-4 w-4 mr-2" /> Resume</button>
                    <button className="btn btn-primary inline-flex items-center"><FiCheck className="h-4 w-4 mr-2" /> Shortlist</button>
                    <button className="btn btn-ghost inline-flex items-center text-red-600"><FiX className="h-4 w-4 mr-2" /> Reject</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Applicant 2 */}
            <div className="card p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="shrink-0">
                  <div className="h-16 w-16 rounded-full bg-linear-to-br from-green-500 to-teal-600 flex items-center justify-center text-white text-xl font-bold">SW</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-lg font-semibold">Sarah Wilson</h3>
                      <div className="text-sm text-[hsl(var(--color-muted-foreground))] flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1"><FiMail className="h-4 w-4" /> sarah.wilson@example.com</span>
                        <span className="flex items-center gap-1"><FiBriefcase className="h-4 w-4" /> 5 years experience</span>
                        <span className="flex items-center gap-1"><FiClock className="h-4 w-4" /> Applied 5 hours ago</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="badge badge-success">Shortlisted</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="badge badge-secondary">React</span>
                    <span className="badge badge-secondary">Vue.js</span>
                    <span className="badge badge-secondary">Node.js</span>
                    <span className="badge badge-secondary">MongoDB</span>
                    <span className="badge badge-secondary">Docker</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button className="btn btn-outline inline-flex items-center"><FiEye className="h-4 w-4 mr-2" /> View Profile</button>
                    <button className="btn btn-outline inline-flex items-center"><FiDownload className="h-4 w-4 mr-2" /> Resume</button>
                    <button className="btn btn-ghost inline-flex items-center text-red-600"><FiX className="h-4 w-4 mr-2" /> Reject</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Applicant 3 */}
            <div className="card p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="shrink-0">
                  <div className="h-16 w-16 rounded-full bg-linear-to-br from-orange-500 to-red-600 flex items-center justify-center text-white text-xl font-bold">MJ</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-lg font-semibold">Michael Johnson</h3>
                      <div className="text-sm text-[hsl(var(--color-muted-foreground))] flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1"><FiMail className="h-4 w-4" /> michael.j@example.com</span>
                        <span className="flex items-center gap-1"><FiBriefcase className="h-4 w-4" /> 6 years experience</span>
                        <span className="flex items-center gap-1"><FiClock className="h-4 w-4" /> Applied 1 day ago</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="badge badge-info">New</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="badge badge-secondary">Full Stack</span>
                    <span className="badge badge-secondary">Python</span>
                    <span className="badge badge-secondary">Django</span>
                    <span className="badge badge-secondary">PostgreSQL</span>
                    <span className="badge badge-secondary">Redis</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button className="btn btn-outline inline-flex items-center"><FiEye className="h-4 w-4 mr-2" /> View Profile</button>
                    <button className="btn btn-outline inline-flex items-center"><FiDownload className="h-4 w-4 mr-2" /> Resume</button>
                    <button className="btn btn-primary inline-flex items-center"><FiCheck className="h-4 w-4 mr-2" /> Shortlist</button>
                    <button className="btn btn-ghost inline-flex items-center text-red-600"><FiX className="h-4 w-4 mr-2" /> Reject</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Load More */}
          <div className="mt-6 text-center">
            <button className="btn btn-outline inline-flex items-center justify-center">
              <FiLoader className="h-4 w-4 mr-2 animate-spin" /> Load More Applicants
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Applicants;
