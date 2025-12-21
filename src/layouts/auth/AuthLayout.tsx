import React from "react";
import { Link, Outlet } from "react-router";
import Side from "../../components/skin/Side";
import Footer from "../home/Footer";

const AuthLayout = () => {
  return (
    <div className="flex flex-col h-screen justify-between relative">
      <div  className="self-start p-4 text-5xl font-bold  border-b-4 border-black w-full titleFont">
        <Link to="/" className="text-orange-500 hover:text-orange-400">
          Qrafter
        </Link>
      </div>
      <div className="bg-yellow-100 flex w-full h-full">
        <Outlet />
        <Side />
      </div>
      <div className="absolute -left-100  h-2/4 w-2/3 max-w-[900px] bottom-0 bg-purple-500 rounded-t-full"></div>
      <Footer />
    </div>
  );
};

export default AuthLayout;
