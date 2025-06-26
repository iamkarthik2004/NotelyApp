const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const noteRoutes = require("./routes/noteRoutes");

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
  origin: ['https://notely-app-indol.vercel.app', 'http://localhost:5173'], // Allow both deployed and local frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());


app.get("/", (_, res) => res.json({ 
  status: "online", 
  message: "Notes API is live!",
  timestamp: new Date().toISOString()
}));


app.get("/wake-up", (_, res) => res.json({ 
  status: "awake", 
  message: "Server is awake now!",
  timestamp: new Date().toISOString() 
}));


app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});


app.use("/api/notes", noteRoutes);

mongoose
  .connect("mongodb+srv://gseries00100:C0KjovOvTBU2duKG@cluster0.mzed5g6.mongodb.net/notesDB?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Atlas connected successfully"))
  .catch((e) => console.error("❌ MongoDB error:", e));


app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
