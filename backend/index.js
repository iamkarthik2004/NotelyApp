const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({ origin: process.env.FRONTEND_URL })
);
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((e) => console.error("❌ MongoDB error:", e));

app.get("/", (_, res) => res.send("Notes API is live!"));

const noteRoutes = require("./routes/noteRoutes");
app.use("/api/notes", noteRoutes);

app.listen(PORT, () =>
  console.log(`🚀 Server at http://localhost:${PORT}`)
);
