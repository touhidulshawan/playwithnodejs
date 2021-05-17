import express from "express";

const app = express();

// root path
app.get("/", (req, res) => {
  res.send("<p>Send From Web Server [Home page]</p>");
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
