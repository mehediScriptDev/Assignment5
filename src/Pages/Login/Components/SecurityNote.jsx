import React from "react";

const SecurityNote = () => {
  return (
    <div>
      <div className="mt-6 text-center">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <i data-lucide="shield-check" className="h-4 w-4"></i>
          <p>Your information is protected with industry-standard encryption</p>
        </div>
      </div>
    </div>
  );
};

export default SecurityNote;
