const express = require("express");
const router  = express.Router();
const Note    = require("../models/Note");

// GET all
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST new
router.post("/", async (req, res) => {
  try {
    const newNote = new Note(req.body);
    const saved   = await newNote.save();
    res.status(201).json(saved);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// PUT update
router.put("/:id", async (req, res) => {
  try {
    const updated = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Note.findByIdAndDelete(req.params.id);
    res.json(deleted);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;
