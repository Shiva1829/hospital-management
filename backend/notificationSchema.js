import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({

    title:String,

    message:String,

    type:{
        type:String,
        enum:["success","warning","danger"]
    },

    createdAt:{
        type:Date,
        default:Date.now
    }

});

export default mongoose.model(
    "Notification",
    notificationSchema
);