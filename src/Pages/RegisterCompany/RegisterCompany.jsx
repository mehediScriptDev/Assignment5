import React, { useEffect } from 'react';
import { Link } from 'react-router';
import PageTitleCompany from './Components/PageTitleCompany';
import AccountTypeToggle from './Components/AccountTypeToggle';
import CompanyForm from './Components/CompanyForm';
import BenefitsHighlights from './Components/BenefitsHighlights';

const RegisterCompany = () => {
    useEffect(() => {
        // Toggle password (accept event or id)
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

        // Logo preview handler
        const logoInput = document.getElementById('logo');
        const logoHandler = (e) => {
            const file = e.target.files && e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (ev) {
                    const preview = document.getElementById('logoPreview');
                    if (preview) {
                        preview.innerHTML = `<img src="${ev.target.result}" alt="Logo preview" class="w-full h-full object-cover rounded-lg">`;
                    }
                };
                reader.readAsDataURL(file);
            }
        };
        logoInput && logoInput.addEventListener('change', logoHandler);

        return () => {
            try { delete window.togglePassword; } catch (e) {}
            logoInput && logoInput.removeEventListener('change', logoHandler);
        };
    }, []);

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <PageTitleCompany />
                <AccountTypeToggle />
                <div className="card p-8 md:p-10">
                    <CompanyForm />

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

                <BenefitsHighlights />
            </div>
        </>
    );
};

export default RegisterCompany;