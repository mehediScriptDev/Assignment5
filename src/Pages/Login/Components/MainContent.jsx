import React from "react";
import LoginCard from "./LoginCard";
import PageTitle from "./PageTitle";
import SecurityNote from "./SecurityNote";

const MainContent = () => {
  return (
    <div>
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* <!-- Page Title --> */}
          <PageTitle />

          {/* <!-- Login Card --> */}
          <LoginCard />

          {/* <!-- Security Note --> */}
          <SecurityNote />
        </div>
      </main>
    </div>
  );
};

export default MainContent;
