import React from "react";
import Button from "../components/ui/Button";

const Dashboard = () => {
  return (
    <div className="h-1/3 w-full grid grid-cols-3 gap-4 p-10">
      <div className="bg-white border-4 shadowButton border-black"></div>
      <div className="bg-white border-4 shadowButton border-black"></div>
      <div className="bg-white border-4 shadowButton border-black"></div>
    </div>
  );
};

export default Dashboard;
