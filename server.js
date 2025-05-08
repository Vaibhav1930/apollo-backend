import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { Fragment } from "react";
import DoctorList from "./backend/DoctorList.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.VITE_MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.post("https://apollo-backend-6a3c.onrender.com/api/doctorlists", async (req, res) => {
  try {
    const DoctorList = new DoctorList(req.body);
    await DoctorList.save();
    res.status(201).json({ message: "Doctor added successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error saving feedback" });
  }
});
app.get("https://apollo-backend-6a3c.onrender.com/api/doctorlists", async (req, res) => {
  try {
    const DoctorLists = await DoctorList.find();
    console.log(DoctorLists); // Log the data
    res.status(200).json(DoctorLists);
  } catch (err) {
    console.error("Error fetching feedback:", err);
    res.status(500).json({ error: "Error fetching feedback" });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

