import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(

    {

        firstName: {

            type: String,

            required: [true, "First Name Is Required"],

            minlength: 3,

            trim: true

        },

        lastName: {

            type: String,

            required: [true, "Last Name Is Required"],

            minlength: 3,

            trim: true

        },

        email: {

            type: String,

            required: [true, "Email Is Required"],

            unique: true,

            lowercase: true,

            trim: true,

            validate: [validator.isEmail, "Please Enter Valid Email"]

        },

        phone: {

            type: String,

            required: [true, "Phone Number Is Required"],

            unique: true,

            trim: true,

            match: [

                /^[6-9]\d{9}$/,

                "Please Enter Valid Indian Mobile Number"

            ]

        },

        dob: {

            type: Date,

            required: true

        },

        gender: {

            type: String,

            enum: [

                "Male",

                "Female",

                "Other"

            ],

            required: true

        },

        password: {

            type: String,

            required: true,

            minlength: 8,

            select: false

        },

        role: {

            type: String,

            enum: [

                "Patient",

                "Doctor",

                "Admin"

            ],

            required: true

        },

        address: {

            type: String,

            default: ""

        },

        emergencyContact: {

            type: String,

            default: ""

        },

        doctorDepartment: {

            type: String,

            default: ""

        },

        specialization: {

            type: String,

            default: ""

        },

        qualification: {

            type: String,

            default: ""

        },

        experience: {

            type: Number,

            default: 0

        },

        profileImage: {

            public_id: {

                type: String,

                default: ""

            },

            url: {

                type: String,

                default: ""

            }

        },

        docAvatar: {

            public_id: {

                type: String,

                default: ""

            },

            url: {

                type: String,

                default: ""

            }

        },

        accountStatus: {

            type: String,

            enum: [

                "Active",

                "Inactive"

            ],

            default: "Active"

        },

        lastLogin: {

            type: Date,

            default: null

        }

    },

    {

        timestamps: true

    }

);

// ===========================
// Hash Password
// ===========================

userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {

        return next();

    }

    this.password = await bcrypt.hash(

        this.password,

        10

    );

    next();

});

// ===========================
// Compare Password
// ===========================

userSchema.methods.comparePassword = async function (

    enteredPassword

) {

    return await bcrypt.compare(

        enteredPassword,

        this.password

    );

};

// ===========================
// Generate JWT
// ===========================

userSchema.methods.generateJsonWebToken = function () {

    return jwt.sign(

        {

            id: this._id,

            role: this.role

        },

        process.env.JWT_SECRET_KEY,

        {

            expiresIn: process.env.JWT_EXPIRES

        }

    );

};

export const User =

    mongoose.models.User ||

    mongoose.model(

        "User",

        userSchema

    );