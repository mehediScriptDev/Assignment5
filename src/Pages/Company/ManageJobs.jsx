import React from 'react';
import { Link } from 'react-router';
import {
  FiBriefcase,
  FiPlus,
  FiChevronRight,
  FiSearch,
  FiMapPin,
  FiFilter,
  FiChevronDown,
  FiEdit,
  FiTrash2,
  FiPauseCircle,
  FiPlayCircle,
  FiCheckCircle,
  FiChevronLeft
} from 'react-icons/fi';
import { BiBuilding } from 'react-icons/bi';

const ManageJobs = () => {
  return (
    <div className="bg-background text-foreground antialiased">
      {/* Header is provided by global layout */}

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-[hsl(var(--color-muted-foreground))] mb-2">
            <Link to="/company/dashboard" className="hover:text-[hsl(var(--color-primary))]">Dashboard</Link>
            <FiChevronRight className="h-4 w-4" />
            <span className="text-[hsl(var(--color-foreground))]">Manage Jobs</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Manage Jobs</h1>
              <p className="text-[hsl(var(--color-muted-foreground))]">View and manage all your job postings</p>
            </div>
            <Link to="/company/create-job" className="btn btn-primary">
              <FiPlus className="h-4 w-4 mr-2" />
              Create New Job
            </Link>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="card p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(var(--color-muted-foreground))]" />
                <input type="search" placeholder="Search jobs by title, location..." className="input pl-10" />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <button className="btn btn-outline">
                  <FiFilter className="h-4 w-4 mr-2" />
                  Status
                  <FiChevronDown className="h-4 w-4 ml-2" />
                </button>
                {/* static dropdown placeholder - original had lucide-driven toggles */}
              </div>
              <div className="relative">
                <button className="btn btn-outline">
                  <FiChevronLeft className="h-4 w-4 mr-2" />
                  Sort
                  <FiChevronDown className="h-4 w-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Jobs Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[hsl(var(--color-muted))] border-b border-[hsl(var(--color-border))]">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-medium"><input type="checkbox" className="rounded border-[hsl(var(--color-input))]" /></th>
                  <th className="text-left py-4 px-6 text-sm font-medium">Job Title</th>
                  <th className="text-left py-4 px-6 text-sm font-medium">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-medium">Applicants</th>
                  <th className="text-left py-4 px-6 text-sm font-medium">Posted Date</th>
                  <th className="text-left py-4 px-6 text-sm font-medium">Expires</th>
                  <th className="text-right py-4 px-6 text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[hsl(var(--color-border))]">
                {/* Row example - duplicate structure from HTML */}
                <tr className="hover:bg-[hsl(var(--color-accent))] transition-colors">
                  <td className="py-4 px-6"><input type="checkbox" className="rounded border-[hsl(var(--color-input))]" /></td>
                  <td className="py-4 px-6">
                    <div>
                      <Link to="/job-details" className="font-medium hover:text-[hsl(var(--color-primary))]">Senior Full Stack Developer</Link>
                      <div className="flex items-center gap-3 mt-1 text-xs text-[hsl(var(--color-muted-foreground))]">
                        <span className="flex items-center gap-1"><FiMapPin className="h-3 w-3" />San Francisco, CA</span>
                        <span className="flex items-center gap-1"><FiBriefcase className="h-3 w-3" />Full-time</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6"><span className="badge badge-success">Active</span></td>
                  <td className="py-4 px-6"><div className="flex items-center gap-2"><span className="font-medium">24</span></div></td>
                  <td className="py-4 px-6 text-sm text-[hsl(var(--color-muted-foreground))]">Nov 28, 2025</td>
                  <td className="py-4 px-6 text-sm text-[hsl(var(--color-muted-foreground))]">Dec 28, 2025</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <button className="btn-ghost p-2" title="Edit"><FiEdit className="h-4 w-4" /></button>
                      <button className="btn-ghost p-2 text-red-600" title="Delete"><FiTrash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>

                {/* More rows can be added similarly... */}
              </tbody>
            </table>
          </div>

          {/* Bulk Actions Bar (hidden by default) */}
          <div className="hidden p-4 bg-[hsl(var(--color-accent))] border-t border-[hsl(var(--color-border))]" id="bulkActionsBar">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium"><span id="selectedCount">0</span> jobs selected</span>
              <div className="flex items-center gap-2">
                <button className="btn btn-outline text-sm h-9"><FiPauseCircle className="h-3 w-3 mr-2" />Deactivate</button>
                <button className="btn btn-outline text-sm h-9"><FiPlayCircle className="h-3 w-3 mr-2" />Activate</button>
                <button className="btn btn-outline text-sm h-9 text-red-600"><FiTrash2 className="h-3 w-3 mr-2" />Delete</button>
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t border-[hsl(var(--color-border))]">
            <div className="flex items-center justify-between">
              <div className="text-sm text-[hsl(var(--color-muted-foreground))]">Showing <span className="font-medium">1</span> to <span className="font-medium">6</span> of <span className="font-medium">24</span> jobs</div>
              <div className="flex items-center gap-2">
                <button className="btn btn-outline h-9 px-3" disabled><FiChevronLeft className="h-4 w-4" /></button>
                <button className="btn btn-primary h-9 px-3">1</button>
                <button className="btn btn-outline h-9 px-3">2</button>
                <button className="btn btn-outline h-9 px-3">3</button>
                <button className="btn btn-outline h-9 px-3">4</button>
                <button className="btn btn-outline h-9 px-3"><FiChevronRight className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManageJobs;