import React, { useState, useContext } from 'react';
import client from '../../../api/client';
import { AuthContext } from '../../../context/AuthContext';
import { useToast } from '../../../context/ToastContext';
import { useNavigate } from 'react-router';

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [experience, setExperience] = useState('');
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
            const payload = { name, email, password, role: 'USER', phone, experience };
            const res = await client.post('/auth/register', payload);
            if (res.data && res.data.success) {
                auth.register(res.data);
                // Redirect newly registered users to their dashboard
                const userRole = res.data.data?.role || 'USER';
                if (userRole === 'COMPANY') navigate('/company/dashboard');
                else navigate('/user-dashboard');
            } else {
                showToast && showToast(res.data?.message || 'Registration failed', { type: 'error' });
            }
        } catch (err) {
            console.error('Register error:', err);
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
        <form className="space-y-5" onSubmit={onSubmit}>
            <div className="space-y-2">
                <label htmlFor="name" className="label">Name <span className="text-red-500">*</span></label>
                <div className="relative">
                    <i data-lucide="user" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"></i>
                    <input value={name} onChange={e => setName(e.target.value)} type="text" id="name" name="name" className="input pl-10" placeholder="John" required />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                    <label htmlFor="email" className="label">Email Address <span className="text-red-500">*</span></label>
                    <div className="relative">
                        <i data-lucide="mail" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"></i>
                        <input value={email} onChange={e => setEmail(e.target.value)} type="email" id="email" name="email" className="input pl-10" placeholder="john.doe@example.com" required />
                    </div>
                </div>
                <div className="space-y-2">
                    <label htmlFor="phone" className="label">Phone Number <span className="text-red-500">*</span></label>
                    <div className="relative">
                        <i data-lucide="phone" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"></i>
                        <input value={phone} onChange={e => setPhone(e.target.value)} type="tel" id="phone" name="phone" className="input pl-10" placeholder="+1 (555) 000-0000" required />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                    <label htmlFor="experience" className="label">Years of Experience</label>
                    <div className="relative">
                        <i data-lucide="calendar" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"></i>
                        <select id="experience" value={experience} onChange={e => setExperience(e.target.value)} name="experience" className="input pl-10">
                            <option value="">Select experience level</option>
                            <option value="entry">Entry Level (0-2 years)</option>
                            <option value="mid">Mid Level (3-5 years)</option>
                            <option value="senior">Senior (6-10 years)</option>
                            <option value="expert">Expert (10+ years)</option>
                        </select>
                    </div>
                </div>
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

            <div className="flex items-start gap-2">
                <input type="checkbox" id="terms" name="terms" className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-ring" required />
                <label htmlFor="terms" className="text-sm text-muted-foreground">I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a></label>
            </div>

            <button type="submit" className="btn btn-primary w-full text-base h-11 mt-2">
                <i data-lucide="user-plus" className="h-4 w-4 mr-2"></i>
                {loading ? 'Creating...' : 'Create Account'}
            </button>
        </form>
    );
};

export default RegisterForm;
