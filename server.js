import mongoose from "mongoose";
import express from "express";
import "dotenv/config";
import cors from "cors";
import Student from "./models/studentSchema.js";

const app = express();
const PORT = 4000;

app.use(express());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected "))
  .catch((error) => console.error("MongoDB connection Failed"));

app.post("/students", async (req, res) => {
  try {
    const students = new Student(req.body);
    const newStudent = await students.save();
    res.status(201).json({ newStudent });
  } catch (error) {
    res.status(400).json({ message: "Internal error ", error });
  }
});

app.get("/students", async (req, res) => {
  try {
    const student = await Student.find();
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/students/:id", async (req, res) => {
  try {
    const deleteStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deleteStudent) {
      return res.status(404).json({ message: "Student not found " });
    }
    res.json({ message: "Student deleted Sucessfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
