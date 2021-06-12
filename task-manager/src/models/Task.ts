import {
  getModelForClass,
  modelOptions,
  pre,
  prop,
} from "@typegoose/typegoose";
import { ObjectID } from "mongodb";

@modelOptions({
  schemaOptions: {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  },
})
@pre<Task>("save", function (next) {
  const task = this;
  if (!task.isModified("completed")) {
    task.completed = false;
  }
  next();
})
export class Task {
  @prop({ required: true, trim: true })
  public description!: string;
  @prop({ default: false })
  public completed?: boolean;
  @prop({ required: true, ref: "User" })
  public owner!: ObjectID;
}

export const TaskModel = getModelForClass(Task);

/*
CODE WITH IMPLEMENTATION OF TYPEGOOSE
*/

// import { Document, Model, Schema, model } from "mongoose";

// interface ITask extends Document {
//   description: string;
//   completed: boolean;
// }

// const TaskSchema: Schema = new Schema({
//   description: { type: String, required: true, trim: true },
//   completed: { type: Boolean, default: false },
// });

// export const Task: Model<ITask> = model("Task", TaskSchema)
