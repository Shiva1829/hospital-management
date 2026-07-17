import dotenv from "dotenv";

// ===========================================
// Load Environment Variables FIRST
// ===========================================

dotenv.config({
  path: "./config/config.env",
});

import app from "./app.js";
import http from "http";
import cloudinary from "cloudinary";
import { initializeSocket } from "./socket/socketServer.js";

// ===========================================
// Cloudinary Configuration
// ===========================================

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ===========================================
// Create HTTP Server
// ===========================================

const server = http.createServer(app);

// ===========================================
// Socket.IO
// ===========================================

initializeSocket(server);

// ===========================================
// Port
// ===========================================

const PORT = process.env.PORT || 4000;

// ===========================================
// Start Server
// ===========================================

server.listen(PORT, () => {

  console.clear();

  console.log("=======================================================");
  console.log("🏥 AI HOSPITAL MANAGEMENT SYSTEM");
  console.log("=======================================================");
  console.log(`🚀 Backend : http://localhost:${PORT}`);
  console.log(`🤖 AI Server : http://127.0.0.1:8000`);
  console.log(`🌍 Environment : ${process.env.NODE_ENV}`);

  console.log(
    `☁️ Cloudinary : ${
      process.env.CLOUDINARY_CLOUD_NAME || "Not Configured"
    }`
  );

  console.log(
    `🤖 Gemini API : ${
      process.env.GEMINI_API_KEY
        ? "Loaded Successfully"
        : "Not Loaded"
    }`
  );

  console.log("📡 Socket.IO : Enabled");
  console.log("=======================================================");
  console.log("Backend Started Successfully");
  console.log("=======================================================\n");

});

// ===========================================
// Process Events
// ===========================================

process.on("uncaughtException", (err) => {

  console.log("\n=====================================");
  console.log("UNCAUGHT EXCEPTION");
  console.log("=====================================");
  console.log(err);
  console.log("=====================================\n");

});

process.on("unhandledRejection", (err) => {

  console.log("\n=====================================");
  console.log("UNHANDLED PROMISE REJECTION");
  console.log("=====================================");
  console.log(err);
  console.log("=====================================\n");

});

process.on("SIGINT", () => {

  console.log("\nStopping Backend...");
  process.exit(0);

});

process.on("SIGTERM", () => {

  console.log("\nServer Terminated.");
  process.exit(0);

});