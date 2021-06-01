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

// get users data

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send();
  }
});

// get a single user data by ID

app.get("/users/:userID", async (req, res) => {
  try {
    const user = await User.findById(req.params.userID);
    !user ? res.status(404).send() : res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});

// update a user by id
app.patch("/users/:userID", async (req, res) => {
  const updateProperty = Object.keys(req.body);
  const allowUpdateProperty = ["name", "email", "password", "age"];
  const isValidUpdateOperation = updateProperty.every((property) =>
    allowUpdateProperty.includes(property)
  );
  if (!isValidUpdateOperation) {
    return res.status(400).send({ error: "Invalid update property" });
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.userID, req.body, {
      new: true,
      runValidators: true,
    });
    !user ? res.status(404).send() : res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// delete a user by id

app.delete("/users/:userID", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userID);
    !user ? res.status(404).send() : res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
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

// get tasks data
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (error) {
    res.status(500).send();
  }
});

// get task data from tasks
app.get("/tasks/:taskID", async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskID);
    !task ? res.status(404).send() : res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

// update a task
app.patch("/tasks/:taskID", async (req, res) => {
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

app.delete("/tasks/:taskID", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.taskID);
    !task ? res.status(404).send() : res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});
