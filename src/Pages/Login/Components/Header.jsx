import React from "react";

const Header = () => {
  return (
    <div>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-8">
            <a href="index.html" className="flex items-center space-x-2">
              <i data-lucide="briefcase" className="h-8 w-8 text-primary"></i>
              <span className="text-xl font-bold">LWS Job Portal</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Don't have an account?
            </span>
            <a href="register.html" className="btn btn-ghost text-sm">
              Sign Up
            </a>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
