require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ======================
// Middleware
// ======================
app.use(cors());
app.use(express.json());

// ======================
// MongoDB Connection
// ======================
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected ✅");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error ❌:", err);
    process.exit(1);
  });

// ======================
// Sample Schema (for testing)
// ======================
const examSchema = new mongoose.Schema({
  student: String,
  subject: String,
  time: String,
});

const Exam = mongoose.model("Exam", examSchema);

// ======================
// Routes
// ======================

// Test route
app.get("/", (req, res) => {
  res.send("ChronoExam Backend Running 🚀");
});

// Add exam (with basic validation)
app.post("/add-exam", async (req, res) => {
  try {
    const { student, subject, time } = req.body;

    // Fetch existing exams for same student
    const exams = await Exam.find({ student });

    const newTime = new Date(`2024-01-01 ${time}`);

    for (let exam of exams) {
      const existingTime = new Date(`2024-01-01 ${exam.time}`);
      const diff = Math.abs(newTime - existingTime) / (1000 * 60 * 60);

      // ❌ Conflict or less than 2 hour gap
      if (diff < 2) {
        return res.json({
          success: false,
          message: "Conflict or less than 2-hour gap!",
        });
      }
    }

    // Save exam
    const newExam = new Exam({ student, subject, time });
    await newExam.save();

    res.json({ success: true, message: "Exam scheduled successfully ✅" });
  } catch (error) {
    res.status(500).json({ error: "Server error ❌" });
  }
});

// Get all exams
app.get("/exams", async (req, res) => {
  try {
    const exams = await Exam.find();
    res.json(exams);
  } catch (error) {
    res.status(500).json({ error: "Error fetching exams" });
  }
});

// ======================
// Server Start
// ======================
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
