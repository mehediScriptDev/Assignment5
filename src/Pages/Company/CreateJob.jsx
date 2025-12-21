import React from 'react';
import { Link } from 'react-router';
import { FiChevronRight, FiX } from 'react-icons/fi';

const CreateJob = () => {
  return (
    <main className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-[hsl(var(--color-muted-foreground))] mb-2">
          <Link to="/company-dashboard" className="hover:text-[hsl(var(--color-primary))]">Dashboard</Link>
          <FiChevronRight className="h-4 w-4" />
          <span className="text-[hsl(var(--color-foreground))]">Create Job</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Post a New Job</h1>
            <p className="text-muted-foreground">Fill in the details to create a new job posting</p>
          </div>
          <Link to="/company-dashboard" className="btn btn-outline"><FiX className="h-4 w-4 mr-2" />Cancel</Link>
        </div>
      </div>

      <form className="space-y-6">
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <label className="label">Job Title</label>
          <input className="input mb-4" placeholder="Senior Full Stack Developer" />

          <label className="label">Location</label>
          <input className="input mb-4" placeholder="Remote / San Francisco, CA" />

          <label className="label">Description</label>
          <textarea className="textarea mb-4" placeholder="Describe the role"></textarea>

          <div className="flex gap-2">
            <button className="btn btn-primary">Post Job</button>
            <Link to="/company-dashboard" className="btn btn-outline">Cancel</Link>
          </div>
        </div>
      </form>
    </main>
  );
};

export default CreateJob;
