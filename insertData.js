import mongoose from 'mongoose';
import dotenv from 'dotenv';
import DoctorList from './backend/DoctorList.js';

dotenv.config();

const sampleDoctors = [
    {
        name: 'Dr. A Sharma',
        specialization: 'Cardiologist',
        location: 'Delhi',
        contact: '1234567890',
      },
      {
        name: 'Dr. B Verma',
        specialization: 'General Physician',
        location: 'Mumbai',
        contact: '2345678901',
      },
      {
        name: 'Dr. C Gupta',
        specialization: 'Pediatrician',
        location: 'Delhi',
        contact: '3456789012',
      },
      {
        name: 'Dr. D Sen',
        specialization: 'Dentist',
        location: 'Kolkata',
        contact: '4567890123',
      },
      {
        name: 'Dr. E Reddy',
        specialization: 'General Physician',
        location: 'Hyderabad',
        contact: '5678901234',
      }
];

async function insertDoctors() {
  try {
    await mongoose.connect(process.env.VITE_MONGODB_URI);
    console.log("MongoDB connected");

    await DoctorList.insertMany(sampleDoctors);
    console.log("Sample doctors inserted");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error inserting data:", error);
  }
}

insertDoctors();
