import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import toast from "react-hot-toast";
import axios from "axios";
import { setRefersh } from "../../../../Slice/taskSlice";
import {REACT_BASE_URL} from "../../../../Urls"
const DashCard = ({ value }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { refersh } = useSelector((state) => state.task);
  const [read, setRead] = useState(false);
  const [done, setDone] = useState(false);
  const dispatch = useDispatch();
  const toggleIcon = () => {
    setIsExpanded(!isExpanded);
  };
  console.log("value", value.status);
  let dateObj = new Date(value.datetime);
  let extractedDate = dateObj.toLocaleDateString();

  let hour = dateObj.getHours();
  let minute = dateObj.getMinutes();

  hour = hour < 10 ? "0" + hour : hour;
  minute = minute < 10 ? "0" + minute : minute;

  let extractedTime = hour + ":" + minute;
  const readHandler = async () => {
    if (!done) {
      var status = "unread";
      if (!read) {
        status = "read";
        console.log("read ki call");
      }

      setRead(!read);
      try {
        const result = await axios.post(
          `${REACT_BASE_URL}/updateStatus`,
          {
            status: status,
            taskId: value._id,
          }
        );
        dispatch(setRefersh(!refersh));
        console.log("result", result.data);
      } catch (err) {
        console.log("error in creating task", err);
      }
    }
  };
  const doneHandler = async () => {
    setDone(!done);
    setRead(!done);
    var status = "unread";
    if (!done) {
      status = "done";
      console.log("done ki call");
    }
    try {
      const result = await axios.post(
        `${REACT_BASE_URL}/updateStatus`,
        {
          status: status,
          taskId: value._id,
        }
      );
      dispatch(setRefersh(!refersh));
      console.log("result", result.data);
    } catch (err) {
      console.log("error in creating task", err);
    }
  };
  useEffect(() => {}, [refersh]);
  return (
    <div
      className={`w-[500px] flex flex-wrap rounded-lg 
    ${
      read || value.status === "done" || value.status === "read"
        ? done || value.status === "done"
          ? "border border-green-600"
          : "border border-yellow-600"
        : "border border-red-600"
    }
    `}
    >
      <div
        className={`w-full rounded-t-lg py-1 
        ${
          read || value.status === "done" || value.status === "read"
            ? done || value.status === "done"
              ? "bg-green-600"
              : "bg-yellow-600"
            : "bg-red-600"
        }
       
       flex justify-center items-center text-white px-5`}
      >
        <div className="w-3/4">
          <p className="text-[14px] text-white">
            Due Date: <span>{extractedDate}</span>
          </p>
          <p className="text-[14px] text-white">
            Due Time: <span>{extractedTime}</span>
          </p>
        </div>

        <div className="w-1/4 justify-end ">
          <p
            onClick={readHandler}
            className="flex gap-2 justify-center cursor-pointer items-center"
          >
            Mark :{" "}
            <span className="text-xl">
              {read ? (
                <AiFillEye></AiFillEye>
              ) : (
                <AiFillEyeInvisible></AiFillEyeInvisible>
              )}
            </span>{" "}
          </p>
        </div>
      </div>

      <div className="w-full max-lg:w-12/12  rounded-b-lg ">
        <div
          onClick={doneHandler}
          className="py-2 cursor-pointer min-h-16 px-3 flex items-center justify-between font-bold text-red-600"
        >
          {done || value.status === "done" ? (
            <s className="text-green-700">{value.title}</s>
          ) : (
            <div>{value.title}</div>
          )}
        </div>
        <p className="bg-slate-200 px-5 text-[14px] py-3 rounded-b-lg ">
        {done || value.status === "done" ? (
            <s className="text-green-700">{value.description}</s>
          ) : (
            <div>{value.description}</div>
          )}
        </p>
      </div>
    </div>
  );
};
export default DashCard;
