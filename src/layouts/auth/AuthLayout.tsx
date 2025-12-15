import React from "react";
import { Outlet } from "react-router";
import Side from "../../components/skin/Side";
import Footer from "../home/Footer";

const AuthLayout = () => {
  return (
    <div className="flex flex-col h-screen justify-between relative">
      <p className="self-start p-4 text-5xl font-bold text-orange-500 border-b-4 border-black w-full titleFont">
        Qrafter
      </p>
      <div className="bg-yellow-100 flex w-full h-full">
        <Outlet />
        <Side />
      </div>
      <div className="absolute -left-100  h-2/4 w-2/3 max-w-[900px] bottom-0  bg-purple-500 rounded-t-full"></div>
      <Footer />
    </div>
  );
};

export default AuthLayout;
