import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setAllTask } from "../../../../Slice/taskSlice";
import TaskCard from "./TaskCard";
import {REACT_BASE_URL} from "../../../../Urls"

const ViewTask = () => {
  const dispatch = useDispatch();
  const { refersh } = useSelector((state) => state.task);
  const [taskData, setTaskData] = useState([]);

  const callgetAllTasks = async () => {
    try {
      var toastId = toast.loading("Loading...");
      const result = await axios.get(`${REACT_BASE_URL}/getAllTask`);
      setTaskData(result.data.allTask.reverse()); // Reverse the taskData array
      toast.dismiss(toastId);
    } catch (err) {
      console.log("error in creating task", err);
      toast.dismiss(toastId);
    }
  };

  useEffect(() => {
    callgetAllTasks();
  }, [refersh]);

  return (
    <div className="w-full px-5 py-5 flex  items-center">
      {taskData?.length > 0 && (
        <div className="w-full py-5 flex gap-5 overflow-x-scroll">
          {taskData?.map((value, index) => (
            <TaskCard key={index} value={value}></TaskCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewTask;
