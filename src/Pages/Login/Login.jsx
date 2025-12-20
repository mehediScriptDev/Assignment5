import React, { useEffect } from "react";
import MainContent from "./Components/MainContent";

const Login = () => {
  useEffect(() => {
    // Toggle password visibility preserving original behavior.
    // Layout component loads lucide; here we only define handlers.
    window.togglePassword = (arg) => {
      let field = null;
      let icon = null;

      if (typeof arg === 'string') {
        field = document.getElementById(arg);
        if (field) {
          const wrapper = field.closest('div');
          icon = wrapper ? wrapper.querySelector('button i') : null;
        }
      } else if (arg && arg.currentTarget) {
        // arg is a React/native event
        const btn = arg.currentTarget;
        const fieldId = btn.getAttribute('data-toggle-for');
        field = fieldId ? document.getElementById(fieldId) : null;
        icon = btn.querySelector('i');
      } else if (arg && arg.target) {
        // arg could be a native event
        const btn = arg.target.closest('button');
        const fieldId = btn ? btn.getAttribute('data-toggle-for') : null;
        field = fieldId ? document.getElementById(fieldId) : null;
        icon = btn ? btn.querySelector('i') : null;
      }

      if (!field) return;

      if (field.type === 'password') {
        field.type = 'text';
        if (icon) icon.dataset.toggled = 'true';
      } else {
        field.type = 'password';
        if (icon) icon.dataset.toggled = 'false';
      }
    };

    // Switch role (jobseeker/employer) to update signup link and optional tabs
    window.switchRole = (role) => {
      const jobseekerTab = document.getElementById("jobseekerTab");
      const employerTab = document.getElementById("employerTab");
      const signupLink = document.getElementById("signupLink");

      if (!signupLink) return;

        if (role === 'jobseeker') {
        jobseekerTab && jobseekerTab.classList.add("active");
        employerTab && employerTab.classList.remove("active");
        signupLink.textContent = "Sign up as Job Seeker";
          signupLink.href = "/register";
      } else {
        employerTab && employerTab.classList.add("active");
        jobseekerTab && jobseekerTab.classList.remove("active");
        signupLink.textContent = "Sign up as Employer";
          signupLink.href = "/register-company";
      }

      // No lucide runtime usage — icons are handled by react-icons or converted components.
    };

    return () => {
      try { delete window.togglePassword; } catch (e) {}
      try { delete window.switchRole; } catch (e) {}
    };
  }, []);

  return (
    <>
      <MainContent />
    </>
  );
};

export default Login;
