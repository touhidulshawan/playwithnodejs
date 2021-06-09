import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserModel as User } from "../models/User";

export interface IRequest extends Request {
  user: any;
}

const auth = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")!.replace("Bearer ", "");
    const decoded = jwt.verify(token, "myscreatkeyphrasse") as any;

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }
    req.user = user;
  } catch (error) {
    res.status(401).send({ error: "Please authenticate!!" });
  }
};

export default auth;
