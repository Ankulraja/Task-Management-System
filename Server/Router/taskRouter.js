const express = require("express");
const {
  createTask,
  updateTask,
  deleteTask,
  getAllTask,
  updateStatus
} = require("../Controller/taskController");
const router = express.Router();

router.post("/createTask", createTask);
router.get("/getAllTask", getAllTask);
router.post("/updateTask", updateTask);
router.post("/deleteTask", deleteTask);
router.post("/updateStatus", updateStatus);

module.exports = router;
