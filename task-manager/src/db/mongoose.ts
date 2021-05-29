import { connect, Document, model, Model, Schema } from "mongoose";

interface IUser extends Document {
  name: string;
  age: number;
}

interface ITask extends Document {
  description: string;
  completed: boolean;
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
  } catch (err) {
    console.log(err.stack);
    process.exit(1);
  }
};

// TODO: CREATE A SCHEMA OF USER

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  age: {
    type: Number,
    required: true,
    validate(value: Number) {
      if (value < 0) {
        throw new Error("Age must be a positive number");
      }
    },
  },
});

// TODO: CREATE A SCHEMA OF TASK
const TaskSchema: Schema = new Schema({
  description: { type: String, required: true },
  completed: { type: Boolean, required: true },
});

// TODO: CREATE A MODEL OF USER

const User: Model<IUser> = model("User", UserSchema);

// TODO: CREATE A MODEL OF TASK
const Task: Model<ITask> = model("Task", TaskSchema);

// TODO: CREATE A INSTANCE OF USER MODEL AND INSERT DATA AND SAVE DATA
const insertUser = async (name: string, age: number) => {
  const user: IUser = await User.create({
    name,
    age,
  });

  await user.save();
};

// TODO: CREATE A INSTANCE OF TASK MODEL AND INSERT DATA AND SAVE DATA
const insertTask = async (description: string, completed: boolean) => {
  const task: ITask = await Task.create({
    description,
    completed,
  });
  await task.save();
};

connectToDB()
  .then(() => console.log("connected Successfully"))
  .catch((error) => console.log("unable to connect" + error));

insertUser("Mike", -28)
  .then(() => console.log("Data inserted successfully"))
  .catch((err) => console.log("unable to insert user data" + err));

// insertTask("Buy Some Foods", false)
//   .then(() => console.log("Data inserted successfully"))
//   .catch((err) => console.log("unable to insert task data" + err));
