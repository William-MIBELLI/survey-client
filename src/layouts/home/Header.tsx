import React from "react";
import { Link } from "react-router";
import { useAuthContext } from "../../contexts/auth.context";
import Button from "../../components/ui/Button";

const Header = () => {
  const { user, logout, loading } = useAuthContext();

  return (
    <nav className=" border-b-4 border-black bg-white w-full h-[100px] px-6 flex justify-between items-center  z-30">
      <div className="titleFont  text-4xl h-full text-orange-600 border-r-4 flex items-center justify-center border-black pr-6">
        <div className="mx-4">Qrafter</div>
      </div>
      <div className="flex gap-8 mr-14">
        { loading ? (<div>...</div>) : !user ? (
          <>
            <Link to={"login"}>
              <button className="border-4 bg-green-500 transition duration-100 rotate-2 hover:-rotate-2 hover:bg-green-400 border-black shadowP min-w-28  p-2 shadowButton cursor-pointer  font-semibold">
                Login
              </button>
            </Link>
            <Link to={"signup"}>
              <button className="border-4 border-black shadowP min-w-28 -rotate-2 transition duration-100 hover:rotate-2  p-2 shadowButton cursor-pointer bg-fuchsia-500 font-semibold">
                signup
              </button>
            </Link>
          </>
        ) : (
          <Button text="Logout" className="bg-fuchsia-500" onClick={logout} />
        )}
      </div>
    </nav>
  );
};

export default Header;
