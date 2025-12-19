import React from 'react';

const CompanySettings = () => {
  return (
    <main className="container mx-auto px-4 py-6 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Company Settings</h1>
        <p className="text-muted-foreground">Manage account, billing, and team settings.</p>
      </div>

      <div className="card p-6">
        <h3 className="font-semibold mb-2">Profile Settings</h3>
        <label className="label">Company Name</label>
        <input className="input mb-4" placeholder="TechCorp Solutions" />
        <div className="flex gap-2">
          <button className="btn btn-primary">Save</button>
          <button className="btn btn-outline">Cancel</button>
        </div>
      </div>
    </main>
  );
};

export default CompanySettings;
