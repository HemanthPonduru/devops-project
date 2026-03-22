const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("My DevOps App is running 🚀");
});

// Create task
app.post("/tasks", async (req, res) => {
  try {
    console.log("Incoming:", req.body);

    const { title } = req.body;

    const newTask = await pool.query(
      "INSERT INTO tasks (title) VALUES($1) RETURNING *",
      [title]
    );

    res.json(newTask.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get tasks
app.get("/tasks", async (req, res) => {
  try {
    const allTasks = await pool.query("SELECT * FROM tasks");
    res.json(allTasks.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});