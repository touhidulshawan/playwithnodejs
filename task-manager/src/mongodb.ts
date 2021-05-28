import { MongoClient, ObjectID } from "mongodb";
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
    // db.collection("users").insertMany(
    //   [
    //     {
    //       name: "Shrabon",
    //       age: 24,
    //     },
    //     {
    //       name: "Mike",
    //       age: 28,
    //     },
    //     {
    //       name: "John",
    //       age: 32,
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) return console.log("unable to insert users");
    //     console.log(result.ops);
    //   }
    // );

    // insert multiple data into tasks collection

    // db.collection("tasks").insertMany(
    //   [
    //     {
    //       description: "Do the homework",
    //       completed: false,
    //     },
    //     {
    //       description: "Buy some foods",
    //       completed: true,
    //     },
    //     {
    //       description: "Go to gym",
    //       completed: false,
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) return console.log("unable to insert task");
    //     console.log(result.ops);
    //   }
    // );

    // fetch 1 document from users collection by name

    db.collection("users").findOne({ name: "Shrabon" }, (error, user) => {
      if (error) return console.log("unable to fetch");
      console.log(user);
    });

    // fetch 1 document from users collection by id

    db.collection("users").findOne(
      { _id: new ObjectID("60afde3c22ef69bb22a23a56") },
      (error, user) => {
        if (error) return console.log("unable to fetch");
        console.log(user);
      }
    );

    // fetch multiple document from users collection based on age

    db.collection("users")
      .find({ age: 25 })
      .toArray((error, users) => {
        if (error) return console.log("unable to fetch");
        console.log(users);
      });

    // fetch 1 document from tasks collection by id
    db.collection("tasks").findOne(
      { _id: new ObjectID("60b04e69d0e8e5295c9ed320") },
      (error, task) => {
        if (error) return console.log("unable to fetch");
        console.log(task);
      }
    );
    // fetch documents from tasks collection based on it is completed or not
    db.collection("tasks")
      .find({ completed: false })
      .toArray((error, tasks) => {
        if (error) return console.log("unable to fetch");
        console.log(tasks);
      });
  }
);
