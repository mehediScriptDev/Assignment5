import React from "react";

const Email = () => {
  return (
    <div>
      <div className="space-y-2">
        <label htmlFor="email" className="label">
          Email Address
          <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <i
            data-lucide="mail"
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
          ></i>
          <input
            type="email"
            id="email"
            name="email"
            className="input pl-10"
            placeholder="you@example.com"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default Email;
