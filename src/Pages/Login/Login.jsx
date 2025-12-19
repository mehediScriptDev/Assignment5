import React, { useEffect } from "react";
import Header from "./Components/Header";
import MainContent from "./Components/MainContent";
import Footer from "./Components/Footer";

const Login = () => {
  useEffect(() => {
    // Dynamically load lucide from CDN so data-lucide icons render
    const script = document.createElement("script");
    script.src = "https://unpkg.com/lucide@latest";
    script.async = true;
    script.onload = () => {
      try {
        if (window.lucide && window.lucide.createIcons) {
          window.lucide.createIcons();
        }
      } catch (e) {}
    };
    document.body.appendChild(script);

    // Toggle password visibility preserving original behavior
    window.togglePassword = (fieldId) => {
      const field = document.getElementById(fieldId);
      if (!field) return;
      // find icon inside the same wrapper
      const wrapper = field.closest("div");
      const icon = wrapper ? wrapper.querySelector("button i") : null;

      if (field.type === "password") {
        field.type = "text";
        if (icon) icon.setAttribute("data-lucide", "eye-off");
      } else {
        field.type = "password";
        if (icon) icon.setAttribute("data-lucide", "eye");
      }

      if (window.lucide && window.lucide.createIcons) {
        window.lucide.createIcons();
      }
    };

    // Switch role (jobseeker/employer) to update signup link and optional tabs
    window.switchRole = (role) => {
      const jobseekerTab = document.getElementById("jobseekerTab");
      const employerTab = document.getElementById("employerTab");
      const signupLink = document.getElementById("signupLink");

      if (!signupLink) return;

      if (role === "jobseeker") {
        jobseekerTab && jobseekerTab.classList.add("active");
        employerTab && employerTab.classList.remove("active");
        signupLink.textContent = "Sign up as Job Seeker";
        signupLink.href = "register.html";
      } else {
        employerTab && employerTab.classList.add("active");
        jobseekerTab && jobseekerTab.classList.remove("active");
        signupLink.textContent = "Sign up as Employer";
        signupLink.href = "register-company.html";
      }

      if (window.lucide && window.lucide.createIcons)
        window.lucide.createIcons();
    };

    return () => {
      // cleanup
      try {
        document.body.removeChild(script);
      } catch (e) {}
      try {
        delete window.togglePassword;
      } catch (e) {}
      try {
        delete window.switchRole;
      } catch (e) {}
    };
  }, []);

  return (
    <div className="bg-background text-foreground antialiased">
      {/* header */}
      <Header />

      {/* main content */}
      <MainContent />

      {/* footer */}
      <Footer />
    </div>
  );
};

export default Login;
