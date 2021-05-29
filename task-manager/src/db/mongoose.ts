import { connect, Document, model, Model, Schema } from "mongoose";

interface IUser extends Document {
  name: string;
  age: number;
}

// TODO: CREATE A CONNECTION
const connectionURL = "mongodb://127.0.0.1:27017/task-manager-api";

const connectToDB = async () => {
  try {
    await connect(connectionURL, {
      user: "touhidulshawan",
      pass: "shawan96",
      authSource: "admin",
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true,
    });
    console.log("Connected to database :)");
  } catch (err) {
    console.log(err.stack);
    process.exit(1);
  }
};

// TODO: CREATE A SCHEMA OF USER

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
});
// TODO: CREATE A MODEL OF USER

const User: Model<IUser> = model("User", UserSchema);

// TODO: CREATE A INSTANCE OF USER MODEL AND INSERT DATA AND SAVE DATA
const insertUser = async () => {
  try {
    const user: IUser = await User.create({
      name: "Touhidul Shawan",
      age: 25,
    });

    await user.save();
    console.log("Data inserted successfully");
  } catch (err) {
    console.log("Can not insert data to database");
  }
};

connectToDB();
insertUser();
