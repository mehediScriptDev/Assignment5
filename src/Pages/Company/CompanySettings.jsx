import React from 'react';
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

const CompanySettings = () => {
  return (
    <div className="bg-background text-foreground antialiased">
      <header className="sticky top-0 z-50 w-full border-b border-[hsl(var(--color-border))] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center space-x-2">
              <FiBriefcase className="h-8 w-8 text-[hsl(var(--color-primary))]" />
              <span className="text-xl font-bold">LWS Job Portal</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/company/dashboard" className="text-sm font-medium text-[hsl(var(--color-muted-foreground))] transition-colors hover:text-[hsl(var(--color-primary))]">Dashboard</Link>
              <Link to="/company/manage-jobs" className="text-sm font-medium text-[hsl(var(--color-muted-foreground))] transition-colors hover:text-[hsl(var(--color-primary))]">Manage Jobs</Link>
              <Link to="/company/applicants" className="text-sm font-medium text-[hsl(var(--color-muted-foreground))] transition-colors hover:text-[hsl(var(--color-primary))]">Applicants</Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/company/create-job" className="btn btn-primary inline-flex items-center gap-2"><FiPlus className="h-4 w-4" />Post Job</Link>

            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-[hsl(var(--color-secondary))] flex items-center justify-center">
                <BiBuilding className="h-4 w-4 text-[hsl(var(--color-primary))]" />
              </div>
              <span className="text-sm font-medium hidden md:inline">TechCorp Solutions</span>
            </div>
          </div>
        </div>
      </header>

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
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4">
                  <BiBuilding className="h-10 w-10 text-white" />
                </div>
                <h3 className="font-semibold mb-1">TechCorp Solutions</h3>
                <p className="text-xs text-[hsl(var(--color-muted-foreground))] mb-4">Premium Member</p>
                <div className="w-full space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[hsl(var(--color-muted-foreground))]">Active Jobs</span>
                    <span className="font-medium">24</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[hsl(var(--color-muted-foreground))]">Total Applicants</span>
                    <span className="font-medium">156</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[hsl(var(--color-muted-foreground))]">Member Since</span>
                    <span className="font-medium">Jan 2024</span>
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
                    <div className="h-24 w-24 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <BiBuilding className="h-12 w-12 text-white" />
                    </div>
                    <button className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-[hsl(var(--color-primary))] text-[hsl(var(--color-primary-foreground))] flex items-center justify-center shadow-lg hover:bg-[hsl(var(--color-primary))]/90">
                      <FiCamera className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex-1">
                    <input type="file" id="logoUpload" className="hidden" accept="image/*" />
                    <label htmlFor="logoUpload" className="btn btn-outline cursor-pointer inline-flex items-center"><FiUpload className="h-4 w-4 mr-2" />Upload Logo</label>
                    <p className="text-xs text-[hsl(var(--color-muted-foreground))] mt-2">Recommended size: 200x200px. Max file size: 2MB. Supported formats: JPG, PNG, SVG</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="label mb-2" htmlFor="companyName">Company Name <span className="text-red-500">*</span></label>
                  <input id="companyName" className="input" defaultValue="TechCorp Solutions" placeholder="Enter company name" required />
                </div>
                <div>
                  <label className="label mb-2" htmlFor="industry">Industry <span className="text-red-500">*</span></label>
                  <input id="industry" className="input" defaultValue="Information Technology" placeholder="e.g., Technology, Healthcare" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="label mb-2" htmlFor="companySize">Company Size</label>
                  <select id="companySize" className="input">
                    <option value="">Select company size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="50">11-50 employees</option>
                    <option value="200">51-200 employees</option>
                    <option value="500" selected>201-500 employees</option>
                    <option value="1000">501-1000 employees</option>
                    <option value="5000">1001-5000 employees</option>
                    <option value="10000">5001-10000 employees</option>
                    <option value="10001+">10000+ employees</option>
                  </select>
                </div>
                <div>
                  <label className="label mb-2" htmlFor="companyType">Company Type</label>
                  <select id="companyType" className="input">
                    <option value="">Select company type</option>
                    <option value="startup">Startup</option>
                    <option value="private" selected>Private Company</option>
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
                  <input id="website" className="input" defaultValue="https://techcorp.example.com" placeholder="https://yourcompany.com" required />
                </div>
                <div>
                  <label className="label mb-2" htmlFor="founded">Founded Year</label>
                  <input id="founded" className="input" defaultValue="2015" placeholder="e.g., 2020" />
                </div>
              </div>

              <div className="mb-4">
                <label className="label mb-2" htmlFor="about">About Company <span className="text-red-500">*</span></label>
                <textarea id="about" className="textarea" rows={6} required defaultValue={`TechCorp Solutions is a leading technology company specializing in innovative software solutions. We are committed to delivering cutting-edge products and services that help businesses transform digitally. Our team of experienced professionals works on challenging projects across various domains including cloud computing, AI/ML, and mobile applications.

We pride ourselves on fostering a culture of innovation, collaboration, and continuous learning. Join us to be part of a dynamic team that's shaping the future of technology.`}></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="label mb-2" htmlFor="city">City</label>
                  <input id="city" className="input" defaultValue="San Francisco" placeholder="City" />
                </div>
                <div>
                  <label className="label mb-2" htmlFor="state">State/Province</label>
                  <input id="state" className="input" defaultValue="California" placeholder="State" />
                </div>
                <div>
                  <label className="label mb-2" htmlFor="country">Country</label>
                  <input id="country" className="input" defaultValue="United States" placeholder="Country" />
                </div>
              </div>
            </div>

            <div id="contact" className="card p-6">
              <h2 className="text-xl font-semibold mb-6">Contact Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="label mb-2" htmlFor="phone">Phone Number <span className="text-red-500">*</span></label>
                  <input id="phone" className="input" defaultValue="+1 (555) 123-4567" placeholder="+1 (555) 000-0000" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="label mb-2" htmlFor="hrEmail">HR Department Email</label>
                  <input id="hrEmail" className="input" defaultValue="hr@techcorp.com" placeholder="hr@example.com" />
                </div>
                <div>
                  <label className="label mb-2" htmlFor="supportEmail">Information Email</label>
                  <input id="supportEmail" className="input" defaultValue="support@techcorp.com" placeholder="support@example.com" />
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
                    <input id="linkedin" className="input pl-10" defaultValue="https://linkedin.com/company/techcorp" placeholder="https://linkedin.com/company/yourcompany" />
                  </div>
                </div>

                <div>
                  <label className="label mb-2" htmlFor="twitter">Twitter/X Profile</label>
                  <div className="relative">
                    <FiShare2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(var(--color-muted-foreground))]" />
                    <input id="twitter" className="input pl-10" defaultValue="https://twitter.com/techcorp" placeholder="https://twitter.com/yourcompany" />
                  </div>
                </div>

                <div>
                  <label className="label mb-2" htmlFor="facebook">Facebook Page</label>
                  <div className="relative">
                    <FaFacebook className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(var(--color-muted-foreground))]" />
                    <input id="facebook" className="input pl-10" defaultValue="https://facebook.com/techcorp" placeholder="https://facebook.com/yourcompany" />
                  </div>
                </div>

                <div>
                  <label className="label mb-2" htmlFor="instagram">Instagram Profile</label>
                  <div className="relative">
                    <FaInstagram className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(var(--color-muted-foreground))]" />
                    <input id="instagram" className="input pl-10" defaultValue="https://instagram.com/techcorp" placeholder="https://instagram.com/yourcompany" />
                  </div>
                </div>

                <div>
                  <label className="label mb-2" htmlFor="github">GitHub Organization</label>
                  <div className="relative">
                    <FaGithub className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(var(--color-muted-foreground))]" />
                    <input id="github" className="input pl-10" defaultValue="https://github.com/techcorp" placeholder="https://github.com/yourcompany" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 pt-4">
              <div className="flex gap-2">
                <button className="btn btn-primary inline-flex items-center"><FiSave className="h-4 w-4 mr-2" />Save Changes</button>
              </div>
            </div>
          </div>
        </div>
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

export default CompanySettings;
