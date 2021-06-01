import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserModel as User } from "../models/User";
const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")!.replace("Bearer ", "");
    const decoded = jwt.verify(token, "myscreatkeyphrasse") as any;
    console.log(decoded);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) throw new Error();
    res.send(user);
  } catch (error) {
    res.status(401).send({ error: "Please authenticate!!" });
  }
};

export default auth;
