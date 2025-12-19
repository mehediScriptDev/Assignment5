import React from "react";

const Password = () => {
  return (
    <div>
      <div className="space-y-2">
        <div className="relative">
          <i
            data-lucide="lock"
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
          ></i>
          <input
            type="password"
            id="password"
            name="password"
            className="input pl-10 pr-10"
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={(e) => window.togglePassword && window.togglePassword(e)}
            data-toggle-for="password"
          >
            <i data-lucide="eye" className="h-4 w-4"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Password;
