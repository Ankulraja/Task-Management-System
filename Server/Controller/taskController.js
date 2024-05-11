const Task = require("../Module/Task");

// Create a new Task
exports.createTask = async (req, res) => {
  try {
    console.log("1")
    const { title, description, datetime } = req.body;
    if (!title || !description || !datetime) {
      return res.status(400).json({
        success: false,
        message: "Provide All required fields",
      });
    }
    console.log("2")
    const newTask = await Task.create(
      {
        title,
        description,
        datetime,
      },
    );
    console.log("3")
    return res.status(200).json({
      success: true,
      newTask,
      message: "Task created successfully",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Error while creating task",
    });
  }
};

// Get All Task
exports.getAllTask = async (req, res) => {
  try {
    const allTask = await Task.find({});
    console.log("3")
    return res.status(200).json({
      success: true,
      allTask,
      message: "Fetching All Task successfully",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Error while creating task",
    });
  }
};

// Update A New Task

exports.updateTask = async (req, res) => {
  try {

    console.log(("call Aaya"))
    const { title, description, datetime, taskId } = req.body;
    if (!title || !description || !datetime || !taskId) {
      return res.status(400).json({
        success: false,
        message: "Provide All required fields",
      });
    }

    const updateTask = await Task.findByIdAndUpdate(
      taskId,
      {
        title,
        description,
        datetime,
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      updateTask,
      message: "Task Updated successfully",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Error while creating task",
    });
  }
};


// Delete a task

exports.deleteTask = async (req, res) => {
  try {
    console.log("delete")
    const { taskId } = req.body;
    console.log("id", taskId);
    if (!taskId) {
      return res.status(400).json({
        success: false,
        message: "Id's are Missing",
      });
    }

    const updateTask = await Task.findByIdAndDelete(taskId);
    return res.status(200).json({
      success: true,
      message: "Task Deleted successfully",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Error while Deliting task",
    });
  }
};
exports.updateStatus = async (req, res) => {
  try {
    console.log("status")
    const { taskId,status } = req.body;
    console.log("id", taskId);
    if (!taskId || !status) {
      return res.status(400).json({
        success: false,
        message: "Id's are Missing",
      });
    }

    const updateStatus = await Task.findByIdAndUpdate(taskId,{
      status:status
    },{new:true});
    return res.status(200).json({
      success: true,
      updateStatus,
      message: "Status Updated successfully",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Error while Updating Status",
    });
  }
};



