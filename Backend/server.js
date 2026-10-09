// import express from "express";
// import "dotenv/config";
// import cors from "cors";
// import mongoose from "mongoose";
// import chatRoutes from "./routes/chat.js";

// const app = express();
// const PORT = 8080;

// app.use(express.json());
// app.use(cors());

// app.use("/api", chatRoutes);

// app.listen(PORT, () => {
//     console.log(`server running on ${PORT}`);
//     connectDB();
// });

// const connectDB = async() => {
//     try {
//         await mongoose.connect(process.env.MONGODB_URI);
//         console.log("Connected with Database!");
//     } catch(err) {
//         console.log("Failed to connect with Db", err);
//     }
// }


// // app.post("/test", async (req, res) => {
// //     const options = {
// //         method: "POST",
// //         headers: {
// //             "Content-Type": "application/json",
// //             "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
// //         },
// //         body: JSON.stringify({
// //             model: "gpt-4o-mini",
// //             messages: [{
// //                 role: "user",
// //                 content: req.body.message
// //             }]
// //         })
// //     };

// //     try {
// //         const response = await fetch("https://api.openai.com/v1/chat/completions", options);
// //         const data = await response.json();
// //         //console.log(data.choices[0].message.content); //reply
// //         res.send(data.choices[0].message.content);
// //     } catch(err) {
// //         console.log(err);
// //     }
// // });





// import express from "express";
// import "dotenv/config";
// import cors from "cors";
// import mongoose from "mongoose";
// import chatRoutes from "./routes/chat.js";

// const app = express();
// const PORT = 8080;

// // Middleware
// app.use(express.json());
// app.use(cors());

// // Routes
// app.use("/api", chatRoutes);

// // Connect to MongoDB and start server
// const startServer = async () => {
//     try {
//         // Check if MongoDB URI exists
//         if (!process.env.MONGODB_URI) {
//             throw new Error("MONGODB_URI is not defined in .env file");
//         }

//         // Connect to MongoDB
//         await mongoose.connect(process.env.MONGODB_URI);

//         console.log("Connected with Database!");

//         // Start Express server only after DB connection succeeds
//         app.listen(PORT, () => {
//             console.log(`Server running on http://localhost:${PORT}`);
//         });

//     } catch (err) {
//         console.error("Failed to connect with DB:");
//         console.error(err.message);

//         process.exit(1);
//     }
// };

// // Start application
// startServer();


// Test OpenAI API route
// app.post("/test", async (req, res) => {
//     const options = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
//         },
//         body: JSON.stringify({
//             model: "gpt-4o-mini",
//             messages: [
//                 {
//                     role: "user",
//                     content: req.body.message
//                 }
//             ]
//         })
//     };

//     try {
//         const response = await fetch(
//             "https://api.openai.com/v1/chat/completions",
//             options
//         );
//
//         const data = await response.json();
//
//         res.send(data.choices[0].message.content);
//
//     } catch (err) {
//         console.error(err);
//         res.status(500).send("Something went wrong");
//     }
// });





import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

const app = express();
const PORT = 8080;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", chatRoutes);

// MongoDB connection
const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined in .env");
        }

        console.log("Connecting to MongoDB...");

        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 15000,
            connectTimeoutMS: 15000,
            socketTimeoutMS: 45000,
            maxPoolSize: 10,
            minPoolSize: 0,
        });

        console.log("Connected with Database!");

    } catch (error) {
        console.error("Failed to connect with DB:");
        console.error(error);
        process.exit(1);
    }
};

// Start server only after DB connection
const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
};

startServer();