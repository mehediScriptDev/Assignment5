import React from 'react';
import { Link } from 'react-router';

const CompanyProfile = () => {
  return (
    <main className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">TechCorp Solutions</h1>
        <p className="text-muted-foreground">Company profile and details.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card p-6">
          <h3 className="font-semibold mb-2">About</h3>
          <p className="text-sm text-muted-foreground">Short company description goes here.</p>
        </div>
        <div className="lg:col-span-2 card p-6">
          <h3 className="font-semibold mb-2">Jobs</h3>
          <div className="space-y-3">
            <div className="p-3 border rounded">Senior Full Stack Developer</div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CompanyProfile;
