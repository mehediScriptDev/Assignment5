import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { FiChevronRight, FiX, FiPlus, FiSend } from 'react-icons/fi';
import { FaAws, FaReact, FaNodeJs, FaDatabase } from 'react-icons/fa';
import client from '../../api/client';
import { useToast } from '../../context/ToastContext';

const CreateJob = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [title, setTitle] = useState('');
  const [jobType, setJobType] = useState('');
  const [workMode, setWorkMode] = useState('');
  const [category, setCategory] = useState('');
  const [experience, setExperience] = useState('');
  const [location, setLocation] = useState('');
  const [salaryMin, setSalaryMin] = useState('');
  const [salaryMax, setSalaryMax] = useState('');
  const [salaryPeriod, setSalaryPeriod] = useState('yearly');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [benefits, setBenefits] = useState('');
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState(['JavaScript', 'React', 'Node.js', 'MongoDB', 'AWS']);
  const [vacancies, setVacancies] = useState(1);
  const [deadline, setDeadline] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [jobId, setJobId] = useState(null);
  const [initialLoading, setInitialLoading] = useState(false);
  const routerLocation = useLocation();

  const addSkill = () => {
    const s = skillInput.trim();
    if (!s) return;
    setSkills((prev) => (prev.includes(s) ? prev : [...prev, s]));
    setSkillInput('');
  };

  const removeSkill = (s) => setSkills((prev) => prev.filter((x) => x !== s));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !location || !deadline) {
      showToast && showToast('Please fill required fields', { type: 'error' });
      return;
    }

    const payload = {
      title,
      ...(jobType ? { type: jobType === 'full-time' ? 'Full-Time' : jobType === 'part-time' ? 'Part-Time' : jobType.charAt(0).toUpperCase() + jobType.slice(1) } : {}),
      ...(workMode ? { workMode: workMode === 'on-site' ? 'Onsite' : workMode === 'remote' ? 'Remote' : 'Hybrid' } : {}),
      ...(category ? { category } : {}),
      ...(experience ? { experienceLevel: experience === 'entry' ? 'Entry' : experience === 'mid' ? 'Mid' : experience === 'senior' ? 'Senior' : experience === 'lead' ? 'Lead' : experience } : {}),
      location,
      salaryMin: salaryMin ? Number(salaryMin) : undefined,
      salaryMax: salaryMax ? Number(salaryMax) : undefined,
      ...(salaryPeriod ? { salaryPeriod: salaryPeriod.charAt(0).toUpperCase() + salaryPeriod.slice(1) } : {}),
      description,
      requirements,
      benefits,
      skills,
      vacancies: vacancies ? Number(vacancies) : undefined,
      deadline: deadline ? new Date(deadline).toISOString() : undefined
    };

    try {
      setLoading(true);
      const res = isEdit && jobId ? await client.put(`/jobs/${jobId}`, payload) : await client.post('/jobs', payload);
      if (res.data && res.data.success) {
        showToast && showToast(isEdit ? 'Job updated' : 'Job published', { type: 'success' });
        navigate('/company/manage-jobs');
      } else {
        showToast && showToast(res.data?.message || 'Failed to publish job', { type: 'error' });
      }
    } catch (err) {
      console.error(err);
      showToast && showToast(err?.response?.data?.message || err.message || 'Server error', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Load job data when editing
  useEffect(() => {
    const params = new URLSearchParams(routerLocation.search);
    const id = params.get('jobId');
    if (!id) return;

    const loadJob = async () => {
      try {
        setInitialLoading(true);
        setIsEdit(true);
        setJobId(id);

        // Fetch a large page of company jobs and find by id
        const res = await client.get('/companies/jobs', { params: { page: 1, limit: 1000 } });
        if (res.data && res.data.success) {
          const found = (res.data.data || []).find(j => String(j.id) === String(id));
          if (found) {
            // Map values back to form state
            setTitle(found.title || '');
            // Map type like 'Full-time' -> 'full-time'
            const t = (found.type || '').toLowerCase();
            setJobType(t.includes('full') ? 'full-time' : t.includes('part') ? 'part-time' : t);
            const wm = (found.workMode || '').toLowerCase();
            setWorkMode(wm.includes('remote') ? 'remote' : wm.includes('hybrid') ? 'hybrid' : 'on-site');
            setCategory(found.category || 'engineering');
            const exp = (found.experienceLevel || '').toLowerCase();
            setExperience(exp.includes('entry') ? 'entry' : exp.includes('mid') ? 'mid' : exp.includes('senior') ? 'senior' : exp.includes('lead') ? 'lead' : 'mid');
            setLocation(found.location || '');
            setSalaryMin(found.salaryMin ?? '');
            setSalaryMax(found.salaryMax ?? '');
            setSalaryPeriod((found.salaryPeriod || '').toLowerCase() === 'yearly' ? 'yearly' : (found.salaryPeriod || '').toLowerCase() === 'hourly' ? 'hourly' : 'monthly');
            setDescription(found.description || '');
            setRequirements(found.requirements || '');
            setBenefits(found.benefits || '');
            setSkills(Array.isArray(found.skills) ? found.skills : (found.skills ? JSON.parse(found.skills) : []));
            setVacancies(found.vacancies ?? 1);
            setDeadline(found.deadline ? new Date(found.deadline).toISOString().split('T')[0] : '');
          } else {
            showToast && showToast('Job not found for editing', { type: 'error' });
            navigate('/company/manage-jobs');
          }
        }
      } catch (err) {
        console.error(err);
        showToast && showToast(err?.response?.data?.message || err.message || 'Failed to load job', { type: 'error' });
      } finally {
        setInitialLoading(false);
      }
        // call the loader when effect runs with a job id
        loadJob();
      }
    }, [routerLocation.search, navigate, showToast]);

    return (
      <div className="bg-background text-foreground antialiased">
            <main className="container mx-auto px-4 py-8 max-w-4xl">
              {/* Page Header (mirror template) */}
              <div className="mb-8">
                <div className="flex items-center gap-2 text-sm text-[hsl(var(--color-muted-foreground))] mb-2">
                  <Link to="/company/dashboard" className="hover:text-[hsl(var(--color-primary))]">Dashboard</Link>
                  <FiChevronRight className="h-4 w-4" />
                  <span className="text-[hsl(var(--color-foreground))]">{isEdit ? 'Edit Job' : 'Create Job'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{isEdit ? 'Edit Job' : 'Post a New Job'}</h1>
                    <p className="text-[hsl(var(--color-muted-foreground))]">{isEdit ? 'Update the job details and save changes' : 'Fill in the details to create a new job posting'}</p>
                  </div>
                  <Link to="/company/dashboard" className="btn btn-outline"><FiX className="h-4 w-4 mr-2" />Cancel</Link>
                </div>
              </div>

              {/* Form (structure mirrors template HTML) */}
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="card p-6">
                  <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="jobTitle" className="label block mb-2">Job Title *</label>
                      <input id="jobTitle" className="input" placeholder="e.g. Senior Full Stack Developer" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="jobType" className="label block mb-2">Job Type *</label>
                        <select id="jobType" className="select" value={jobType} onChange={(e) => setJobType(e.target.value)} required>
                          <option value="">Select job type</option>
                          <option value="full-time">Full-time</option>
                          <option value="part-time">Part-time</option>
                          <option value="contract">Contract</option>
                          <option value="freelance">Freelance</option>
                          <option value="internship">Internship</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="workMode" className="label block mb-2">Work Mode *</label>
                        <select id="workMode" className="select" value={workMode} onChange={(e) => setWorkMode(e.target.value)} required>
                          <option value="">Select work mode</option>
                          <option value="on-site">On-site</option>
                          <option value="remote">Remote</option>
                          <option value="hybrid">Hybrid</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="category" className="label block mb-2">Category *</label>
                        <select id="category" className="select" value={category} onChange={(e) => setCategory(e.target.value)} required>
                          <option value="">Select category</option>
                          <option value="engineering">Engineering</option>
                          <option value="design">Design</option>
                          <option value="product">Product</option>
                          <option value="marketing">Marketing</option>
                          <option value="sales">Sales</option>
                          <option value="hr">Human Resources</option>
                          <option value="finance">Finance</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="experience" className="label block mb-2">Experience Level *</label>
                        <select id="experience" className="select" value={experience} onChange={(e) => setExperience(e.target.value)} required>
                          <option value="">Select experience level</option>
                          <option value="entry">Entry Level (0-2 years)</option>
                          <option value="mid">Mid Level (2-5 years)</option>
                          <option value="senior">Senior Level (5-10 years)</option>
                          <option value="lead">Lead (10+ years)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card p-6">
                  <h2 className="text-xl font-semibold mb-6">Location & Compensation</h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label htmlFor="city" className="label block mb-2">Location *</label>
                        <input id="city" className="input" placeholder="e.g. San Francisco" value={location} onChange={(e) => setLocation(e.target.value)} required />
                      </div>

                      <div>
                        <label htmlFor="salaryMin" className="label block mb-2">Minimum Salary ($)</label>
                        <input id="salaryMin" type="number" className="input" placeholder="e.g. 100000" value={salaryMin} onChange={(e) => setSalaryMin(e.target.value)} />
                      </div>

                      <div>
                        <label htmlFor="salaryMax" className="label block mb-2">Maximum Salary ($)</label>
                        <input id="salaryMax" type="number" className="input" placeholder="e.g. 150000" value={salaryMax} onChange={(e) => setSalaryMax(e.target.value)} />
                      </div>

                      <div>
                        <label htmlFor="salaryPeriod" className="label block mb-2">Salary Period</label>
                        <select id="salaryPeriod" className="select" value={salaryPeriod} onChange={(e) => setSalaryPeriod(e.target.value)}>
                          <option value="yearly">Yearly</option>
                          <option value="monthly">Monthly</option>
                          <option value="hourly">Hourly</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card p-6">
                  <h2 className="text-xl font-semibold mb-6">Job Description</h2>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="description" className="label block mb-2">Job Description *</label>
                      <textarea id="description" className="textarea" rows={8} placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..." value={description} onChange={(e) => setDescription(e.target.value)} required />
                      <p className="text-xs text-[hsl(var(--color-muted-foreground))] mt-2">Provide a detailed description of the role and responsibilities</p>
                    </div>

                    <div>
                      <label htmlFor="requirements" className="label block mb-2">Requirements & Qualifications</label>
                      <textarea id="requirements" className="textarea" rows={6} placeholder="List the required skills, qualifications, and experience..." value={requirements} onChange={(e) => setRequirements(e.target.value)} />
                    </div>

                    <div>
                      <label htmlFor="benefits" className="label block mb-2">Benefits & Perks</label>
                      <textarea id="benefits" className="textarea" rows={5} placeholder="Describe the benefits, perks, and what makes your company a great place to work..." value={benefits} onChange={(e) => setBenefits(e.target.value)} />
                    </div>
                  </div>
                </div>

                <div className="card p-6">
                  <h2 className="text-xl font-semibold mb-6">Required Skills</h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="skillInput" className="label block mb-2">Add Skills *</label>
                      <div className="flex gap-2">
                        <input id="skillInput" type="text" className="input flex-1" placeholder="Type a skill and press Add" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} />
                        <button type="button" onClick={addSkill} className="btn btn-primary"><FiPlus className="h-4 w-4 mr-2" />Add</button>
                      </div>
                      <p className="text-xs text-[hsl(var(--color-muted-foreground))] mt-2">Add technical and soft skills required for this position</p>
                    </div>

                    <div>
                      <label className="label block mb-3">Added Skills</label>
                      <div className="flex flex-wrap gap-2">
                        {skills.length > 0 ? (
                          skills.map((s) => (
                            <span key={s} className="badge badge-secondary inline-flex items-center gap-1">
                              {s}
                              <button type="button" onClick={() => removeSkill(s)} className="hover:text-red-600 ml-2">
                                <FiX className="h-3 w-3" />
                              </button>
                            </span>
                          ))
                        ) : (
                          <p className="text-sm text-[hsl(var(--color-muted-foreground))]">No skills added yet</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card p-6">
                  <h2 className="text-xl font-semibold mb-6">Application Settings</h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="vacancies" className="label block mb-2">Number of Vacancies</label>
                        <input id="vacancies" type="number" className="input" placeholder="e.g. 2" value={vacancies} onChange={(e) => setVacancies(e.target.value)} min={1} />
                      </div>

                      <div>
                        <label htmlFor="deadline" className="label block mb-2">Application Deadline *</label>
                        <input id="deadline" type="date" className="input" required value={deadline} onChange={(e) => setDeadline(e.target.value)} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card p-6">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1"></div>
                    <Link to="/company/dashboard" className="btn btn-outline">Cancel</Link>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? (isEdit ? 'Updating...' : 'Publishing...') : (
                        <>
                          <FiSend className="h-4 w-4 mr-2" />
                          {isEdit ? 'Update Job' : 'Publish Job'}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </main>

            <footer className="border-t border-[hsl(var(--color-border))] bg-[hsl(var(--color-muted))]/30 mt-16">
              <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div>
                    <h3 className="font-semibold mb-4">LWS Job Portal</h3>
                    <p className="text-sm text-[hsl(var(--color-muted-foreground))]">Your trusted platform for finding the perfect job or the perfect candidate.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4">For Job Seekers</h4>
                    <ul className="space-y-2 text-sm text-[hsl(var(--color-muted-foreground))]">
                      <li><Link to="/" className="hover:text-[hsl(var(--color-foreground))]">Browse Jobs</Link></li>
                      <li><a href="#" className="hover:text-[hsl(var(--color-foreground))]">Companies</a></li>
                      <li><a href="#" className="hover:text-[hsl(var(--color-foreground))]">Career Advice</a></li>
                      <li><a href="#" className="hover:text-[hsl(var(--color-foreground))]">Salary Guide</a></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4">For Employers</h4>
                    <ul className="space-y-2 text-sm text-[hsl(var(--color-muted-foreground))]">
                      <li><a href="#" className="hover:text-[hsl(var(--color-foreground))]">Post a Job</a></li>
                      <li><a href="#" className="hover:text-[hsl(var(--color-foreground))]">Browse Candidates</a></li>
                      <li><a href="#" className="hover:text-[hsl(var(--color-foreground))]">Pricing</a></li>
                      <li><a href="#" className="hover:text-[hsl(var(--color-foreground))]">Hiring Resources</a></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4">Company</h4>
                    <ul className="space-y-2 text-sm text-[hsl(var(--color-muted-foreground))]">
                      <li><a href="#" className="hover:text-[hsl(var(--color-foreground))]">About Us</a></li>
                      <li><a href="#" className="hover:text-[hsl(var(--color-foreground))]">Contact</a></li>
                      <li><a href="#" className="hover:text-[hsl(var(--color-foreground))]">Privacy Policy</a></li>
                      <li><a href="#" className="hover:text-[hsl(var(--color-foreground))]">Terms of Service</a></li>
                    </ul>
                  </div>
                </div>
                <div className="border-t border-[hsl(var(--color-border))] mt-8 pt-8 text-center text-sm text-[hsl(var(--color-muted-foreground))]">
                  <p>&copy; 2025 LWS Job Portal. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </div>
        );
      };

export default CreateJob;
