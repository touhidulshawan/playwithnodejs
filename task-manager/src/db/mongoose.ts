import { connect } from "mongoose";

const username = "touhidulshawan";
const password = "shawan96";

const connectionURL = `mongodb://${username}:${password}@127.0.0.1:27017/task-manager-api`;

connect(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true,
});
