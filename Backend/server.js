
import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

const app = express();

const PORT = process.env.PORT || 8080;

const allowedOrigins = [
    "http://localhost:5173",
    process.env.CLIENT_URL
].filter(Boolean);

app.use(express.json());

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error("Origin not allowed by CORS"));
    }
}));

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        application: "Zuno"
    });
});

app.use("/api", chatRoutes);

const connectDB = async () => {
    if (!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI is not configured");
    }

    await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 15000,
        connectTimeoutMS: 15000,
        maxPoolSize: 10
    });

    console.log("Connected to MongoDB");
};

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Zuno backend listening on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start Zuno:", error.message);
        process.exit(1);
    }
};

startServer();
