import React from 'react';

const BenefitsHighlights = () => {
    return (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <i data-lucide="users" className="h-5 w-5 text-primary"></i>
                </div>
                <div>
                    <h3 className="font-semibold text-sm mb-1">Access Top Talent</h3>
                    <p className="text-xs text-muted-foreground">Connect with thousands of qualified candidates actively looking for opportunities</p>
                </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <i data-lucide="zap" className="h-5 w-5 text-primary"></i>
                </div>
                <div>
                    <h3 className="font-semibold text-sm mb-1">Easy Job Posting</h3>
                    <p className="text-xs text-muted-foreground">Post jobs in minutes with our intuitive interface and smart templates</p>
                </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <i data-lucide="chart-line" className="h-5 w-5 text-primary"></i>
                </div>
                <div>
                    <h3 className="font-semibold text-sm mb-1">Smart Analytics</h3>
                    <p className="text-xs text-muted-foreground">Track applications and optimize your hiring with detailed insights</p>
                </div>
            </div>
        </div>
    );
};

export default BenefitsHighlights;
