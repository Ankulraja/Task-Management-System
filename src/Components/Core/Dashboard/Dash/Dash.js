import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DashCard from "../Dash/DashCard";
import { useSelector } from "react-redux";

const Dash = () => {
  const [taskData, setTaskData] = useState([]);
  const {refersh} = useSelector((state)=>state.task)
  const callgetAllTasks = async () => {
    try {
     
      const result = await axios.get(`http://localhost:4000/api/v1/getAllTask`);
      setTaskData(result.data.allTask.reverse()); 
 
    } catch (err) {
      console.log("error in creating task", err);
      
    }
  };
  useEffect(() => {
    callgetAllTasks();
  }, [refersh]);


  return  <div className="w-full px-5 py-5 flex items-center">
  {taskData?.length > 0 && (
    <div className="w-full py-5 flex gap-5 justify-between  flex-wrap">
      {taskData?.map((value, index) => (
        <DashCard key={index} value={value}></DashCard>
      ))}
    </div>
  )}
</div>

};
export default Dash;
