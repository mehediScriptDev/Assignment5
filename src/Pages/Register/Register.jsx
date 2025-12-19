import React, { useEffect } from 'react';
import Header from '../Login/Components/Header';
import Footer from '../Login/Components/Footer';
import PageTitleRegister from './Components/PageTitleRegister';
import AccountTypeToggle from './Components/AccountTypeToggle';
import RegisterForm from './Components/RegisterForm';
import FeatureHighlights from './Components/FeatureHighlights';

const Register = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/lucide@latest';
        script.async = true;
        script.onload = () => {
            try {
                if (window.lucide && window.lucide.createIcons) {
                    window.lucide.createIcons();
                }
            } catch (e) {}
        };
        document.body.appendChild(script);

        // replicate same handlers as Login for parity
        window.togglePassword = (arg) => {
            let field = null;
            let icon = null;

            if (typeof arg === 'string') {
                field = document.getElementById(arg);
                if (field) {
                    const wrapper = field.closest('div');
                    icon = wrapper ? wrapper.querySelector('button i') : null;
                }
            } else if (arg && arg.currentTarget) {
                const btn = arg.currentTarget;
                const fieldId = btn.getAttribute('data-toggle-for');
                field = fieldId ? document.getElementById(fieldId) : null;
                icon = btn.querySelector('i');
            } else if (arg && arg.target) {
                const btn = arg.target.closest('button');
                const fieldId = btn ? btn.getAttribute('data-toggle-for') : null;
                field = fieldId ? document.getElementById(fieldId) : null;
                icon = btn ? btn.querySelector('i') : null;
            }

            if (!field) return;

            if (field.type === 'password') {
                field.type = 'text';
                if (icon) icon.setAttribute('data-lucide', 'eye-off');
            } else {
                field.type = 'password';
                if (icon) icon.setAttribute('data-lucide', 'eye');
            }

            if (window.lucide && window.lucide.createIcons) {
                window.lucide.createIcons();
            }
        };

        window.switchRole = (role) => {
            const jobseekerTab = document.getElementById('jobseekerTab');
            const employerTab = document.getElementById('employerTab');
            const signupLink = document.getElementById('signupLink');

            if (!signupLink) return;

            if (role === 'jobseeker') {
                jobseekerTab && jobseekerTab.classList.add('active');
                employerTab && employerTab.classList.remove('active');
                signupLink.textContent = 'Sign up as Job Seeker';
                signupLink.href = 'register.html';
            } else {
                employerTab && employerTab.classList.add('active');
                jobseekerTab && jobseekerTab.classList.remove('active');
                signupLink.textContent = 'Sign up as Employer';
                signupLink.href = 'register-company.html';
            }

            if (window.lucide && window.lucide.createIcons) window.lucide.createIcons();
        };

        return () => {
            try { document.body.removeChild(script); } catch (e) {}
            try { delete window.togglePassword; } catch (e) {}
            try { delete window.switchRole; } catch (e) {}
        };
    }, []);

    return (
        <div className="bg-background text-foreground antialiased">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <PageTitleRegister />
                    <AccountTypeToggle />
                    <div className="card p-8 md:p-10">
                        <RegisterForm />
                        {/* Divider reused from Login components */}
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                <div className="w-full border-t border-border"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-card text-muted-foreground font-medium">Or continue with</span>
                            </div>
                        </div>
                        <div className="mt-8 text-center text-sm text-muted-foreground">
                            Already have an account?
                            <a href="/login" className="text-primary hover:underline font-medium">Sign in</a>
                        </div>
                    </div>
                    <FeatureHighlights />
                    <div className="mt-8 text-center">
                        <p className="text-sm text-muted-foreground">By creating an account, you'll get access to thousands of job opportunities from top companies worldwide.</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Register;
