import express from "express";
import { User } from "./models/User";
import { Task } from "./models/Task";
require("./db/mongoose");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// post of users data
app.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
  } catch (error) {
    res.status(400).send(error);
  }
  res.status(201).send(user);
});

// post of task data

app.post("/tasks", async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
  } catch (error) {
    res.status(400).send(error);
  }
  res.status(201).send(task);
});

app.listen(port, () => {
  console.log(`App is running on localhost:${port}`);
});
