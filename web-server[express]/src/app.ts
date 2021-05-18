import path from "path";
import express from "express";

const app = express();
const publicFolderDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates");

// set view engine
app.set("view engine", "hbs");
app.set("views", viewsPath);
// root path - load index.html file when web page serve
app.use(express.static(publicFolderDirectory));

app.get("/", (req, res) => {
  res.render("index", {
    title: "DEV",
    name: "Touhidul Shawan",
  });
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
