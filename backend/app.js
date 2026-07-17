import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import fileUpload from "express-fileupload";

import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";

// ===========================================
// Routers
// ===========================================

import messageRouter from "./router/messageRouter.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";

import patientRouter from "./router/patientRouter.js";
import reportRouter from "./router/reportRouter.js";

import aiRouter from "./router/aiRouter.js";
import aiPredictionRouter from "./router/aiPredictionRouter.js";

import notificationRouter from "./router/notificationRouter.js";
import revenueRouter from "./router/revenueRouter.js";

import pdfRouter from "./router/pdfRouter.js";
import excelRouter from "./router/excelRouter.js";

import chatbotRouter from "./router/chatbotRouter.js";
import aiReportRouter from "./router/aiReportRouter.js";

// ===========================================
// Environment Variables
// ===========================================

config({
  path: "./config/config.env",
});

const app = express();

// ===========================================
// Database Connection
// ===========================================

dbConnection();

// ===========================================
// CORS
// ===========================================

app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      process.env.DASHBOARD_URL,
      "http://localhost:5173",
      "http://localhost:3000",
    ].filter(Boolean),

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

// ===========================================
// Middlewares
// ===========================================

app.use(cookieParser());

app.use(
  express.json({
    limit: "20mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "20mb",
  })
);

// ===========================================
// File Upload (required for docAvatar, reports, etc.)
// ===========================================

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// ===========================================
// Static Upload Folder
// ===========================================

app.use(
  "/uploads",
  express.static(
    path.join(process.cwd(), "uploads")
  )
);

// ===========================================
// Health Check
// ===========================================

app.get("/", (req, res) => {

  res.status(200).json({

    success: true,

    application:
      "AI Hospital Management System",

    backend: "Running",

    aiServer:
      "http://127.0.0.1:8000",

    version: "1.0.0",

  });

});

// ===========================================
// Core APIs
// ===========================================

app.use(
  "/api/v1/message",
  messageRouter
);

app.use(
  "/api/v1/user",
  userRouter
);

app.use(
  "/api/v1/appointment",
  appointmentRouter
);

// ===========================================
// Patient APIs
// ===========================================

app.use(
  "/api/v1/patient",
  patientRouter
);

// ===========================================
// Reports
// ===========================================

app.use(
  "/api/v1/report",
  reportRouter
);

app.use(
  "/api/v1/aireports",
  aiReportRouter
);

// ===========================================
// AI Modules
// ===========================================

app.use(
  "/api/v1/ai",
  aiRouter
);

// ===========================================
// AI Prediction History
// ===========================================

app.use(
  "/api/v1/predictions",
  aiPredictionRouter
);

// ===========================================
// Notifications
// ===========================================

app.use(
  "/api/v1/notification",
  notificationRouter
);

// ===========================================
// Revenue
// ===========================================

app.use(
  "/api/v1/revenue",
  revenueRouter
);

// ===========================================
// PDF Reports
// ===========================================

app.use(
  "/api/v1/pdf",
  pdfRouter
);

// ===========================================
// Excel Reports
// ===========================================

app.use(
  "/api/v1/excel",
  excelRouter
);

// ===========================================
// AI Chatbot
// ===========================================

app.use(
  "/api/v1/chatbot",
  chatbotRouter
);

// ===========================================
// Error Middleware
// ===========================================

app.use(errorMiddleware);

export default app;