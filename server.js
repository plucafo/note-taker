const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require("./Develop/db/db.json");
const { v4: uuid } = require("uuid");

const PORT = 3001;

const app = express();

app.use(express.static("./Develop/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
});

// Get all notes
app.get("/api/notes", (req, res) => {
  res.json(db);
});

// Save a new note
app.post("/api/notes", (req, res) => {
  const newNote = {
    id: uuid(),
    title: req.body.title,
    text: req.body.text,
  };
  db.push(newNote);

  // Write the updated data back to db.json
  fs.writeFile("./Develop/db/db.json", JSON.stringify(db), (err) => {
    if (err) throw err;
    console.log("Note saved successfully!");
    res.json(newNote);
  });
});

app.delete("/api/notes/:id", (req, res) => {
  const noteId = req.params.id;

  // Find the index of the note with the specified ID
  const noteIndex = db.findIndex((note) => note.id === noteId);

  // If the note is found, remove it from the array
  if (noteIndex !== -1) {
    db.splice(noteIndex, 1);

    // Write the updated data back to db.json
    fs.writeFile("./Develop/db/db.json", JSON.stringify(db), (err) => {
      if (err) throw err;
      console.log(`Note with ID ${noteId} deleted successfully!`);
      res.json({ success: true, message: "Note deleted successfully" });
    });
  } else {
    res.status(404).json({ success: false, message: "Note not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
