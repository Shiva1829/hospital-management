import { io } from "socket.io-client";

const BACKEND_URL = "https://hospital-backend-28d9.onrender.com";

const socket = io(BACKEND_URL, {
  transports: ["websocket", "polling"],
  autoConnect: true,
  withCredentials: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

socket.on("connect", () => {
  console.log("✅ Connected to Socket Server:", socket.id);
});

socket.on("disconnect", () => {
  console.log("❌ Socket Disconnected");
});

socket.on("connect_error", (error) => {
  console.error("Socket Connection Error:", error.message);
});

export default socket;