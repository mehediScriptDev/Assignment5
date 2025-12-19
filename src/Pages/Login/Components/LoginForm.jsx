import React from "react";
import Email from "./Email";
import Password from "./Password";

const LoginForm = () => {
  return (
    <div>
      <form className="space-y-5">
        {/* <!-- Email --> */}
        <Email />

        {/* <!-- Password --> */}
        <Password />

        {/* <!-- Submit Button --> */}
        <button type="submit" className="btn btn-primary w-full text-base h-11">
          <i data-lucide="log-in" className="h-4 w-4 mr-2"></i>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
