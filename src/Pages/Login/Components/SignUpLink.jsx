import React from "react";

const SignUpLink = () => {
  return (
    <div>
      <div className="mt-8 text-center text-sm text-muted-foreground">
        Don't have an account?
        <a
          href="register.html"
          className="text-primary hover:underline font-medium"
          id="signupLink"
        >
          Sign up as Job Seeker
        </a>
      </div>
    </div>
  );
};

export default SignUpLink;
