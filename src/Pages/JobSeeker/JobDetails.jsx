import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import client from '../../api/client';

const JobDetails = () => {
  const { slug } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applyOpen, setApplyOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await client.get(`/jobs/${slug}`);
        if (res.data && res.data.success) {
          setJob(res.data.data);
          // fetch similar jobs
          try {
            const sim = await client.get(`/jobs/${res.data.data.id}/similar`);
            if (sim.data && sim.data.success) setSimilar(sim.data.data || []);
          } catch (e) {
            console.warn('Failed to load similar jobs', e);
          }
        }
      } catch (err) {
        console.error('Failed to load job', err);
      } finally {
        setLoading(false);
      }
    };
    if (slug) load();
  }, [slug]);

  const openApply = () => setApplyOpen(true);
  const closeApply = () => {
    setApplyOpen(false);
    setCoverLetter('');
  };

  const submitApplication = async () => {
    if (!job) return;
    if (!coverLetter || coverLetter.trim().length < 20) return alert('Please add a cover letter (min 20 chars)');
    setSubmitting(true);
    try {
      const res = await client.post(`/applications/jobs/${job.id}/apply`, { coverLetter });
      if (res.data && res.data.success) {
        alert('Application submitted');
        closeApply();
      }
    } catch (err) {
      console.error('Apply failed', err?.response?.data || err);
      const msg = err?.response?.data?.message || 'Failed to apply';
      alert(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="container mx-auto px-4 py-6">Loading...</div>;
  if (!job) return <div className="container mx-auto px-4 py-6">Job not found.</div>;

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Link to="/user-dashboard" className="hover:text-primary">Dashboard</Link>
          <i data-lucide="chevron-right" className="h-4 w-4"></i>
          <span className="text-foreground">{job.title}</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
        <p className="text-muted-foreground">{job.company?.name} • {job.location} • {job.salaryMin ? `$${job.salaryMin}` : ''}{job.salaryMax ? ` - $${job.salaryMax}` : ''}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="card p-6">
            <h3 className="font-semibold mb-2">Job description</h3>
            <div className="prose max-w-none text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: job.description || '<p>No description provided.</p>' }} />
          </div>

          <div className="card p-6">
            <h3 className="font-semibold mb-2">Responsibilities & Requirements</h3>
            <div className="text-sm text-muted-foreground">
              <div dangerouslySetInnerHTML={{ __html: job.requirements || '<p>Not specified.</p>' }} />
            </div>
          </div>

          {similar.length > 0 && (
            <div className="card p-6">
              <h3 className="font-semibold mb-2">Similar Jobs</h3>
              <ul className="space-y-3">
                {similar.map(s => (
                  <li key={s.id} className="flex items-center justify-between">
                    <div>
                      <Link to={`/jobs/${s.slug}`} className="font-medium">{s.title}</Link>
                      <div className="text-sm text-muted-foreground">{s.company?.name} • {s.location}</div>
                    </div>
                    <Link to={`/jobs/${s.slug}`} className="btn btn-outline text-sm">View</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <aside className="lg:col-span-1">
          <div className="card p-6">
            <h3 className="font-semibold mb-2">Apply</h3>
            <div className="mb-4">
              <div className="text-sm text-muted-foreground mb-2">Applicants: <strong>{job.applicants || 0}</strong></div>
              <button onClick={openApply} className="btn btn-primary w-full">Apply Now</button>
            </div>
            <div className="text-sm text-muted-foreground">
              <div><strong>Type:</strong> {job.type}</div>
              <div><strong>Experience:</strong> {job.experienceLevel}</div>
              <div><strong>Deadline:</strong> {job.deadline ? new Date(job.deadline).toLocaleDateString() : 'Open'}</div>
            </div>
          </div>
        </aside>
      </div>

      {applyOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="card max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Apply for {job.title}</h3>
              <button onClick={closeApply} className="text-muted-foreground">Close</button>
            </div>
            <div className="space-y-4">
              <label className="label">Cover Letter</label>
              <textarea value={coverLetter} onChange={e => setCoverLetter(e.target.value)} className="textarea w-full" rows={6} placeholder="Write a brief cover letter..." />
              <div className="flex items-center justify-end gap-3">
                <button onClick={closeApply} className="btn btn-outline">Cancel</button>
                <button onClick={submitApplication} disabled={submitting} className="btn btn-primary">{submitting ? 'Applying...' : 'Submit Application'}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default JobDetails;
