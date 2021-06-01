import {prop, getModelForClass} from "@typegoose/typegoose"

class Task {
  @prop({required: true, trim: true})
  public description! : string
  @prop({default: false})
  public completed?: boolean
}
export const TaskModel = getModelForClass(Task)
/*
CODE WITH IMPLEMENTION OF TYPEGOOSE
/*

// import { Document, Model, Schema, model } from "mongoose";

// interface ITask extends Document {
//   description: string;
//   completed: boolean;
// }

// const TaskSchema: Schema = new Schema({
//   description: { type: String, required: true, trim: true },
//   completed: { type: Boolean, default: false },
// });

// export const Task: Model<ITask> = model("Task", TaskSchema);
