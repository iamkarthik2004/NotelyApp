const express = require("express");
const router  = express.Router();
const Note    = require("../models/Note");

// GET notes with optional filters
router.get("/", async (req, res) => {
  try {
    const { subject, year, semester } = req.query;
    const query = {};

    // Add filters if they exist
    if (subject) query.subject = subject;
    if (year) query.year = parseInt(year);
    if (semester) query.semester = parseInt(semester);

    const notes = await Note.find(query).sort({ createdAt: -1 });
    res.json(notes);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST new note
router.post("/", async (req, res) => {
  try {
    // Validate year and semester
    const { year, semester } = req.body;
    if (year && (year < 1 || year > 4)) {
      return res.status(400).json({ error: "Year must be between 1 and 4" });
    }
    if (semester && (semester < 1 || semester > 8)) {
      return res.status(400).json({ error: "Semester must be between 1 and 8" });
    }

    const newNote = new Note(req.body);
    const saved = await newNote.save();
    res.status(201).json(saved);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// PUT update note
router.put("/:id", async (req, res) => {
  try {
    // Validate year and semester if they're being updated
    const { year, semester } = req.body;
    if (year && (year < 1 || year > 4)) {
      return res.status(400).json({ error: "Year must be between 1 and 4" });
    }
    if (semester && (semester < 1 || semester > 8)) {
      return res.status(400).json({ error: "Semester must be between 1 and 8" });
    }

    const updated = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// DELETE note
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Note.findByIdAndDelete(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json(deleted);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;
