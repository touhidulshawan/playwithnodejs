import path from "path";
import express from "express";

const app = express();

const publicFolderDirectory = path.join(__dirname, "../public");

app.use(express.static(publicFolderDirectory));

// root path
app.get("/", (req, res) => {
  res.send();
});

// about page

app.get("/about", (req, res) => {
  res.send("<p>This is about page</p>");
});

// service page
app.get("/service", (req, res) => {
  res.send("<p>These are our services</p>");
});

app.listen("3000", () => {
  console.log("Server is running on port 3000");
});
