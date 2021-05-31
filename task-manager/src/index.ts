import express from "express";
import { User } from "./models/User";
require("./db/mongoose");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
  } catch (err) {
    res.send(err);
  }
  res.send(user);
});

app.listen(port, () => {
  console.log(`App is running on localhost:${port}`);
});
