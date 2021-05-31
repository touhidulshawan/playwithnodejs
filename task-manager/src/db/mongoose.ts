import { connect } from "mongoose";

// interface ITask extends Document {
//   description: string;
//   completed: boolean;
// }
// TODO: CREATE A CONNECTION
const connectionURL = "mongodb://127.0.0.1:27017/task-manager-api";

export const connectToDB = async () => {
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

// // TODO: CREATE A SCHEMA OF TASK
// const TaskSchema: Schema = new Schema({
//   description: { type: String, required: true, trim: true },
//   completed: { type: Boolean, default: false },
// });

// TODO: CREATE A MODEL OF USER

// TODO: CREATE A MODEL OF TASK
// const Task: Model<ITask> = model("Task", TaskSchema);

// TODO: CREATE A INSTANCE OF USER MODEL AND INSERT DATA AND SAVE DATA
// const insertUser = async (
//   name: string,
//   email: string,
//   password: string,
//   age: number
// ) => {
//   const user: IUser = await User.create({
//     name,
//     email,
//     password,
//     age,
//   });

//   await user.save();
// };

// TODO: CREATE A INSTANCE OF TASK MODEL AND INSERT DATA AND SAVE DATA
// const insertTask = async (description: string, completed?: boolean) => {
// const task: ITask = await Task.create({
// description,
// completed,
// });
// await task.save();
// };

connectToDB()
  .then(() => console.log("connected Successfully"))
  .catch((error) => console.log("unable to connect" + error));

// insertUser("Mike", "mike@gmail.com", "mike1996@", 20)
//   .then(() => console.log("Data inserted successfully"))
//   .catch((err) => console.log(err));

// insertTask("    Visit a place   ")
//   .then(() => console.log("Data inserted successfully"))
//   .catch((err) => console.log("unable to insert task data" + err));
