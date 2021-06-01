import express, { Router } from "express";
import bcrypt from "bcryptjs";
import { UserModel as User } from "../models/User";

const userRouter: Router = express.Router();

// user login route
userRouter.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredientials(
      req.body.email,
      req.body.password
    );
    res.send(user);
  } catch (error) {
    res.status(404).send();
  }
});
// post of users data
userRouter.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
  } catch (error) {
    res.status(400).send(error);
  }
  res.status(201).send(user);
});

// get users data

userRouter.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send();
  }
});

// get a single user data by ID

userRouter.get("/users/:userID", async (req, res) => {
  try {
    const user = await User.findById(req.params.userID);
    !user ? res.status(404).send() : res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});

// update a user by id
userRouter.patch("/users/:userID", async (req, res) => {
  const updateProperty = Object.keys(req.body);
  const allowUpdateProperty = ["name", "email", "password", "age"];
  const isValidUpdateOperation = updateProperty.every((property) =>
    allowUpdateProperty.includes(property)
  );
  if (!isValidUpdateOperation) {
    return res.status(400).send({ error: "Invalid update property" });
  }

  // hasing password before update
  const password: string = req.body.password;
  if (password && !password.includes("password")) {
    const hashedPass = await bcrypt.hash(password, 8);
    req.body.password = hashedPass;
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

userRouter.delete("/users/:userID", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userID);
    !user ? res.status(404).send() : res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default userRouter;
