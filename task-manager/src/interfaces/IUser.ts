import { ObjectID } from "mongodb";

interface IUser {
  _id?: ObjectID;
  name: string;
  email: string;
  password: string;
  age?: number;
  avatar?: Buffer;
  tokens: Array<{ _id: ObjectID; token: string }>;
}

export default IUser;
