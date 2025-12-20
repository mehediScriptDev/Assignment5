import React from 'react';
import { FiBriefcase, FiBell, FiShield } from 'react-icons/fi';

const Highlights = () => {
    return (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <FiBriefcase className="h-5 w-5 text-primary" />
                </div>
                <div>
                    <h3 className="font-semibold text-sm mb-1">Thousands of Jobs</h3>
                    <p className="text-xs text-muted-foreground">Access opportunities from top companies worldwide</p>
                </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <FiBell className="h-5 w-5 text-primary" />
                </div>
                <div>
                    <h3 className="font-semibold text-sm mb-1">Job Alerts</h3>
                    <p className="text-xs text-muted-foreground">Get notified when new jobs match your profile</p>
                </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <FiShield className="h-5 w-5 text-primary" />
                </div>
                <div>
                    <h3 className="font-semibold text-sm mb-1">Secure & Private</h3>
                    <p className="text-xs text-muted-foreground">Your data is protected with industry-standard security</p>
                </div>
            </div>
        </div>
    );
};

export default Highlights;
