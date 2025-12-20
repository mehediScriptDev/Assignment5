import React from 'react';
import { FiUserPlus } from 'react-icons/fi';

const PageTitleRegister = () => {
    return (
        <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <FiUserPlus className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-3">Create Your Account</h1>
            <p className="text-lg text-muted-foreground">Join thousands of professionals finding their dream jobs</p>
        </div>
    );
};

export default PageTitleRegister;
