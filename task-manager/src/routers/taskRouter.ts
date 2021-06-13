import express from "express";
import { TaskModel as Task } from "./../models/Task";
import auth, { IRequest } from "../middleware/auth";

const taskRouter = express.Router();

// post of task data
//@ts-ignore
taskRouter.post("/tasks", auth, async (req: IRequest, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await task.save();
  } catch (error) {
    res.status(400).send(error);
  }
  res.status(201).send(task);
});

// get tasks data
//@ts-ignore
taskRouter.get("/tasks", auth, async (req: IRequest, res) => {
  const match: { completed?: boolean } = {};
  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }
  try {
    await req.user
      .populate({
        path: "task",
        match,
        options: {
          limit: parseInt(<string>req.query.limit),
          skip: parseInt(<string>req.query.skip),
        },
      })
      .execPopulate();
    res.send(req.user.task);
  } catch (error) {
    res.status(500).send();
  }
});

// get task data from tasks
//@ts-ignore
taskRouter.get("/tasks/:taskID", auth, async (req: IRequest, res) => {
  const _id = req.params.taskID;
  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    !task ? res.status(404).send() : res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

// update a task
//@ts-ignore
taskRouter.patch("/tasks/:taskID", auth, async (req: IRequest, res) => {
  const updateProperty = Object.keys(req.body);
  const allowUpdateProperty = ["description", "completed"];
  const isValidUpdateOperation = updateProperty.every((property) =>
    allowUpdateProperty.includes(property)
  );

  if (!isValidUpdateOperation) {
    return res.status(400).send({ error: "Invalid update property" });
  }

  try {
    const task = await Task.findOne({
      _id: req.params.taskID,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(404).send();
    }
    // @ts-ignore
    allowUpdateProperty.forEach((update) => (task[update] = req.body[update]));
    // console.log(task);
    //@ts-ignore
    await task.save();
    res.send(task);
  } catch (error) {
    res.status(404).send(error);
  }
});

// delete a task by ID
//@ts-ignore
taskRouter.delete("/tasks/:taskID", auth, async (req: IRequest, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.taskID,
      owner: req.user._id,
    });
    !task ? res.status(404).send() : res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default taskRouter;
