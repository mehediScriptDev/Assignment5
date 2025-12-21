import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router';
import {
  FiBriefcase,
  FiPlus,
  FiPhone,
  FiShare2,
  FiSettings,
  FiCreditCard,
  FiShield,
  FiUpload,
  FiCamera,
  FiChevronRight,
  FiSave
} from 'react-icons/fi';
import { BiBuilding } from 'react-icons/bi';
import { FaLinkedin, FaFacebook, FaInstagram, FaGithub } from 'react-icons/fa';
import client from '../../api/client';
import { useToast } from '../../context/ToastContext';
import { AuthContext } from '../../context/AuthContext';

const getFileUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  const baseUrl = import.meta.env.VITE_API_BASE?.replace('/api', '') || 'http://localhost:5000';
  return `${baseUrl}${path}`;
};

const CompanySettings = () => {
  const { showToast } = useToast();
  const { user, updateUser, refreshUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [form, setForm] = useState({
    name: '',
    industry: '',
    description: '',
    employeeCount: '',
    companyType: '',
    websiteUrl: '',
    foundedYear: '',
    city: '',
    state: '',
    country: '',
    phone: '',
    hrEmail: '',
    infoEmail: '',
    socialLinks: {
      linkedin: '',
      twitter: '',
      facebook: '',
      instagram: '',
      github: ''
    },
    logoUrl: ''
  });

  useEffect(() => {
    const loadCompany = async () => {
      try {
        setLoading(true);
        const res = await client.get('/companies/profile');
        if (res.data && res.data.success) {
          const company = res.data.data;
          const social = company.socialLinks || {};
          const parsedSocial = typeof social === 'string' ? JSON.parse(social) : social;
          
          setForm({
            name: company.name || '',
            industry: company.industry || '',
            description: company.description || '',
            employeeCount: company.employeeCount || '',
            companyType: company.companyType || '',
            websiteUrl: company.websiteUrl || '',
            foundedYear: company.foundedYear || '',
            city: company.city || '',
            state: company.state || '',
            country: company.country || '',
            phone: company.phone || '',
            hrEmail: company.hrEmail || '',
            infoEmail: company.infoEmail || '',
            socialLinks: {
              linkedin: parsedSocial.linkedin || '',
              twitter: parsedSocial.twitter || '',
              facebook: parsedSocial.facebook || '',
              instagram: parsedSocial.instagram || '',
              github: parsedSocial.github || ''
            },
            logoUrl: company.logoUrl || ''
          });
        }
      } catch (err) {
        console.error('Failed to load company', err);
        showToast && showToast(err?.response?.data?.message || 'Failed to load company data', { type: 'error' });
      } finally {
        setLoading(false);
      }
    };
    loadCompany();
  }, [showToast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('social_')) {
      const socialKey = name.replace('social_', '');
      setForm(prev => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [socialKey]: value }
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      showToast && showToast('Please upload a valid image (JPEG, PNG, SVG, WEBP)', { type: 'error' });
      return;
    }
    
    if (file.size > 2 * 1024 * 1024) {
      showToast && showToast('Logo must be less than 2MB', { type: 'error' });
      return;
    }
    
    setLogo(file);
    const reader = new FileReader();
    reader.onloadend = () => setLogoPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const uploadLogo = async () => {
    if (!logo) return;
    try {
      setUploadingLogo(true);
      const formData = new FormData();
      formData.append('logo', logo);
      const res = await client.post('/companies/logo', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data && res.data.success) {
        showToast && showToast('Logo uploaded successfully', { type: 'success' });
        setForm(prev => ({ ...prev, logoUrl: res.data.data.logoUrl }));
        setLogo(null);
        setLogoPreview(null);
        if (refreshUser) {
          await refreshUser();
        }
      }
    } catch (err) {
      console.error('Logo upload failed', err);
      showToast && showToast(err?.response?.data?.message || 'Failed to upload logo', { type: 'error' });
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await client.put('/companies/profile', form);
      if (res.data && res.data.success) {
        showToast && showToast('Company profile updated successfully', { type: 'success' });
        if (refreshUser) {
          await refreshUser();
        }
      }
    } catch (err) {
      console.error('Update failed', err);
      showToast && showToast(err?.response?.data?.message || 'Failed to update company profile', { type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
          <p className="mt-2 text-muted-foreground">Loading company settings...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-[hsl(var(--color-muted-foreground))] mb-2">
            <Link to="/company/dashboard" className="hover:text-[hsl(var(--color-primary))]">Dashboard</Link>
            <FiChevronRight className="h-4 w-4" />
            <span className="text-[hsl(var(--color-foreground))]">Company Settings</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">Company Settings</h1>
            <p className="text-[hsl(var(--color-muted-foreground))]">Manage your company profile and preferences</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="card p-4">
              <nav className="space-y-1">
                <a href="#company-info" className="flex items-center gap-3 px-3 py-2 text-sm font-medium bg-[hsl(var(--color-accent))] rounded-md">
                  <BiBuilding className="h-4 w-4" />
                  Company Info
                </a>
                <a href="#contact" className="flex items-center gap-3 px-3 py-2 text-sm text-[hsl(var(--color-muted-foreground))] hover:bg-[hsl(var(--color-accent))] hover:text-[hsl(var(--color-foreground))] rounded-md transition-colors">
                  <FiPhone className="h-4 w-4" />
                  Contact Details
                </a>
                <a href="#social" className="flex items-center gap-3 px-3 py-2 text-sm text-[hsl(var(--color-muted-foreground))] hover:bg-[hsl(var(--color-accent))] hover:text-[hsl(var(--color-foreground))] rounded-md transition-colors">
                  <FiShare2 className="h-4 w-4" />
                  Social Media
                </a>
                <a href="#preferences" className="flex items-center gap-3 px-3 py-2 text-sm text-[hsl(var(--color-muted-foreground))] hover:bg-[hsl(var(--color-accent))] hover:text-[hsl(var(--color-foreground))] rounded-md transition-colors">
                  <FiSettings className="h-4 w-4" />
                  Preferences
                </a>
                <a href="#billing" className="flex items-center gap-3 px-3 py-2 text-sm text-[hsl(var(--color-muted-foreground))] hover:bg-[hsl(var(--color-accent))] hover:text-[hsl(var(--color-foreground))] rounded-md transition-colors">
                  <FiCreditCard className="h-4 w-4" />
                  Billing
                </a>
                <a href="#account" className="flex items-center gap-3 px-3 py-2 text-sm text-[hsl(var(--color-muted-foreground))] hover:bg-[hsl(var(--color-accent))] hover:text-[hsl(var(--color-foreground))] rounded-md transition-colors">
                  <FiShield className="h-4 w-4" />
                  Account Security
                </a>
              </nav>
            </div>

            <div className="card p-6 mt-6">
              <div className="flex flex-col items-center text-center">
                <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center overflow-hidden mb-4 border-2 border-border">
                  {form.logoUrl ? (
                    <img src={getFileUrl(form.logoUrl)} alt={form.name} className="h-full w-full object-cover" />
                  ) : (
                    <BiBuilding className="h-10 w-10 text-primary" />
                  )}
                </div>
                <h3 className="font-semibold mb-1">{form.name || 'Company Name'}</h3>
                <p className="text-xs text-[hsl(var(--color-muted-foreground))] mb-4">Premium Member</p>
                <div className="w-full space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[hsl(var(--color-muted-foreground))]">Industry</span>
                    <span className="font-medium">{form.industry || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[hsl(var(--color-muted-foreground))]">Location</span>
                    <span className="font-medium">{form.city || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[hsl(var(--color-muted-foreground))]">Founded</span>
                    <span className="font-medium">{form.foundedYear || '-'}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-3 space-y-6">
            <div id="company-info" className="card p-6">
              <h2 className="text-xl font-semibold mb-6">Company Information</h2>

              <div className="mb-6">
                <label className="label mb-2">Company Logo</label>
                <div className="flex items-start gap-6">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-lg bg-secondary flex items-center justify-center overflow-hidden border-2 border-border">
                      {logoPreview ? (
                        <img src={logoPreview} alt="Preview" className="h-full w-full object-cover" />
                      ) : form.logoUrl ? (
                        <img src={getFileUrl(form.logoUrl)} alt={form.name} className="h-full w-full object-cover" />
                      ) : (
                        <BiBuilding className="h-12 w-12 text-primary" />
                      )}
                    </div>
                    <label htmlFor="logoUpload" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-[hsl(var(--color-primary))] text-[hsl(var(--color-primary-foreground))] flex items-center justify-center shadow-lg hover:bg-[hsl(var(--color-primary))]/90 cursor-pointer">
                      <FiCamera className="h-4 w-4" />
                    </label>
                  </div>
                  <div className="flex-1">
                    <input type="file" id="logoUpload" className="hidden" accept="image/*" onChange={handleLogoChange} />
                    {logo ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">{logo.name}</span>
                        </div>
                        <button type="button" onClick={uploadLogo} disabled={uploadingLogo} className="btn btn-primary btn-sm">
                          <FiUpload className="h-4 w-4 mr-2" />
                          {uploadingLogo ? 'Uploading...' : 'Upload Logo'}
                        </button>
                      </div>
                    ) : (
                      <>
                        <label htmlFor="logoUpload" className="btn btn-outline cursor-pointer inline-flex items-center"><FiUpload className="h-4 w-4 mr-2" />Upload Logo</label>
                        <p className="text-xs text-[hsl(var(--color-muted-foreground))] mt-2">Recommended size: 200x200px. Max file size: 2MB. Supported formats: JPG, PNG, SVG</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="label mb-2" htmlFor="companyName">Company Name <span className="text-red-500">*</span></label>
                  <input id="companyName" name="name" className="input" value={form.name} onChange={handleChange} placeholder="Enter company name" required />
                </div>
                <div>
                  <label className="label mb-2" htmlFor="industry">Industry <span className="text-red-500">*</span></label>
                  <input id="industry" name="industry" className="input" value={form.industry} onChange={handleChange} placeholder="e.g., Technology, Healthcare" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="label mb-2" htmlFor="companySize">Company Size</label>
                  <select id="companySize" name="employeeCount" className="input" value={form.employeeCount} onChange={handleChange}>
                    <option value="">Select company size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="501-1000">501-1000 employees</option>
                    <option value="1001-5000">1001-5000 employees</option>
                    <option value="5001-10000">5001-10000 employees</option>
                    <option value="10000+">10000+ employees</option>
                  </select>
                </div>
                <div>
                  <label className="label mb-2" htmlFor="companyType">Company Type</label>
                  <select id="companyType" name="companyType" className="input" value={form.companyType} onChange={handleChange}>
                    <option value="">Select company type</option>
                    <option value="startup">Startup</option>
                    <option value="private">Private Company</option>
                    <option value="public">Public Company</option>
                    <option value="non-profit">Non-Profit</option>
                    <option value="government">Government Agency</option>
                    <option value="educational">Educational Institution</option>
                    <option value="self-employed">Self-Employed</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="label mb-2" htmlFor="website">Website <span className="text-red-500">*</span></label>
                  <input id="website" name="websiteUrl" className="input" value={form.websiteUrl} onChange={handleChange} placeholder="https://yourcompany.com" required />
                </div>
                <div>
                  <label className="label mb-2" htmlFor="founded">Founded Year</label>
                  <input id="founded" name="foundedYear" className="input" value={form.foundedYear} onChange={handleChange} placeholder="e.g., 2020" />
                </div>
              </div>

              <div className="mb-4">
                <label className="label mb-2" htmlFor="about">About Company <span className="text-red-500">*</span></label>
                <textarea id="about" name="description" className="textarea" rows={6} value={form.description} onChange={handleChange} required placeholder="Tell us about your company..."></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="label mb-2" htmlFor="city">City</label>
                  <input id="city" name="city" className="input" value={form.city} onChange={handleChange} placeholder="City" />
                </div>
                <div>
                  <label className="label mb-2" htmlFor="state">State/Province</label>
                  <input id="state" name="state" className="input" value={form.state} onChange={handleChange} placeholder="State" />
                </div>
                <div>
                  <label className="label mb-2" htmlFor="country">Country</label>
                  <input id="country" name="country" className="input" value={form.country} onChange={handleChange} placeholder="Country" />
                </div>
              </div>
            </div>

            <div id="contact" className="card p-6">
              <h2 className="text-xl font-semibold mb-6">Contact Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="label mb-2" htmlFor="phone">Phone Number <span className="text-red-500">*</span></label>
                  <input id="phone" name="phone" className="input" value={form.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="label mb-2" htmlFor="hrEmail">HR Department Email</label>
                  <input id="hrEmail" name="hrEmail" className="input" value={form.hrEmail} onChange={handleChange} placeholder="hr@example.com" />
                </div>
                <div>
                  <label className="label mb-2" htmlFor="supportEmail">Information Email</label>
                  <input id="supportEmail" name="infoEmail" className="input" value={form.infoEmail} onChange={handleChange} placeholder="info@example.com" />
                </div>
              </div>
            </div>

            <div id="social" className="card p-6">
              <h2 className="text-xl font-semibold mb-6">Social Media Links</h2>

              <div className="space-y-4">
                <div>
                  <label className="label mb-2" htmlFor="linkedin">LinkedIn Profile</label>
                  <div className="relative">
                    <FaLinkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(var(--color-muted-foreground))]" />
                    <input id="linkedin" name="social_linkedin" className="input pl-10" value={form.socialLinks.linkedin} onChange={handleChange} placeholder="https://linkedin.com/company/yourcompany" />
                  </div>
                </div>

                <div>
                  <label className="label mb-2" htmlFor="twitter">Twitter/X Profile</label>
                  <div className="relative">
                    <FiShare2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(var(--color-muted-foreground))]" />
                    <input id="twitter" name="social_twitter" className="input pl-10" value={form.socialLinks.twitter} onChange={handleChange} placeholder="https://twitter.com/yourcompany" />
                  </div>
                </div>

                <div>
                  <label className="label mb-2" htmlFor="facebook">Facebook Page</label>
                  <div className="relative">
                    <FaFacebook className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(var(--color-muted-foreground))]" />
                    <input id="facebook" name="social_facebook" className="input pl-10" value={form.socialLinks.facebook} onChange={handleChange} placeholder="https://facebook.com/yourcompany" />
                  </div>
                </div>

                <div>
                  <label className="label mb-2" htmlFor="instagram">Instagram Profile</label>
                  <div className="relative">
                    <FaInstagram className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(var(--color-muted-foreground))]" />
                    <input id="instagram" name="social_instagram" className="input pl-10" value={form.socialLinks.instagram} onChange={handleChange} placeholder="https://instagram.com/yourcompany" />
                  </div>
                </div>

                <div>
                  <label className="label mb-2" htmlFor="github">GitHub Organization</label>
                  <div className="relative">
                    <FaGithub className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(var(--color-muted-foreground))]" />
                    <input id="github" name="social_github" className="input pl-10" value={form.socialLinks.github} onChange={handleChange} placeholder="https://github.com/yourcompany" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 pt-4">
              <div className="flex gap-2">
                <button type="submit" className="btn btn-primary inline-flex items-center" disabled={saving}>
                  <FiSave className="h-4 w-4 mr-2" />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
        </form>
      </main>
  );
};

export default CompanySettings;
