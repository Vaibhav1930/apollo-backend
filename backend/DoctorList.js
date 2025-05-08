import mongoose from "mongoose";

const DoctorList = new mongoose.Schema({
  name: String,
  specilization: String,
  contact: Number,
  Location:String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("DoctorList", DoctorList);
