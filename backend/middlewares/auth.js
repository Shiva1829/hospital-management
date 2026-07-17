import jwt from "jsonwebtoken";

import { User } from "../models/userSchema.js";

import { catchAsyncErrors } from "./catchAsyncErrors.js";

import ErrorHandler from "./error.js";

// ======================================================
// Verify JWT Token
// ======================================================

const verifyToken = async (token) => {

    const decoded = jwt.verify(

        token,

        process.env.JWT_SECRET_KEY

    );

    const user = await User.findById(decoded.id).select("-password");

    return user;

};

// ======================================================
// Admin Authentication
// ======================================================

export const isAdminAuthenticated = catchAsyncErrors(

    async (req, res, next) => {

        const token = req.cookies.adminToken;

        if (!token) {

            return next(

                new ErrorHandler(

                    "Admin authentication required.",

                    401

                )

            );

        }

        const user = await verifyToken(token);

        if (!user) {

            return next(

                new ErrorHandler(

                    "Admin not found.",

                    404

                )

            );

        }

        if (user.role !== "Admin") {

            return next(

                new ErrorHandler(

                    `${user.role} is not authorized.`,

                    403

                )

            );

        }

        req.user = user;

        next();

    }

);

// ======================================================
// Patient Authentication
// ======================================================

export const isPatientAuthenticated = catchAsyncErrors(

    async (req, res, next) => {

        const token = req.cookies.patientToken;

        if (!token) {

            return next(

                new ErrorHandler(

                    "Patient authentication required.",

                    401

                )

            );

        }

        const user = await verifyToken(token);

        if (!user) {

            return next(

                new ErrorHandler(

                    "Patient not found.",

                    404

                )

            );

        }

        if (user.role !== "Patient") {

            return next(

                new ErrorHandler(

                    `${user.role} is not authorized.`,

                    403

                )

            );

        }

        req.user = user;

        next();

    }

);

// ======================================================
// Doctor Authentication
// ======================================================

export const isDoctorAuthenticated = catchAsyncErrors(

    async (req, res, next) => {

        const token = req.cookies.adminToken;

        if (!token) {

            return next(

                new ErrorHandler(

                    "Doctor authentication required.",

                    401

                )

            );

        }

        const user = await verifyToken(token);

        if (!user) {

            return next(

                new ErrorHandler(

                    "Doctor not found.",

                    404

                )

            );

        }

        if (user.role !== "Doctor") {

            return next(

                new ErrorHandler(

                    `${user.role} is not authorized.`,

                    403

                )

            );

        }

        req.user = user;

        next();

    }

);

// ======================================================
// Role Authorization
// ======================================================

export const isAuthorized = (...roles) => {

    return (req, res, next) => {

        if (!req.user) {

            return next(

                new ErrorHandler(

                    "Authentication required.",

                    401

                )

            );

        }

        if (!roles.includes(req.user.role)) {

            return next(

                new ErrorHandler(

                    `${req.user.role} is not allowed to access this resource.`,

                    403

                )

            );

        }

        next();

    };

};