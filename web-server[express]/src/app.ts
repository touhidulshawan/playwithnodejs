import path from "path";
import express from "express";

const app = express();

const publicFolderDirectory = path.join(__dirname, "../public");

// root path - load index.html file when web page serve
app.use(express.static(publicFolderDirectory));

//! Do need now cause this three pages is serving through html file with [above] line
// // root
// app.get("/", (req, res)=> {
//   res.send("<p>This is home page</p>")
// })
// // about page
// app.get("/about", (req, res) => {
//   res.send("<p>This is about page</p>");
// });

// // service page
// app.get("/service", (req, res) => {
//   res.send("<p>These are our services</p>");
// });

app.listen("3000", () => {
  console.log("Server is running on port 3000");
});
