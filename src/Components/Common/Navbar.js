import { NavbarLinks } from "../Data/NavbarLinks";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Dashboard from "../Core/Dashboard/Dashboard";
import {setToken} from "../../Slice/taskSlice"
const NavBar = () => {
  const location = useLocation();
  const {token}= useSelector((state)=>state.task)
  const dispatch = useDispatch();
  const matchRoute = (path) => {
    return path === location.pathname;
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  console.log("token",token)
  return (
    <nav className="z-40 fixed flex max-md:flex-col max-md:items-center w-full py-1 bg-slate-400 px-5 shadow-[0px_1px_12px_rgb(0,0,0)]">
      <div className="w-full  md:w-1/4 mb-3 md:mb-0 flex items-center justify-between">
        <Link to={"/"}>
          <img
            width={80}
            height={80}
            alt="loading..."
            src="https://d19p01o5qolo2p.cloudfront.net/logo.png"
          ></img>
        </Link>
        {/* Sidebar Button */}
        <button
          className="block md:hidden focus:outline-none"
          onClick={toggleSidebar}
        >
          {!sidebarOpen ? (
            <FaBars></FaBars>
          ) : (
            <p className="text-xl">
              <RxCross2></RxCross2>
            </p>
          )}
        </button>
      </div>

      {/* Sidebar Content */}
      <div
        className={`w-full    md:w-3/4 mb-3 md:mb-0 ${
          sidebarOpen ? "block" : "hidden md:flex"
        } flex justify-evenly items-center max-md:flex-col`}
      >
        {/* Navbar Links */}
        <div className="flex  flex-wrap gap-3 justify-center md:justify-evenly">
          {NavbarLinks?.map((val, index) => {
            return (
              <div
                key={index}
                className={`py-2 px-3 ${
                  matchRoute(val.path)
                    ? "text-yellow-50 bg-blue-700 py-2 px-3 rounded-lg transition-all duration-300 "
                    : "hover:text-blue-800"
                }`}
              >
                <Link to={`${val.path}`}>{val.title}</Link>
              </div>
            );
          })}
        </div>

        {/* Login and Signup Buttons */}
        <div className="flex my-2 flex-wrap justify-center gap-5 items-center ">
          {token && (
            <Link to="/dashboard/dash">
              <div
              onClick={()=>{dispatch(setToken(false))}}
                className={`py-2 px-3 text-black rounded-lg border border-gray-400 transition-all duration-200 
           ${
             matchRoute("/login")
               ? "bg-blue-600 text-white"
               : "hover:border hover:border-blue-500 hover:text-blue-600"
           }
          `}
              >
                Login{" "}
              </div>
            </Link>
          )}
          {token && (
            <Link to="/signup">
              <div
                className={`py-2 px-3 text-black rounded-lg border border-gray-400 transition-all duration-200 
              
           ${
             matchRoute("/signup")
               ? "bg-blue-600 text-white"
               : "hover:border hover:border-blue-500 hover:text-blue-600"
           }
          `}
              >
                Sign Up{" "}
              </div>
            </Link>
          )}
          {!token && (
            <Link to="/dashboard/dash">
              <div
                className={`py-2 px-3 text-black rounded-lg border border-gray-400 transition-all duration-200 
              
           ${
             matchRoute("/dashboard/dash")
               ? "bg-blue-600 text-white"
               : "hover:border hover:border-blue-500 hover:text-blue-600"
           }
          `}
              >
                Dashboard
              </div>
            </Link>
          )}

          {!token  && (
            <Link to="/login">
              <div
               onClick={()=>{dispatch(setToken(true))}}
                className={`py-2 px-3 text-black rounded-lg border border-gray-400 transition-all duration-200 
              
           ${
             matchRoute("/logout")
               ? "bg-blue-600 text-white"
               : "hover:border hover:border-blue-500 hover:text-blue-600"
           }
          `}
              >
                Logout{" "}
              </div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
