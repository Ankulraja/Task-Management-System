import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setEditTask, setRefersh } from "../../../../Slice/taskSlice";
import {REACT_BASE_URL} from "../../../../Urls"

const TaskCard = ({ value }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { refersh } = useSelector((state) => state.task);
  const dispatch = useDispatch();
  const toggleIcon = () => {
    setIsExpanded(!isExpanded);
  };

  console.log("value.........", value);
  console.log("value.........", value.status);
  let dateObj = new Date(value.datetime);
  let extractedDate = dateObj.toLocaleDateString();
  console.log("Extracted Date:", extractedDate);

  let hour = dateObj.getHours();
  let minute = dateObj.getMinutes();

  hour = hour < 10 ? "0" + hour : hour;
  minute = minute < 10 ? "0" + minute : minute;

  let extractedTime = hour + ":" + minute;
  const deleteHandler = async () => {
    try {
      var toastId = toast.loading("Deleting Task...");
      const result = await axios.post(
        `${REACT_BASE_URL}/deleteTask`,
        { taskId: value._id }
      );
      console.log("result", result.data);
      toast.success(result.data.message);
      dispatch(setRefersh(!refersh));
      toast.dismiss(toastId);
    } catch (err) {
      console.log("error in creating task", err);
      toast.dismiss(toastId);
    }
  };
  const editHandler = async () => {
    dispatch(setEditTask(value));
  };

  useEffect(() => {}, [refersh]);
  return (
    <div>
      <div
        className={`w-[400px] rounded-t-lg py-1
${
  value.status === "done" || value.status === "read"
    ? value.status === "done"
      ? "bg-green-600"
      : "bg-yellow-600"
    : "bg-red-600"
}
      flex justify-center items-center text-2xl text-white px-5`}
      >
        <div className="w-3/4">
          <p className="text-[14px] text-white">
            Due Date: <span>{extractedDate}</span>
          </p>
          <p className="text-[14px] text-white">
            Due Time: <span>{extractedTime}</span>
          </p>
        </div>

        <div className="flex gap-5 w-1/4 justify-end">
          <button onClick={editHandler}>
            <MdOutlineModeEditOutline></MdOutlineModeEditOutline>
          </button>
          <button onClick={deleteHandler}>
            <MdDelete></MdDelete>
          </button>
        </div>
      </div>
      <details
  className={`w-[400px] border rounded-b-lg 
  ${
    value.status === "done" || value.status === "read"
      ? value.status === "done"
        ? "border-green-600"
        : "border-yellow-600"
      : "border-red-600"
  }`}
>
        <summary className="py-2 min-h-16 px-3 flex items-center justify-between">
        {value.status === "done" ? (
            <s className="text-green-700">{value.title}</s>
          ) : (
            <div>{value.title}</div>
          )}
          <span className="text-blue-700 ml-2 text-lg" onClick={toggleIcon}>
            {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
          </span>
        </summary>
        <p
          className="bg-slate-200 px-5 text-[14px] py-3 rounded-b-lg "
          style={{ display: isExpanded ? "block" : "none" }}
        >
          {value.description}
        </p>
      </details>
    </div>
  );
};
export default TaskCard;
