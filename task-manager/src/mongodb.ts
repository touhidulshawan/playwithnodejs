import { MongoClient } from "mongodb";
const username = "touhidulshawan";
const password = "shawan96";
const connectionURL = `mongodb://${username}:${password}@127.0.0.1:27017/`;
const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) return console.log(error);

    const db = client.db(databaseName);
    // insert single data to users collection
    // db.collection("users").insertOne(
    //   {
    //     name: "Shawan",
    //     age: 25,
    //   },
    //   (error, result) => {
    //     if (error) return console.log("Unable to insert into user");
    //     console.log(result.ops);
    //   }
    // );

    // insert multiple data to users collection
    db.collection("users").insertMany(
      [
        {
          name: "Shrabon",
          age: 24,
        },
        {
          name: "Mike",
          age: 28,
        },
        {
          name: "John",
          age: 32,
        },
      ],
      (error, result) => {
        if (error) return console.log("unable to insert users");
        console.log(result.ops);
      }
    );
  }
);
