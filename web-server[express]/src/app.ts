import path from "path";
import express from "express";
import hbs from "hbs";

const app = express();
const publicFolderDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// set view engine
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);
// root path - load index.html file when web page serve
app.use(express.static(publicFolderDirectory));

app.get("/", (req, res) => {
  res.render("index", {
    title: "DEV",
    name: "Touhidul Shawan",
    domain: "dev.com",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Touhidul Shawan",
    domain: "dev.com",
  });
});

app.get("/service", (req, res) => {
  res.render("service", {
    title: "About",
    name: "Touhidul Shawan",
    domain: "dev.com",
  });
});
app.listen("3000", () => {
  console.log("Server is running on port 3000");
});
