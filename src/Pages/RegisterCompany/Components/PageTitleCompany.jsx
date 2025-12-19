import React from 'react';

const PageTitleCompany = () => {
    return (
        <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <i data-lucide="building-2" className="h-8 w-8 text-primary"></i>
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-3">Register Your Company</h1>
            <p className="text-lg text-muted-foreground">Start hiring top talent for your organization</p>
        </div>
    );
};

export default PageTitleCompany;
