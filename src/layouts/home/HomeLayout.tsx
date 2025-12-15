import React from "react";
import { Link, Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";

const HomeLayout = () => {
  return (
    <div className="flex flex-col items-center justify-between h-dvh relative">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default HomeLayout;
