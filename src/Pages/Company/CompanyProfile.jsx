import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import client from '../../api/client';
import { useToast } from '../../context/ToastContext';
import { FiBriefcase, FiMapPin, FiUsers, FiShare2, FiGlobe, FiMail, FiPhone, FiClock, FiArrowRight } from 'react-icons/fi';
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram, FaGithub, FaLightbulb, FaHeart } from 'react-icons/fa';

const CompanyProfile = () => {
  const { id } = useParams(); // slug or UUID
  const [company, setCompany] = useState(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [applying, setApplying] = useState(false);
  const [appliedJobIds, setAppliedJobIds] = useState([]);
  const [appliedMap, setAppliedMap] = useState({}); // jobId -> applicationId
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    setLoading(true);
    const fetchBySlug = async () => {
      try {
        const res = await client.get(`/companies/${id}`);
        if (!mounted) return;
        setCompany(res.data?.data || res.data || null);
        setError(null);
      } catch (err) {
        if (!mounted) return;
        // fallback: try fetching jobs by companyId
        const status = err?.response?.status;
        if (status === 404) {
          try {
            const r = await client.get('/jobs', { params: { companyId: id, page: 1, limit: 10 } });
            const jobs = r.data?.data || [];
            if (jobs.length > 0 && jobs[0].company) {
              setCompany({ ...jobs[0].company, jobs });
              setError(null);
            } else {
              setError('Company not found');
              setCompany(null);
            }
          } catch (e2) {
            setError('Company not found');
            setCompany(null);
          }
        } else {
          setError(err?.response?.data?.message || err.message || 'Failed to load company');
          setCompany(null);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchBySlug();
    return () => { mounted = false; };
  }, [id]);

  // Load user's applications to identify which jobs are applied
  useEffect(() => {
    const loadApplied = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const res = await client.get('/applications/my-applications');
        if (res.data && res.data.success) {
          const apps = res.data.data || [];
          const ids = apps.map(a => a.job?.id || a.jobId || a.job_id).filter(Boolean);
          const map = {};
          apps.forEach(a => {
            const jid = a.job?.id || a.jobId || a.job_id;
            if (jid) map[jid] = a.id;
          });
          setAppliedJobIds(ids);
          setAppliedMap(map);
        }
      } catch (e) {
        console.debug('Failed to load user applications', e?.message || e);
      }
    };
    loadApplied();
  }, []);

  if (loading) return <main className="container mx-auto px-4 py-8"><div className="text-center py-12">Loading company…</div></main>;
  if (error) return <main className="container mx-auto px-4 py-8"><div className="text-center py-12 text-destructive">{error}</div></main>;
  if (!company) return <main className="container mx-auto px-4 py-8"><div className="text-center py-12">Company not found.</div></main>;

  const jobs = company.jobs || [];

  const closeApplyModal = () => {
    setShowApplyModal(false);
    setSelectedJob(null);
    setCoverLetter('');
  };

  const handleApplySubmit = async () => {
    if (!selectedJob) return;
    if (!coverLetter || coverLetter.trim().length === 0) {
      alert('Please enter a cover letter.');
      return;
    }

    try {
      setApplying(true);
      const res = await client.post(`/applications/jobs/${selectedJob.id}/apply`, { coverLetter });
      if (res.data && res.data.success) {
        // mark job as applied
        setAppliedJobIds(prev => Array.from(new Set([...(prev || []), selectedJob.id])));
        showToast('Application submitted successfully.', { type: 'success' });
        closeApplyModal();
      } else {
        alert(res.data?.message || 'Application failed');
      }
    } catch (err) {
      console.error('Apply error', err);
      alert(err?.response?.data?.message || err.message || 'Application failed');
    } finally {
      setApplying(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="card p-8 mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-shrink-0">
            <div className="h-32 w-32 rounded-xl bg-[hsl(var(--color-secondary))] flex items-center justify-center overflow-hidden">
              {company.logoUrl ? (
                <img src={company.logoUrl} alt={`${company.name} logo`} className="h-full w-full object-contain p-2" />
              ) : (
                <FiBriefcase className="h-16 w-16 text-[hsl(var(--color-primary))]" />
              )}
            </div>
          </div>

          <div className="flex-1 h-full items-center">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{company.name}</h1>
                <div className="flex flex-wrap items-center gap-3 text-[hsl(var(--color-muted-foreground))]">
                  {company.industry && <span className="flex items-center gap-1"><FaLightbulb className="h-4 w-4" /> {company.industry}</span>}
                  <span>•</span>
                  {company.location && <span className="flex items-center gap-1"><FiMapPin className="h-4 w-4" /> {company.location}</span>}
                  <span>•</span>
                  <span className="flex items-center gap-1"><FiUsers className="h-4 w-4" /> {company.employeeCount || '—'} employees</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="btn btn-outline flex items-center gap-2"><FiShare2 /> Share</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">About Company</h2>
            <div className="space-y-4 text-[hsl(var(--color-foreground))]">
              <p>{company.description || 'No description provided.'}</p>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center">
                    <FaLightbulb className="h-5 w-5 text-[hsl(var(--color-primary))]" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Innovation</h3>
                  <p className="text-sm text-[hsl(var(--color-muted-foreground))]">We encourage creative thinking and embrace new ideas to solve problems.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center">
                    <FiUsers className="h-5 w-5 text-[hsl(var(--color-primary))]" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Collaboration</h3>
                  <p className="text-sm text-[hsl(var(--color-muted-foreground))]">Teamwork and open communication are at the heart of everything we do.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center">
                    <FiBriefcase className="h-5 w-5 text-[hsl(var(--color-primary))]" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Excellence</h3>
                  <p className="text-sm text-[hsl(var(--color-muted-foreground))]">We strive for the highest quality in our products and services.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center">
                    <FaHeart className="h-5 w-5 text-[hsl(var(--color-primary))]" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Integrity</h3>
                  <p className="text-sm text-[hsl(var(--color-muted-foreground))]">Honesty and transparency guide our decisions and actions.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card p-6" id="jobs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Open Positions</h2>
              <span className="text-sm text-[hsl(var(--color-muted-foreground))]">{jobs.length} jobs available</span>
            </div>
            <div className="space-y-4">
              {jobs.map(job => (
                <article key={job.id} className="border border-[hsl(var(--color-border))] rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-lg font-semibold mb-1"><Link to={`/jobs/${job.slug}`} className="hover:underline">{job.title}</Link></h3>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-[hsl(var(--color-muted-foreground))]">
                        <span className="flex items-center gap-1"><FiMapPin className="h-4 w-4" /> {job.location}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><FiClock className="h-4 w-4" /> {new Date(job.createdAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><FiUsers className="h-4 w-4" /> {job.applicants || 0} applicants</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-[hsl(var(--color-muted-foreground))] mb-3">{job.description?.slice(0, 220)}</p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="badge badge-secondary">{job.type}</span>
                    <span className="badge badge-outline">{job.workMode}</span>
                    {(job.skills || []).slice(0,5).map(s => <span key={s} className="badge badge-outline">{s}</span>)}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[hsl(var(--color-border))]">
                    <span className="text-sm font-semibold text-[hsl(var(--color-primary))]">{job.salaryMin || job.salaryMax ? `${job.salaryMin ? `$${job.salaryMin}` : ''}${job.salaryMin && job.salaryMax ? ' - ' : ''}${job.salaryMax ? `$${job.salaryMax}` : ''}` : ''}</span>
                    <div className="flex gap-2">
                      <Link to={`/jobs/${job.slug || job.id}`} className="btn btn-outline text-sm">View Details</Link>
                      {appliedJobIds.includes(job.id) ? (
                        <button
                          className="btn btn-primary text-sm"
                          style={{ background: '#fff8e1', borderColor: '#fff8e1', color: '#111827' }}
                          onClick={async () => {
                          if (!confirm('Are you sure you want to withdraw this application?')) return;
                          try {
                            const appId = appliedMap[job.id];
                            if (!appId) throw new Error('Application id not found');
                            await client.delete(`/applications/${appId}`);
                            setAppliedJobIds(prev => prev.filter(id => id !== job.id));
                            setAppliedMap(prev => { const n = { ...prev }; delete n[job.id]; return n; });
                            // update job applicants count locally
                            setCompany(prev => {
                              if (!prev) return prev;
                              const jobs = (prev.jobs || []).map(j => j.id === job.id ? ({ ...j, applicants: Math.max(0, (j.applicants || 1) - 1) }) : j);
                              return { ...prev, jobs };
                            });
                            showToast('Application withdrawn', { type: 'success' });
                          } catch (e) {
                            console.error('Withdraw failed', e);
                            alert(e?.response?.data?.message || e.message || 'Failed to withdraw application');
                          }
                        }}>Withdraw</button>
                      ) : (
                        <button
                          className="btn btn-primary text-sm"
                          onClick={(e) => {
                            const token = typeof window !== 'undefined' ? window.localStorage?.token : null;
                            if (!token) {
                              // redirect to login with next param
                              const next = encodeURIComponent(`/jobs/${job.slug || job.id}`);
                              window.location.href = `/login?next=${next}`;
                              return;
                            }
                            // open modal
                            setSelectedJob(job);
                            setCoverLetter('');
                            setShowApplyModal(true);
                          }}
                        >
                          Apply Now
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              ))}

              <div className="mt-6 text-center">
                <Link to="/jobs" className="btn btn-outline">View All Open Positions <FiArrowRight className="ml-2" /></Link>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <FiGlobePlaceholder className="h-5 w-5 text-[hsl(var(--color-muted-foreground))] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-[hsl(var(--color-muted-foreground))] mb-1">Website</p>
                  {company.websiteUrl ? (
                    <a href={company.websiteUrl} className="text-sm font-medium text-[hsl(var(--color-primary))] hover:underline">{company.websiteUrl.replace(/^https?:\/\//, '')}</a>
                  ) : (
                    <div className="text-sm text-muted-foreground">—</div>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiMail className="h-5 w-5 text-[hsl(var(--color-muted-foreground))] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-[hsl(var(--color-muted-foreground))] mb-1">Email</p>
                  {company.email ? (<a href={`mailto:${company.email}`} className="text-sm font-medium text-[hsl(var(--color-primary))] hover:underline">{company.email}</a>) : (<div className="text-sm text-muted-foreground">—</div>)}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiPhone className="h-5 w-5 text-[hsl(var(--color-muted-foreground))] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-[hsl(var(--color-muted-foreground))] mb-1">Phone</p>
                  {company.phone ? (<a href={`tel:${company.phone}`} className="text-sm font-medium">{company.phone}</a>) : (<div className="text-sm text-muted-foreground">—</div>)}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiMapPin className="h-5 w-5 text-[hsl(var(--color-muted-foreground))] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-[hsl(var(--color-muted-foreground))] mb-1">Headquarters</p>
                  <p className="text-sm font-medium">{company.address || company.location || '—'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="space-y-2">
              <a href={company.linkedinUrl || '#'} className="flex items-center gap-3 p-2 rounded-md hover:bg-[hsl(var(--color-accent))] transition-colors">
                <FaLinkedin className="h-5 w-5 text-[hsl(var(--color-muted-foreground))]" />
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
              <a href={company.twitterUrl || '#'} className="flex items-center gap-3 p-2 rounded-md hover:bg-[hsl(var(--color-accent))] transition-colors">
                <FaTwitter className="h-5 w-5 text-[hsl(var(--color-muted-foreground))]" />
                <span className="text-sm font-medium">Twitter</span>
              </a>
              <a href={company.facebookUrl || '#'} className="flex items-center gap-3 p-2 rounded-md hover:bg-[hsl(var(--color-accent))] transition-colors">
                <FaFacebook className="h-5 w-5 text-[hsl(var(--color-muted-foreground))]" />
                <span className="text-sm font-medium">Facebook</span>
              </a>
              <a href={company.instagramUrl || '#'} className="flex items-center gap-3 p-2 rounded-md hover:bg-[hsl(var(--color-accent))] transition-colors">
                <FaInstagram className="h-5 w-5 text-[hsl(var(--color-muted-foreground))]" />
                <span className="text-sm font-medium">Instagram</span>
              </a>
              <a href={company.githubUrl || '#'} className="flex items-center gap-3 p-2 rounded-md hover:bg-[hsl(var(--color-accent))] transition-colors">
                <FaGithub className="h-5 w-5 text-[hsl(var(--color-muted-foreground))]" />
                <span className="text-sm font-medium">GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      {showApplyModal && (
        <ApplyModal
          job={selectedJob}
          coverLetter={coverLetter}
          setCoverLetter={setCoverLetter}
          applying={applying}
          onClose={closeApplyModal}
          onSubmit={handleApplySubmit}
        />
      )}
    </main>
  );
};

// Apply Modal (rendered inline via state)
const ApplyModal = ({ job, coverLetter, setCoverLetter, applying, onClose, onSubmit }) => {
  if (!job) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg shadow-lg max-w-lg w-full p-6 z-10">
        <h3 className="text-lg font-semibold mb-3">Apply to {job.title}</h3>
        <p className="text-sm text-muted-foreground mb-4">You're applying to <strong>{job.company?.name || job.companyName || ''}</strong>. Please include a short cover letter.</p>
        <textarea
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          className="w-full p-3 border rounded-md h-32"
          placeholder="Write a short cover letter..."
        />
        <div className="flex items-center justify-end gap-3 mt-4">
          <button className="btn btn-secondary" onClick={onClose} disabled={applying}>Cancel</button>
          <button className="btn btn-primary" onClick={onSubmit} disabled={applying}>{applying ? 'Applying…' : 'Submit Application'}</button>
        </div>
      </div>
    </div>
  );
};

export { ApplyModal };

// Placeholder icon component for globe to avoid importing another lib
const FiGlobePlaceholder = (props) => <FiGlobe {...props} />;

export default CompanyProfile;
