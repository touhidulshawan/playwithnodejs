import { Document, Model, Schema, model } from "mongoose";

interface ITask extends Document {
  description: string;
  completed: boolean;
}

const TaskSchema: Schema = new Schema({
  description: { type: String, required: true, trim: true },
  completed: { type: Boolean, default: false },
});

export const Task: Model<ITask> = model("Task", TaskSchema);
