import React from "react";
import LoginCard from "./LoginCard";
import PageTitle from "./PageTitle";
import SecurityNote from "./SecurityNote";

const MainContent = () => {
  return (
    <div className="max-w-md mx-auto">
      <PageTitle />
      <LoginCard />
      <SecurityNote />
    </div>
  );
};

export default MainContent;
