import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

//--------Create Task---------
export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    await Task.create({
      title,
      description,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      message: "Task added successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "not create task",
    });
  }
};

//-------All Task-----------
export const getMyTask = async (req, res, next) => {
  try {
    const userid = req.user._id;

    const tasks = await Task.find({ user: userid });

    if (!tasks) return next(new ErrorHandler("Not found task", 404));

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};

// ----------updateTask--------
export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return next(new ErrorHandler("Task Not found", 404));
    }

    task.isCompleted = !task.isCompleted;
    await task.save();

    res.status(200).json({
      success: true,
      message: "Task update",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Not updated task",
    });
  }
};

// ----------deleteTask--------
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return next(new ErrorHandler("Task Not found", 404));
    }
    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Not delete task",
    });
  }
};
