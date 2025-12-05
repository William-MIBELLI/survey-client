import React from "react";
import { Button } from "../components/ui/button";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-between h-dvh relative">
      <nav className=" border-b-4 border-black bg-white w-full h-[100px] px-6 flex justify-between items-center  z-30">
        <div className="titleFont  text-3xl h-full text-orange-500 border-r-4 flex items-center justify-center border-black pr-6">
          <div className="mx-4">SurveyGen</div>
        </div>
        <div className="flex gap-8 mr-14">
          <button className="border-4 bg-green-500 transition duration-100 rotate-2 hover:-rotate-2 hover:bg-green-400 border-black shadowP min-w-28  p-2 shadowButton cursor-pointer  font-semibold">
            Login
          </button>
          <button className="border-4 border-black shadowP min-w-28 -rotate-2 transition duration-100 hover:rotate-2  p-2 shadowButton cursor-pointer bg-fuchsia-500 font-semibold">
            signup
          </button>
        </div>
      </nav>

      <div className="bg-orange-500 w-1/4 h-3/12 rounded-t-full absolute bottom-0 -left-50 z-0">
        {" "}
      </div>
      <div className="z-10 h-full  flex items-center justify-between border-black">
        <div className="  px-3  w-1/2 flex flex-col ">
          <h1 className="text-9xl titleFont mb-8 ">
            The best way to create survey
          </h1>
          <h3 className="font-semibold">
            Feedback? new market ? satisfaction ? Here you can create your
            survey in a minute !
          </h3>
          <h3 className="font-bold -rotate-3 bg-fuchsia-500 text-lg w-fit text-white px-2">
            Try it for free !
          </h3>
          <div className="flex  justify-center gap-5 mt-auto">
            <button className="border-4 border-black shadowP rotate-2  p-2 shadowButton cursor-pointer bg-green-500 font-semibold">
              Create my survey
            </button>
            <button className="border-4 border-black shadowP -rotate-2 p-2  shadowButton cursor-pointer bg-orange-500 font-semibold">
              Check available survey
            </button>
          </div>
          <div className="flex  items-end gap-3 ml-auto mt-4">
            <img className="w-20" src="src/assets/arrow2.png" alt="" />
            <p className="font-semibold">
              Something to say ? Opinions to share ?
            </p>
          </div>
        </div>
        <div className="w-1/3 relative h-full flex items-center justify-center ">
          <div className="bg-fuchsia-500 w-3/4 h-10/12 rounded-b-full absolute top-0 left-7 z-0">
            {" "}
          </div>
          <div className="bg-green-500 w-3/4 h-7/12 rounded-t-full absolute bottom-0 right-0 z-0">
            {" "}
          </div>
          <img className="z-30" src="src/assets/home2.png" alt="" />
        </div>
        <div className="diag h-full w-1/12 border-l-4 border-black"></div>
      </div>
      <div className="z-30 text-xs py-1 border-t-4 text-center border-black w-full bg-white">
        William MIBELLI, 2025 Tous droits réservés
      </div>
    </div>
  );
};

export default Home;
