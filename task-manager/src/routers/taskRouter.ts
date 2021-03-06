import express from "express";
import { TaskModel as Task } from "./../models/Task";
import auth, { IRequest } from "../middleware/auth";

const taskRouter = express.Router();

// post of task data
//@ts-ignore
taskRouter.post("/tasks", auth, async (req: IRequest, res) => {
  try {
    if (req.user !== null) {
      const task = new Task({
        ...req.body,
        owner: req.user._id,
      });
      await task.save();
      res.status(201).send(task);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// get tasks data
//@ts-ignore
taskRouter.get("/tasks", auth, async (req: IRequest, res) => {
  const match: { completed?: boolean } = {};
  const sort: { createdAt?: number } = {};
  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }
  if (req.query.sortBy) {
    //@ts-ignore
    const parts = req.query.sortBy.split(":");
    //@ts-ignore
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }
  try {
    if (req.user !== null) {
      await req.user
        .populate({
          path: "task",
          match,
          options: {
            limit: parseInt(<string>req.query.limit),
            skip: parseInt(<string>req.query.skip),
            sort,
          },
        })
        .execPopulate();
      const data = req.user.$getPopulatedDocs();
      const uniqueData = [...new Set(data)];
      res.send(uniqueData);
    }
  } catch (error) {
    res.status(500).send();
  }
});

// get task data from tasks
//@ts-ignore
taskRouter.get("/tasks/:taskID", auth, async (req: IRequest, res) => {
  const _id = req.params.taskID;
  try {
    if (req.user !== null) {
      const task = await Task.findOne({ _id, owner: req.user._id });
      !task ? res.status(404).send() : res.send(task);
    }
  } catch (error) {
    res.status(500).send();
  }
});

// update a task
//@ts-ignore
// taskRouter.patch("/tasks/:taskID", auth, async (req: IRequest, res) => {
//   const updateProperty = Object.keys(req.body);
//   const allowUpdateProperty = ["description", "completed"];
//   const isValidUpdateOperation = updateProperty.every((property) =>
//     allowUpdateProperty.includes(property)
//   );

//   if (!isValidUpdateOperation) {
//     return res.status(400).send({ error: "Invalid update property" });
//   }

//   try {
//     if (req.user !== null) {
//       const task = await Task.findOne({
//         _id: req.params.taskID,
//         owner: req.user._id,
//       });
//       if (!task) {
//         return res.status(404).send();
//       }
//       // @ts-ignore
//       allowUpdateProperty.forEach(
//         (update) => (task[update] = req.body[update])
//       );
//       // console.log(task);
//       //@ts-ignore
//       await task.save();
//       res.send(task);
//     }
//   } catch (error) {
//     res.status(404).send(error);
//   }
// });

// delete a task by ID
//@ts-ignore
taskRouter.delete("/tasks/:taskID", auth, async (req: IRequest, res) => {
  try {
    if (req.user !== null) {
      const task = await Task.findOneAndDelete({
        _id: req.params.taskID,
        owner: req.user._id,
      });
      !task ? res.status(404).send() : res.send(task);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

export default taskRouter;
