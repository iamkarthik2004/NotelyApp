const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  content: { 
    type: String, 
    required: true 
  },
  subject: { 
    type: String, 
    required: true 
  },
  year: { 
    type: Number, 
    required: true,
    enum: [1, 2, 3, 4] // Only allow 1st to 4th year
  },
  semester: { 
    type: Number, 
    required: true,
    enum: [1, 2, 3, 4, 5, 6, 7, 8] // Semesters 1-8
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

// Create indexes for efficient querying
noteSchema.index({ subject: 1, year: 1, semester: 1 });

module.exports = mongoose.model("Note", noteSchema);
