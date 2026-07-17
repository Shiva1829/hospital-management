import { Server } from "socket.io";

let io;

// Store connected users
const connectedUsers = new Map();

// =====================================================
// Initialize Socket.IO
// =====================================================

export const initializeSocket = (server) => {

    io = new Server(server, {

        cors: {

            origin: [

                process.env.FRONTEND_URL,

                process.env.DASHBOARD_URL,

                "http://localhost:5173",

                "http://localhost:5174",

                "http://localhost:4000"

            ].filter(Boolean),

            methods: [

                "GET",

                "POST"

            ],

            credentials: true

        }

    });

    io.on("connection", (socket) => {

        console.log("======================================");
        console.log("User Connected");
        console.log("Socket ID :", socket.id);
        console.log("======================================");

        connectedUsers.set(socket.id, {

            connectedAt: new Date()

        });

        // Send number of active users
        io.emit(

            "activeUsers",

            connectedUsers.size

        );

        // Join Room
        socket.on("joinRoom", (room) => {

            socket.join(room);

            console.log(`${socket.id} joined ${room}`);

        });

        // Leave Room
        socket.on("leaveRoom", (room) => {

            socket.leave(room);

            console.log(`${socket.id} left ${room}`);

        });

        // Admin Notification
        socket.on("adminNotification", (data) => {

            io.emit(

                "adminNotification",

                data

            );

        });

        // Disconnect
        socket.on("disconnect", () => {

            connectedUsers.delete(socket.id);

            console.log("======================================");
            console.log("User Disconnected");
            console.log("Socket ID :", socket.id);
            console.log("======================================");

            io.emit(

                "activeUsers",

                connectedUsers.size

            );

        });

    });

};

// =====================================================
// Send General Notification
// =====================================================

export const sendNotification = (notification) => {

    if (!io) return;

    io.emit(

        "newNotification",

        notification

    );

};

// =====================================================
// AI Prediction Notification
// =====================================================

export const sendPredictionNotification = (prediction) => {

    if (!io) return;

    io.emit(

        "newPrediction",

        prediction

    );

};

// =====================================================
// Report Upload Notification
// =====================================================

export const sendReportNotification = (report) => {

    if (!io) return;

    io.emit(

        "newReport",

        report

    );

};

// =====================================================
// Send to Specific Room
// =====================================================

export const sendRoomNotification = (

    room,

    data

) => {

    if (!io) return;

    io.to(room).emit(

        "roomNotification",

        data

    );

};

// =====================================================
// Broadcast Dashboard Update
// =====================================================

export const refreshDashboard = () => {

    if (!io) return;

    io.emit(

        "refreshDashboard",

        {

            refresh: true,

            time: new Date()

        }

    );

};

export { io };