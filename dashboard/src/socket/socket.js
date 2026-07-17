import { io } from "socket.io-client";

const socket = io("http://localhost:4000", {

  transports: ["websocket"],

  autoConnect: true,

  withCredentials: true,

  reconnection: true,

  reconnectionAttempts: 5,

  reconnectionDelay: 1000,

});

socket.on("connect", () => {

  console.log(
    "✅ Connected to Socket Server:",
    socket.id
  );

});

socket.on("disconnect", () => {

  console.log("❌ Socket Disconnected");

});

socket.on("connect_error", (error) => {

  console.error(
    "Socket Connection Error:",
    error.message
  );

});

export default socket;