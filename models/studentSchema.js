import mongoose, { model, mongo } from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  subjects: { type: [String], default : [] },
  isGraduated: { type: Boolean , default : false },
});

const student = mongoose.model("studentSchema ", studentSchema);
export default student;
