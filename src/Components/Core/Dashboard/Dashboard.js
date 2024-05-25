import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
import SideBar from "./Sidebar";
import { FaChevronLeft } from "react-icons/fa6";
import { useEffect, useRef } from "react";
import { setSideBar } from "../../../Slice/taskSlice";
import { RxCross2 } from "react-icons/rx";

const Dashboard = () => {
  const dispatch = useDispatch();
  const sideRef = useRef();
  const { openSideBar } = useSelector((state) => state.task);

  const toggleHandler = () => {
    dispatch(setSideBar(!openSideBar));
    console.log("openSideBar", openSideBar);
  };

  const closeSide = (event) => {
    if (sideRef.current && !sideRef.current.contains(event.target)) {
      dispatch(setSideBar(false));
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeSide);
    return () => {
      document.removeEventListener("mousedown", closeSide);
    };
  }, []);

  return (
    <div className="bg-richblack-900 text-black relative flex min-h-[calc(100vh-3.5rem)]">
      <div
        ref={sideRef}
        className={`w-40 max-md:absolute max-md:left-0 transition-all duration-1000 ease-in-out ${
          openSideBar ? "max-md:visible" : "max-md:-translate-x-40"
        }`}
      >
        <SideBar />
      </div>
      <button
        onClick={toggleHandler}
        className="md:hidden transition-all duration-1000 top-3 absolute text-xl "
      >
        {!openSideBar ? <FaAngleRight /> : <FaChevronLeft />}
      </button>
      <div className="h-[calc(100vh-3.5rem)] max-md:w-full flex-1 overflow-auto">
        <div className="mx-auto w-full max-w-[1200px] max-md:w-full py-10 px-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
