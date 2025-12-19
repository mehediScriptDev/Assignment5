import React, { useEffect } from 'react';
import { Link } from 'react-router';
import PageTitleRegister from './Components/PageTitleRegister';
import AccountTypeToggle from './Components/AccountTypeToggle';
import RegisterForm from './Components/RegisterForm';
import FeatureHighlights from './Components/FeatureHighlights';

const Register = () => {
    useEffect(() => {
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
                    signupLink.href = '/register';
            } else {
                employerTab && employerTab.classList.add('active');
                jobseekerTab && jobseekerTab.classList.remove('active');
                signupLink.textContent = 'Sign up as Employer';
                    signupLink.href = '/register-company';
            }

            if (window.lucide && window.lucide.createIcons) window.lucide.createIcons();
        };

        return () => {
            try { delete window.togglePassword; } catch (e) {}
            try { delete window.switchRole; } catch (e) {}
        };
    }, []);

    return (
        <>
            <div className="max-w-2xl mx-auto -mt-6">
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
                    <div className="mt-6 text-center text-sm text-muted-foreground">
                        Already have an account?
                        <Link to="/login" className="text-primary hover:underline font-medium">Sign in</Link>
                    </div>
                </div>
                <FeatureHighlights />
                <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground">By creating an account, you'll get access to thousands of job opportunities from top companies worldwide.</p>
                </div>
            </div>
        </>
    );
};

export default Register;
