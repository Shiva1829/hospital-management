import mongoose from "mongoose";

// ============================================
// MongoDB Connection
// ============================================

export const dbConnection = async () => {

  try {

    const connection = await mongoose.connect(

      process.env.MONGO_URI,

      {

        dbName: process.env.DB_NAME || "hospitalDB",

      }

    );

    console.log("========================================");
    console.log("MongoDB Connected Successfully");
    console.log("========================================");
    console.log(
      `Host : ${connection.connection.host}`
    );

    console.log(
      `Database : ${connection.connection.name}`
    );

    console.log("========================================\n");

  }

  catch (error) {

    console.error("\n========================================");

    console.error("MongoDB Connection Failed");

    console.error("========================================");

    console.error(error.message);

    console.error("========================================\n");

    process.exit(1);

  }

};

// ============================================
// MongoDB Events
// ============================================

mongoose.connection.on("connected", () => {

  console.log("MongoDB Event : Connected");

});

mongoose.connection.on("disconnected", () => {

  console.log("MongoDB Event : Disconnected");

});

mongoose.connection.on("reconnected", () => {

  console.log("MongoDB Event : Reconnected");

});

mongoose.connection.on("error", (err) => {

  console.error("MongoDB Error :", err.message);

});