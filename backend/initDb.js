const mongoose = require('mongoose');
const Note = require('./models/Note');

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://gseries00100:C0KjovOvTBU2duKG@cluster0.mzed5g6.mongodb.net/notesDB?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Atlas connected successfully"))
  .catch((e) => console.error("❌ MongoDB error:", e));

// Sample note
const sampleNote = {
  title: "Introduction to Digital Image Processing",
  content: "Digital Image Processing is a fascinating subject that deals with the manipulation of digital images through various computational algorithms.",
  subject: "Digital Image Processing",
  year: 4,
  semester: 8,
};

// Function to initialize the database
async function initializeDb() {
  try {
    // Create the sample note
    const note = new Note(sampleNote);
    await note.save();
    console.log("✅ Sample note created successfully");
  } catch (error) {
    console.error("❌ Error creating sample note:", error);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
}

// Run the initialization
initializeDb(); 