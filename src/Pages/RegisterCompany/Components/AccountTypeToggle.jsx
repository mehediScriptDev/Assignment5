import React from 'react';

const AccountTypeToggle = () => {
    return (
        <div className="w-full text-center">
            <div className="card p-2 mb-8 inline-flex mx-auto w-full max-w-md">
                <div className="grid grid-cols-2 gap-2 w-full">
                    <a href="/register" className="btn btn-ghost text-center">
                        <i data-lucide="user" className="h-4 w-4 mr-2"></i>
                        Job Seeker
                    </a>
                    <button id="employerTab" className="btn btn-primary text-center" onClick={() => window.switchRole && window.switchRole('employer')}>
                        <i data-lucide="building-2" className="h-4 w-4 mr-2"></i>
                        Employer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccountTypeToggle;
