import { connect, model, Schema, Model, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  age: number;
}

const username = "touhidulshawan";
const password = "shawan96";

const connectionURL = `mongodb://${username}:${password}@127.0.0.1:27017/task-manager-api`;

connect(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true,
});

// create a User Schema
const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
});

// create a User Model
const User: Model<IUser> = model("User", UserSchema);
