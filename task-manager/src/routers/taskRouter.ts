import express from "express";
import { TaskModel as Task } from "./../models/Task";

const taskRouter = express.Router();

// post of task data

taskRouter.post("/tasks", async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
  } catch (error) {
    res.status(400).send(error);
  }
  res.status(201).send(task);
});

// get tasks data
taskRouter.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (error) {
    res.status(500).send();
  }
});

// get task data from tasks
taskRouter.get("/tasks/:taskID", async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskID);
    !task ? res.status(404).send() : res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

// update a task
taskRouter.patch("/tasks/:taskID", async (req, res) => {
  const updateProperty = Object.keys(req.body);
  const allowUpdateProperty = ["description", "completed"];
  const isValidUpdateOperation = updateProperty.every((property) =>
    allowUpdateProperty.includes(property)
  );

  if (!isValidUpdateOperation) {
    return res.status(400).send({ error: "Invalid update property" });
  }

  try {
    const task = await Task.findByIdAndUpdate(req.params.taskID, req.body, {
      new: true,
      runValidators: true,
    });
    !task ? res.status(404).send() : res.send(task);
  } catch (error) {
    res.status(404).send(error);
  }
});

// delete a task by ID

taskRouter.delete("/tasks/:taskID", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.taskID);
    !task ? res.status(404).send() : res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default taskRouter;
