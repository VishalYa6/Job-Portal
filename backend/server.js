import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import connectDB from "./config/db.js";
import jobRoutes from "./routes/job.routes.js";
import applicationRoutes from "./routes/application.routes.js";

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "https://job-portal-five-mocha.vercel.app/", // Adjust this to your frontend URL
  credentials: true
}));

// Routes
app.use("/api/auth", authRoutes);


//Job routes
app.use("/api/jobs", jobRoutes);

//Application routes

app.use("/api/applications", applicationRoutes);    

// Start the server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});