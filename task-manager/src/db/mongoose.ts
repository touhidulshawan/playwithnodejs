import { connect } from "mongoose";

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

connectToDB()
  .then(() => console.log("connected to database successfully"))
  .catch((error) => console.log("unable to connect" + error));
