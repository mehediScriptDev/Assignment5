import React from "react";
import { Link } from 'react-router';

const Footer = () => {
  return (
    <div>
      <footer className="border-t border-border bg-muted/30 mt-8">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">LWS Job Portal</h3>
              <p className="text-sm text-muted-foreground">
                Your trusted platform for finding the perfect job or the perfect
                candidate.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Job Seekers</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/" className="hover:text-foreground">
                    Browse Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/coming-soon" className="hover:text-foreground">
                    Career Resources
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Employers</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/register-company" className="hover:text-foreground">
                    Post a Job
                  </Link>
                </li>
                <li>
                  <Link to="/coming-soon" className="hover:text-foreground">
                    Employer Resources
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/coming-soon" className="hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/coming-soon" className="hover:text-foreground">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/coming-soon" className="hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/coming-soon" className="hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-6 pt-6 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 LWS Job Portal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
