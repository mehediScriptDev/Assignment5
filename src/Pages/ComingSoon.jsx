import React from 'react';
import { Link } from 'react-router';
import { FiArrowLeft, FiClock } from 'react-icons/fi';

const ComingSoon = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-4">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
            <FiClock className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Coming Soon</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            This feature is currently under development. We're working hard to bring you something amazing!
          </p>
        </div>
        
        <Link to="/" className="btn btn-primary inline-flex items-center gap-2">
          <FiArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ComingSoon;
