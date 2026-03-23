const express = require("express");
const app = express();
const pool = require("./db");
const path = require("path");

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname))); // serve frontend

// Home route (serves UI)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
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

// Get all tasks
app.get("/tasks", async (req, res) => {
  try {
    const allTasks = await pool.query("SELECT * FROM tasks");
    res.json(allTasks.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Start server (Render compatible)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
