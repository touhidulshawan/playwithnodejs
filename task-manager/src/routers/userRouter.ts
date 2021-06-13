import express, { NextFunction, Request, Response, Router } from "express";
import { UserModel as User } from "../models/User";
import auth, { IRequest } from "../middleware/auth";
import multer, { MulterError } from "multer";

const userRouter: Router = express.Router();

// create a user

userRouter.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

// user login route

userRouter.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send();
  }
});

// user logout route
//@ts-ignore
userRouter.post("/users/logout", auth, async (req: IRequest, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token: { _id: string; token: string }) => {
        return token.token !== req.token;
      }
    );
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

// logout from all session for a user
// @ts-ignore
userRouter.post("/users/logoutAll", auth, async (req: IRequest, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});
// get profile data of a user

//@ts-ignore
userRouter.get("/users/me", auth, async (req: IRequest, res) => {
  res.send(req.user);
});

// update user profile by user
//@ts-ignore
userRouter.patch("/users/me", auth, async (req: IRequest, res) => {
  const updateProperty = Object.keys(req.body);
  const allowUpdateProperty = ["name", "email", "password", "age"];
  const isValidUpdateOperation = updateProperty.every((property) =>
    allowUpdateProperty.includes(property)
  );
  if (!isValidUpdateOperation) {
    return res.status(400).send({ error: "Invalid update property" });
  }

  try {
    updateProperty.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// delete user
// @ts-ignore
userRouter.delete("/users/me", auth, async (req: IRequest, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// upload user avatar image
const upload = multer({
  dest: "avatars",
  limits: {
    fileSize: 1000000,
  },
  fileFilter(
    req: express.Request,
    file: Express.Multer.File,
    callback: multer.FileFilterCallback
  ) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return callback(new Error("Please upload an image"));
    }
    callback(null, true);
  },
});

userRouter.post(
  "/users/me/avatar",
  upload.single("avatar"),
  (req: Request, res: Response) => {
    res.send({ success: "Profile avatar uploaded successfully" });
  },
  (error: MulterError, req: Request, res: Response, next: NextFunction) => {
    res.status(400).send({ error: error.message });
  }
);

export default userRouter;
