import CreateTask from "./CreateTask";
import ViewTask from "./ViewTask";

const AddTask = () => {
  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold bg-gradient-to-b
       from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text">
        You Task
      </h1>
      <div className=" border my-4">
        <ViewTask></ViewTask>
      </div>
      <div className="h-1/2 border">
        <CreateTask></CreateTask>
      </div>
    </div>
  );
};
export default AddTask;
