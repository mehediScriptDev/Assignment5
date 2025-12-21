import React, { useState, useContext } from 'react';
import client from '../../../api/client';
import { AuthContext } from '../../../context/AuthContext';
import { useToast } from '../../../context/ToastContext';
import { useNavigate } from 'react-router';

const CompanyForm = () => {
    const [companyName, setCompanyName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [industry, setIndustry] = useState('');
    const [companySize, setCompanySize] = useState('');
    const [foundedYear, setFoundedYear] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const { showToast } = useToast();

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) return showToast && showToast('Passwords do not match', { type: 'error' });
        setLoading(true);
        try {
            const payload = {
                name: companyName,
                email,
                password,
                role: 'COMPANY',
                website,
                industry,
                companySize,
                foundedYear,
                location,
                description
            };
            console.debug('Company register payload:', payload);
            const res = await client.post('/auth/register', payload);
            if (res.data && res.data.success) {
                await auth.register(res.data);
                // After company register, go to company dashboard
                navigate('/company/dashboard');
            } else {
                const msg = res.data?.message || 'Registration failed';
                if (msg.toLowerCase().includes('user already exists')) {
                    showToast && showToast(`${msg}. If you already have an account try signing in instead (choose Employer).`, { type: 'error' });
                } else {
                    showToast && showToast(msg, { type: 'error' });
                }
            }
        } catch (err) {
            console.error('Company register error:', err);
            console.error('Company register response:', err?.response?.data);
            const serverMessage = err?.response?.data?.message;
            const serverBody = err?.response?.data;
            if (serverMessage) {
                showToast && showToast(`Registration failed: ${serverMessage}`, { type: 'error' });
            } else if (err.message) {
                showToast && showToast(`Registration error: ${err.message}`, { type: 'error' });
            } else {
                showToast && showToast(`Registration error: ${JSON.stringify(serverBody) || 'unknown'}`, { type: 'error' });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="space-y-6" onSubmit={onSubmit}>
            <div className="space-y-5">
                <div className="flex items-center gap-2 pb-2 border-b border-border">
                    <i data-lucide="building" className="h-5 w-5 text-primary"></i>
                    <h2 className="text-lg font-semibold">Company Information</h2>
                </div>

                <div className="space-y-2">
                    <label htmlFor="companyName" className="label">Company Name <span className="text-red-500">*</span></label>
                    <div className="relative">
                        <i data-lucide="building-2" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"></i>
                        <input value={companyName} onChange={e => setCompanyName(e.target.value)} type="text" id="companyName" name="companyName" className="input pl-10" placeholder="e.g., TechCorp Solutions" required />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="email" className="label">Email Address <span className="text-red-500">*</span></label>
                    <div className="relative">
                        <i data-lucide="mail" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"></i>
                        <input value={email} onChange={e => setEmail(e.target.value)} type="email" id="email" name="email" className="input pl-10" placeholder="john.doe@company.com" required />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <label htmlFor="website" className="label">Company Website <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <i data-lucide="globe" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"></i>
                            <input value={website} onChange={e => setWebsite(e.target.value)} type="url" id="website" name="website" className="input pl-10" placeholder="https://example.com" required />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="industry" className="label">Industry <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <i data-lucide="briefcase" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"></i>
                            <select id="industry" value={industry} onChange={e => setIndustry(e.target.value)} name="industry" className="input pl-10" required>
                                <option value="">Select industry</option>
                                <option value="software">Software</option>
                                <option value="finance">Finance</option>
                                <option value="health">Healthcare</option>
                                <option value="education">Education</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <label htmlFor="companySize" className="label">Company Size</label>
                        <div className="relative">
                            <i data-lucide="users" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"></i>
                            <select id="companySize" value={companySize} onChange={e => setCompanySize(e.target.value)} name="companySize" className="input pl-10">
                                <option value="">Select size</option>
                                <option value="1-10">1-10</option>
                                <option value="11-50">11-50</option>
                                <option value="51-200">51-200</option>
                                <option value="201-500">201-500</option>
                                <option value="500+">500+</option>
                            </select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="foundedYear" className="label">Founded Year</label>
                        <div className="relative">
                            <i data-lucide="calendar" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"></i>
                            <input value={foundedYear} onChange={e => setFoundedYear(e.target.value)} type="number" id="foundedYear" name="foundedYear" className="input pl-10" placeholder="e.g., 2010" />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="location" className="label">Headquarters Location <span className="text-red-500">*</span></label>
                    <div className="relative">
                        <i data-lucide="map-pin" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"></i>
                        <input value={location} onChange={e => setLocation(e.target.value)} type="text" id="location" name="location" className="input pl-10" placeholder="City, Country" required />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="description" className="label">Company Description <span className="text-red-500">*</span></label>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} id="description" name="description" className="textarea min-h-30" placeholder="Tell us about your company, mission, and what makes it a great place to work..." required></textarea>
                    <p className="text-xs text-muted-foreground">Minimum 100 characters. This will be displayed on your company profile.</p>
                </div>

                <div className="space-y-2">
                    <label htmlFor="logo" className="label">Company Logo</label>
                    <div className="flex items-center gap-4">
                        <div id="logoPreview" className="w-24 h-24 rounded-lg bg-muted/50 flex items-center justify-center overflow-hidden">
                            <span className="text-xs text-muted-foreground">No logo</span>
                        </div>
                        <input id="logo" name="logo" type="file" accept="image/*" className="file-input" />
                    </div>
                </div>
            </div>

            <div className="space-y-5">
                <div className="flex items-center gap-2 pb-2 border-b border-border">
                    <i data-lucide="shield" className="h-5 w-5 text-primary"></i>
                    <h2 className="text-lg font-semibold">Account Security</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <label htmlFor="password" className="label">Password <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <i data-lucide="lock" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"></i>
                            <input value={password} onChange={e => setPassword(e.target.value)} type="password" id="password" name="password" className="input pl-10 pr-10" placeholder="Create a strong password" required />
                            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" onClick={(e) => window.togglePassword && window.togglePassword(e)} data-toggle-for="password">
                                <i data-lucide="eye" className="h-4 w-4"></i>
                            </button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="confirmPassword" className="label">Confirm Password <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <i data-lucide="lock" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"></i>
                            <input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} type="password" id="confirmPassword" name="confirmPassword" className="input pl-10 pr-10" placeholder="Re-enter your password" required />
                            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" onClick={(e) => window.togglePassword && window.togglePassword(e)} data-toggle-for="confirmPassword">
                                <i data-lucide="eye" className="h-4 w-4"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <p className="text-xs text-muted-foreground -mt-2">Password must be at least 8 characters with letters and numbers</p>
            </div>

            <div className="space-y-3 pt-2">
                <div className="flex items-start gap-2">
                    <input type="checkbox" id="terms" name="terms" className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-ring" required />
                    <label htmlFor="terms" className="text-sm text-muted-foreground">I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a></label>
                </div>

                <div className="flex items-start gap-2">
                    <input type="checkbox" id="verified" name="verified" className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-ring" required />
                    <label htmlFor="verified" className="text-sm text-muted-foreground">I confirm that I am an authorized representative of this company and have the right to register on its behalf</label>
                </div>

                <div className="flex items-start gap-2">
                    <input type="checkbox" id="updates" name="updates" className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-ring" />
                    <label htmlFor="updates" className="text-sm text-muted-foreground">Send me product updates, hiring tips, and promotional offers via email</label>
                </div>
            </div>

            <button type="submit" className="btn btn-primary w-full text-base h-11 mt-2">
                <i data-lucide="building-2" className="h-4 w-4 mr-2"></i>
                {loading ? 'Registering...' : 'Register Company'}
            </button>
        </form>
    );
};

export default CompanyForm;
