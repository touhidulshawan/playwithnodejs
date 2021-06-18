import express, { NextFunction, Request, Response, Router } from "express";
import { UserModel as User } from "../models/User";
import auth, { IRequest } from "../middleware/auth";
import multer, { MulterError } from "multer";
import { ObjectId } from "mongoose";

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
    if (req.user !== null) {
      req.user.tokens = req.user.tokens.filter((token) => {
        return token.token !== req.token;
      });
      await req.user.save();
      res.send();
    }
  } catch (error) {
    res.status(500).send();
  }
});

// logout from all session for a user
// @ts-ignore
userRouter.post("/users/logoutAll", auth, async (req: IRequest, res) => {
  try {
    if (req.user !== null) {
      req.user.tokens = [];
      await req.user.save();
      res.send();
    }
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
    if (req.user !== null) {
      updateProperty.forEach((update) => {
        req.user = req.body[update];
      });
      await req.user.save();
      res.send(req.user);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// delete user
// @ts-ignore
userRouter.delete("/users/me", auth, async (req: IRequest, res) => {
  try {
    if (req.user !== null) {
      await req.user.remove();
      res.send(req.user);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// upload user avatar image
const upload = multer({
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

// upload a profile avatar

//@ts-ignore
userRouter.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req: IRequest, res: Response) => {
    if (req.user !== null) {
      req.user.avatar = req.file.buffer;
      await req.user.save();
      res.send({ success: "Profile avatar uploaded successfully" });
    }
  },
  (error: MulterError, req: Request, res: Response, next: NextFunction) => {
    res.status(400).send({ error: error.message });
  }
);

export default userRouter;
