import { Document, Schema, model, Model } from "mongoose";
import validator from "validator";

interface IUser extends Document {
  name: string;
  age: number;
}
const UserSchema: Schema = new Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    trim: true,
    validate(value: string) {
      if (!validator.isEmail(value)) throw new Error("Email is not valid");
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value: string) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password can not contain word password");
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value: number) {
      if (value < 0) {
        throw new Error("Age must be a positive number");
      }
    },
  },
});

export const User: Model<IUser> = model("User", UserSchema);
