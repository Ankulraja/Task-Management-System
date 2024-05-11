import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdReplay } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setEditTask, setRefersh } from "../../../../Slice/taskSlice";
import {REACT_BASE_URL} from "../../../../Urls"

const CreateTask = () => {
  const { editTask } = useSelector((state) => state.task);
  const dispatch = useDispatch();
  const { refersh } = useSelector((state) => state.task);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    datetime: null,
  });

  useEffect(() => {
    // Update formData whenever editTask changes
    setFormData({
      title: editTask?.title ?? "",
      description: editTask?.description ?? "",
      datetime: editTask?.datetime ? editTask.datetime.slice(0, -5) : null,
    });
  }, [editTask]);

  const changeHandler = (event) => {
    setFormData((old) => ({
      ...old,
      [event.target.name]: event.target.value,
    }));
  };

  const replayHandler = () => {
    setFormData({
      title: "",
      description: "",
      datetime: "",
    });
    dispatch(setEditTask(null));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log("formData", formData);
    if (editTask) {
      try {
        var toastId = toast.loading("Updating Task...");
        const result = await axios.post(
          `${REACT_BASE_URL}/updateTask`,
          {
            title: formData.title,
            description: formData.description,
            datetime: formData.datetime,
            taskId: editTask._id,
          }
        );
        console.log("result", result.data);
        dispatch(setRefersh(!refersh));
        toast.dismiss(toastId);
      } catch (err) {
        console.log("error in creating task", err);
        toast.dismiss(toastId);
      }
    } else {
      try {
        var toastId = toast.loading("Creating Task...");
        const result = await axios.post(
          `${REACT_BASE_URL}/createTask`,
          formData
        );
        console.log("result", result.data);
        dispatch(setRefersh(!refersh));
        toast.dismiss(toastId);
      } catch (err) {
        console.log("error in creating task", err);
        toast.dismiss(toastId);
      }
    }
  };

  return (
    <div className="w-full flex justify-center py-10">
      <div className="w-5/12 max-lg:w-7/12 max-md:w-9/12 max-sm:w-11/12 border">
        <div className="w-full h-14 bg-black text-white flex justify-end items-center text-3xl px-5">
          <button
            onClick={replayHandler}
            className="active:-rotate-45 transition-all duration-200"
          >
            <MdReplay></MdReplay>
          </button>
        </div>
        <form onSubmit={submitHandler} className="py-5 px-5">
          <label>
            <p className="text-lg">
              Title <sup className="text-red-700">*</sup>
            </p>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={changeHandler}
              placeholder="Enter Title Of Task"
              className="w-full h-10 rounded-lg bg-gray-300 px-5"
            ></input>
          </label>
          <label>
            <p className="text-lg">
              Description <sup className="text-red-700">*</sup>
            </p>
            <textarea
              name="description"
              placeholder="Enter Task Description"
              rows={7}
              required
              value={formData.description}
              onChange={changeHandler}
              className="w-full py-5 rounded-lg bg-gray-300 px-5"
            ></textarea>
          </label>
          <div className="flex  justify-center items-end gap-10">
            <label className="flex w-2/3 flex-col gap-1">
              <p className="text-lg">
                Date <sup className="text-red-700">*</sup>
                <input
                  type="datetime-local"
                  name="datetime"
                  required
                  value={formData.datetime}
                  onChange={changeHandler}
                  className="w-full h-10 rounded-lg bg-gray-300 px-5"
                ></input>
              </p>
            </label>
            <button
              type="submit"
              className="w-1/3 py-2 text-white  px-3 rounded-lg bg-blue-700"
            >
              {editTask ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
