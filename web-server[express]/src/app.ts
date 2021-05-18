import path from "path";
import express from "express";

const app = express();

// set view engine
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "hbs");

const publicFolderDirectory = path.join(__dirname, "../public");

// root path - load index.html file when web page serve
app.use(express.static(publicFolderDirectory));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/service", (req, res) => {
  res.render("service");
});
app.listen("3000", () => {
  console.log("Server is running on port 3000");
});
