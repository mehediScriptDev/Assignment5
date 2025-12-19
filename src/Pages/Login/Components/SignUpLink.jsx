import React from "react";
import { Link } from 'react-router';

const SignUpLink = () => {
  return (
    <div>
      <div className="mt-8 text-center text-sm text-muted-foreground">
        Don't have an account?
        <Link
          to="/register"
          className="text-primary hover:underline font-medium"
          id="signupLink"
        >
          Sign up as Job Seeker
        </Link>
      </div>
    </div>
  );
};

export default SignUpLink;
