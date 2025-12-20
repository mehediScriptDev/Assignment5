import React from "react";
import { FiLogIn } from 'react-icons/fi';

const PageTitle = () => {
  return (
    <div>
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <FiLogIn className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-3">Welcome Back</h1>
        <p className="text-lg text-muted-foreground">
          Sign in to access your account
        </p>
      </div>
    </div>
  );
};

export default PageTitle;
