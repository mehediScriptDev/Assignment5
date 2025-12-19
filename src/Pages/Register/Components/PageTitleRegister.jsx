import React from 'react';

const PageTitleRegister = () => {
    return (
        <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <i data-lucide="user-plus" className="h-8 w-8 text-primary"></i>
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-3">Create Your Account</h1>
            <p className="text-lg text-muted-foreground">Join thousands of professionals finding their dream jobs</p>
        </div>
    );
};

export default PageTitleRegister;
