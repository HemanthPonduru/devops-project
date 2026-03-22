const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("My DevOps App is running 🚀");
});

// TEMPORARY in-memory storage
let tasks = [];

// Create task
app.post("/tasks", (req, res) => {
  const { title } = req.body;

  const newTask = {
    id: tasks.length + 1,
    title,
  };

  tasks.push(newTask);

  res.json(newTask);
});

// Get tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});