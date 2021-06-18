import { ObjectID } from "mongodb";
interface ITask {
  description: string;
  completed?: boolean;
  owner: ObjectID;
}

export default ITask;
