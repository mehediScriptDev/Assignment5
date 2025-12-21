import React from 'react';
import { Link } from 'react-router';
import { FiChevronRight, FiUser, FiLoader } from 'react-icons/fi';

const Applicants = () => {
  return (
    <main className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-[hsl(var(--color-muted-foreground))] mb-2">
          <Link to="/company/manage-jobs" className="hover:text-[hsl(var(--color-primary))]">Manage Jobs</Link>
          <FiChevronRight className="h-4 w-4" />
          <span className="text-[hsl(var(--color-foreground))]">Applicants</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Applicants</h1>
      </div>

      <div className="space-y-4">
        <div className="card p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center">
              <FiUser className="h-6 w-6 text-[hsl(var(--color-primary))]" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Jane Smith</h3>
              <div className="text-sm text-[hsl(var(--color-muted-foreground))]">Frontend Developer • Applied 3 days ago</div>
            </div>
            <div className="flex items-center gap-2">
              <button className="btn btn-outline">View</button>
              <button className="btn btn-primary">Shortlist</button>
            </div>
          </div>
        </div>

        {/* Additional applicant cards would be rendered here - converted from static HTML */}

        <div className="mt-6 text-center">
          <button className="btn btn-outline inline-flex items-center justify-center">
            <FiLoader className="h-4 w-4 mr-2 animate-spin" />
            Load More Applicants
          </button>
        </div>
      </div>
    </main>
  );
};

export default Applicants;
