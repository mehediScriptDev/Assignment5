import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router';
import client from '../../api/client';
import { FiChevronRight, FiMapPin, FiClock, FiBriefcase, FiDollarSign, FiUsers, FiSend, FiX, FiFlag, FiEye } from 'react-icons/fi';
import { BiBuilding } from 'react-icons/bi';
import { FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';
import { useToast } from '../../context/ToastContext';

const JobDetails = () => {
  const { slug } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applyOpen, setApplyOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [similar, setSimilar] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [appliedAppId, setAppliedAppId] = useState(null);
  const [filePreviewVisible, setFilePreviewVisible] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const modalRef = useRef(null);
  const { showToast } = useToast();

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
          // if logged in, check if user already applied to this job
          try {
            const token = localStorage.getItem('token');
            if (token) {
              const apps = await client.get('/applications/my-applications');
              if (apps.data && apps.data.success) {
                const found = (apps.data.data || []).find(a => (a.job && (a.job.id === res.data.data.id)) || a.jobId === res.data.data.id || a.job_id === res.data.data.id);
                if (found) setAppliedAppId(found.id);
              }
            }
          } catch (e) {
            console.debug('Could not determine applied status', e?.message || e);
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
    setUploadedFile(null);
    setFilePreviewVisible(false);
    setFileName('');
    setFileSize('');
  };

  const submitApplication = async () => {
    if (!job) return;
    if (!coverLetter || coverLetter.trim().length < 20) return alert('Please add a cover letter (min 20 chars)');
    if (uploadedFile && uploadedFile.type !== 'application/pdf') return alert('Please upload a PDF file only');
    if (uploadedFile && uploadedFile.size > 5 * 1024 * 1024) return alert('File size must be less than 5MB');

    setSubmitting(true);
    try {
      // If a resume file is selected in the modal, upload it first to the profile endpoint.
      if (uploadedFile) {
        const fd = new FormData();
        fd.append('resume', uploadedFile);
        try {
          const up = await client.post('/users/resume', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
          if (!(up.data && up.data.success)) {
            throw new Error(up.data?.message || 'Resume upload failed');
          }
          // resume upload succeeded; server should have updated user's resumeUrl
        } catch (uerr) {
          console.error('Resume upload failed', uerr?.response?.data || uerr);
          alert(uerr?.response?.data?.message || uerr.message || 'Failed to upload resume');
          setSubmitting(false);
          return;
        }
      }

      // Ensure profile has resumeUrl (either from prior upload or existing profile)
      const me = await client.get('/auth/me');
      const resumeUrl = me?.data?.data?.resumeUrl;
      if (!resumeUrl) {
        alert('Please upload your resume from your profile page before applying. The apply endpoint uses your saved profile resume.');
        setSubmitting(false);
        return;
      }

      // Now submit the application as JSON containing only the coverLetter
      const res = await client.post(`/applications/jobs/${job.id}/apply`, { coverLetter });
      if (res.data && res.data.success) {
        showToast('Application submitted', { type: 'success' });
        // if server returned the created application id, keep it so we can show Withdraw
        const created = res.data.data;
        if (created && (created.id || created._id)) setAppliedAppId(created.id || created._id);
        setJob(prev => prev ? ({ ...prev, applicants: (prev.applicants || 0) + 1 }) : prev);
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

  // Close modal on Escape
  useEffect(() => {
    if (!applyOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') closeApply(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [applyOpen]);

  // File upload handlers for modal
  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file only');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }
    setUploadedFile(file);
    setFilePreviewVisible(true);
    setFileName(file.name);
    setFileSize(formatFileSize(file.size));
  };

  const handleUploadAreaClick = () => {
    const input = document.getElementById('resumeInput');
    if (input) input.click();
  };

  const removeFile = () => {
    setUploadedFile(null);
    setFilePreviewVisible(false);
    setFileName('');
    setFileSize('');
    const input = document.getElementById('resumeInput');
    if (input) input.value = '';
  };

  const reuploadFile = () => {
    const input = document.getElementById('resumeInput');
    if (input) input.click();
  };

  function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  }

  if (loading) return <div className="container mx-auto px-4 py-6">Loading...</div>;
  if (!job) return <div className="container mx-auto px-4 py-6">Job not found.</div>;

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-[hsl(var(--color-muted-foreground))]">
        <Link to="/jobs" className="hover:text-[hsl(var(--color-foreground))]">Jobs</Link>
        <FiChevronRight className="h-4 w-4" />
        <Link to="/jobs" className="hover:text-[hsl(var(--color-foreground))]">{job.category || 'Technology'}</Link>
        <FiChevronRight className="h-4 w-4" />
        <span className="text-[hsl(var(--color-foreground))]">{job.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Header */}
          <div className="card p-6">
            <div className="flex items-start gap-4">
              <div className="shrink-0">
                <div className="h-16 w-16 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center text-white">
                  <BiBuilding className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <div>
                    <h1 className="text-2xl font-semibold mb-1">{job.title}</h1>
                    <p className="text-sm text-[hsl(var(--color-muted-foreground))] mb-2">
                      <Link to={`/companies/${job.company?.id}`} className="hover:text-[hsl(var(--color-primary))]">{job.company?.name}</Link>
                    </p>
                  </div>
                  <div className="text-sm text-[hsl(var(--color-muted-foreground))]">
                    <span className="inline-flex items-center gap-2"><FiMapPin className="h-4 w-4" /> {job.location}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-[hsl(var(--color-muted-foreground))] mb-4">
                  <div className="flex items-center gap-2"><FiBriefcase className="h-4 w-4" /> <span>{job.type || 'Full-time'}</span></div>
                  <div className="flex items-center gap-2"><FiDollarSign className="h-4 w-4" /> <span>{job.salaryMin || job.salaryMax ? `${job.salaryMin ? `$${job.salaryMin}` : ''}${job.salaryMax ? ` - $${job.salaryMax}` : ''}` : '$120k - $180k / year'}</span></div>
                  <div className="flex items-center gap-2"><FiClock className="h-4 w-4" /> <span>{job.deadline ? new Date(job.deadline).toLocaleDateString() : 'Open'}</span></div>
                </div>

                <div className="prose prose-sm max-w-none space-y-4 text-[hsl(var(--color-foreground))]" dangerouslySetInnerHTML={{ __html: job.description || '<p>No description provided.</p>' }} />
              </div>
            </div>
          </div>

          {/* Job Overview */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Job Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <FiBriefcase className="h-5 w-5 text-[hsl(var(--color-muted-foreground))] mt-1" />
                <div>
                  <div className="text-sm text-[hsl(var(--color-muted-foreground))]">Job Type</div>
                  <div className="font-medium">{job.type || 'Full-time'}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FiMapPin className="h-5 w-5 text-[hsl(var(--color-muted-foreground))] mt-1" />
                <div>
                  <div className="text-sm text-[hsl(var(--color-muted-foreground))]">Location</div>
                  <div className="font-medium">{job.location || 'San Francisco, CA (Remote)'}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FiDollarSign className="h-5 w-5 text-[hsl(var(--color-muted-foreground))] mt-1" />
                <div>
                  <div className="text-sm text-[hsl(var(--color-muted-foreground))]">Salary</div>
                  <div className="font-medium">{job.salaryMin || job.salaryMax ? `${job.salaryMin ? `$${job.salaryMin}` : ''}${job.salaryMax ? ` - $${job.salaryMax}` : ''}` : '$120k - $180k / year'}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FiClock className="h-5 w-5 text-[hsl(var(--color-muted-foreground))] mt-1" />
                <div>
                  <div className="text-sm text-[hsl(var(--color-muted-foreground))]">Application Deadline</div>
                  <div className="font-medium">{job.deadline ? new Date(job.deadline).toLocaleDateString() : 'December 31, 2025'}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FiUsers className="h-5 w-5 text-[hsl(var(--color-muted-foreground))] mt-1" />
                <div>
                  <div className="text-sm text-[hsl(var(--color-muted-foreground))]">Applicants</div>
                  <div className="font-medium">{job.applicants || 47}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Job Description & Skills */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Job Description</h2>
            <div className="prose prose-sm max-w-none space-y-4 text-[hsl(var(--color-foreground))]" dangerouslySetInnerHTML={{ __html: job.description || '<p>No description provided.</p>' }} />
          </div>

          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Required Skills</h2>
            <div className="flex flex-wrap gap-2">
              {(job.skills && job.skills.length > 0 ? job.skills : ['React','Node.js','TypeScript','JavaScript','REST API','PostgreSQL']).map((s, i) => (
                <span key={i} className="badge badge-secondary">{s}</span>
              ))}
            </div>
          </div>

          {/* Similar Jobs */}
          {similar.length > 0 && (
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-4">Similar Jobs</h2>
              <div className="space-y-4">
                {similar.map((s) => (
                  <article key={s.id} className="border-b border-[hsl(var(--color-border))] pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <Link to={`/jobs/${s.slug}`} className="font-medium hover:text-[hsl(var(--color-primary))]">{s.title}</Link>
                        <div className="text-sm text-[hsl(var(--color-muted-foreground))]">{s.company?.name} • {s.location}</div>
                      </div>
                      <Link to={`/jobs/${s.slug}`} className="btn btn-outline text-sm">View Details</Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-1 space-y-6">
          <div className="card p-6">
            <div className="text-center pb-4 border-b border-[hsl(var(--color-border))]">
              <div className="text-3xl font-semibold text-[hsl(var(--color-foreground))]">{job.salaryMin || job.salaryMax ? `${job.salaryMin ? `$${job.salaryMin}` : ''}${job.salaryMax ? ` - $${job.salaryMax}` : ''}` : '$120k - $180k'}</div>
              <div className="text-sm text-[hsl(var(--color-muted-foreground))] mt-1">Per year</div>
              <div className="my-4">
                {appliedAppId ? (
                  <button
                    onClick={async () => {
                      if (!confirm('Are you sure you want to withdraw your application?')) return;
                      try {
                        await client.delete(`/applications/${appliedAppId}`);
                        setAppliedAppId(null);
                        setJob(prev => prev ? ({ ...prev, applicants: Math.max(0, (prev.applicants || 1) - 1) }) : prev);
                        showToast('Application withdrawn', { type: 'success' });
                      } catch (e) {
                        console.error('Withdraw failed', e);
                        alert(e?.response?.data?.message || 'Failed to withdraw application');
                      }
                    }}
                    className="btn btn-primary w-full"
                    style={{ background: '#fff8e1', borderColor: '#fff8e1', color: '#111827' }}
                  >
                    Withdraw
                  </button>
                ) : (
                  <button onClick={openApply} className="btn btn-primary w-full flex items-center justify-center gap-2">
                    <FiSend className="h-4 w-4" />
                    Apply Now
                  </button>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-[hsl(var(--color-border))] space-y-3">
              <div className="flex items-center justify-between text-sm text-[hsl(var(--color-muted-foreground))]">
                <span>Applicants</span>
                <strong>{job.applicants || 47}</strong>
              </div>
              <div className="flex items-center justify-between text-sm text-[hsl(var(--color-muted-foreground))]">
                <span>Posted</span>
                <strong>{job.postedAt ? new Date(job.postedAt).toLocaleDateString() : '2 days ago'}</strong>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">About Company</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-md bg-[hsl(var(--color-secondary))] flex items-center justify-center text-white">
                  <BiBuilding className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-medium">{job.company?.name}</div>
                  <div className="text-sm text-[hsl(var(--color-muted-foreground))]">{job.company?.location}</div>
                </div>
              </div>

              <p className="text-sm text-[hsl(var(--color-muted-foreground))]">{job.company?.description}</p>

              <div className="space-y-2 pt-2">
                <div className="text-sm"><strong>Website:</strong> <a href={job.company?.website} className="hover:text-[hsl(var(--color-primary))]">{job.company?.website}</a></div>
                <div className="text-sm"><strong>Size:</strong> {job.company?.size || '—'}</div>
              </div>

              <a className="btn btn-outline w-full mt-4" href={`/companies/${job.company?.id}`}>View Company</a>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">Share this Job</h3>
            <div className="flex gap-2">
              <button className="btn btn-ghost" title="Share on LinkedIn"><FaLinkedin /></button>
              <button className="btn btn-ghost" title="Share on Twitter"><FaTwitter /></button>
              <button className="btn btn-ghost" title="Share on Facebook"><FaFacebook /></button>
              <button className="btn btn-ghost" title="Copy link"><FiEye /></button>
            </div>
          </div>

          <button className="w-full text-sm text-[hsl(var(--color-muted-foreground))] hover:text-[hsl(var(--color-foreground))] flex items-center justify-center gap-2">
            <FiFlag className="h-4 w-4" />
            Report this job
          </button>
        </div>
      </div>

      {/* Apply Dialog */}
      {applyOpen && (
        <div id="applyDialog" className="fixed inset-0 bg-black/50 z-50 items-center justify-center p-4 flex" onClick={(e) => { if (e.target.id === 'applyDialog') closeApply(); }}>
          <div className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">Apply for {job.title}</h2>
                  <p className="text-sm text-[hsl(var(--color-muted-foreground))] mt-1">Please attach your resume (PDF) and a short cover letter.</p>
                </div>
                <button onClick={closeApply} className="btn-ghost p-2"><FiX className="h-5 w-5" /></button>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">Resume <span className="text-red-500">*</span></label>

                <input id="resumeInput" onChange={handleFileChange} accept="application/pdf" type="file" className="hidden" />

                {!filePreviewVisible ? (
                  <div id="uploadArea" onClick={handleUploadAreaClick} className="border-2 border-dashed border-[hsl(var(--color-border))] rounded-lg p-8 text-center hover:border-[hsl(var(--color-primary))] transition-colors cursor-pointer">
                    <div className="flex flex-col items-center gap-2">
                      <div className="text-[hsl(var(--color-muted-foreground))] text-sm">Click to upload or drag and drop your resume (PDF)</div>
                      <div className="text-xs text-[hsl(var(--color-muted-foreground))]">Max size 5MB</div>
                    </div>
                  </div>
                ) : (
                  <div id="filePreview" className="border border-[hsl(var(--color-border))] rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{fileName}</div>
                        <div className="text-sm text-[hsl(var(--color-muted-foreground))]">{fileSize}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={reuploadFile} className="btn btn-outline text-sm">Reupload</button>
                        <button onClick={removeFile} className="btn btn-ghost text-sm">Remove</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <label htmlFor="coverMessage" className="text-sm font-medium">Cover Message <span className="text-[hsl(var(--color-muted-foreground))]">(Optional)</span></label>
                <textarea id="coverMessage" rows={5} value={coverLetter} onChange={e => {
                  const val = e.target.value; if (val.length > 500) setCoverLetter(val.substring(0,500)); else setCoverLetter(val);
                }} className="input resize-none" placeholder="Write a brief message about why you're a great fit for this role..." />
                <p className="text-xs text-[hsl(var(--color-muted-foreground))]"><span id="charCount">{coverLetter.length}</span>/500 characters</p>
              </div>

              <div className="flex gap-3 pt-4 border-t border-[hsl(var(--color-border))]">
                <button onClick={closeApply} className="btn btn-outline flex-1">Cancel</button>
                <button onClick={submitApplication} disabled={submitting} className="btn btn-primary flex-1"><FiSend className="h-4 w-4 mr-2" />{submitting ? 'Applying...' : 'Submit Application'}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default JobDetails;
