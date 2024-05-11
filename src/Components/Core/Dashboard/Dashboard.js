import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import SideBar from "./Sidebar";
import { HiBars3 } from "react-icons/hi2";
import { useState } from "react";
import { setSideBar } from "../../../Slice/taskSlice";
import { RxCross2 } from "react-icons/rx";
const Dashboard = () => {
  const dispatch = useDispatch();
  const { openSideBar } = useSelector((state) => state.task);
  const toggleHandler = () => {
    dispatch(setSideBar(!openSideBar));
    console.log("openSideBar", openSideBar);
  };
  return (
    <div className=" bg-richblack-900 text-black relative flex min-h-[calc(100vh-3.5rem)]">
      <div
        className={`w-40 max-md:absolute max-md:left-0 transition-all   ${
          openSideBar ? "max-md:visible" : "max-md:invisible"
        } `}
      >
        <SideBar></SideBar>
      </div>
      <button
        onClick={toggleHandler}
        className="md:hidden  absolute top-4 text-xl pl-2 "
      >
        {!openSideBar ? <HiBars3></HiBars3> : <RxCross2></RxCross2>}{" "}
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
