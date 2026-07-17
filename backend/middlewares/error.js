class ErrorHandler extends Error {

    constructor(message, statusCode) {

        super(message);

        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor);

    }

}

// =====================================================
// Global Error Middleware
// =====================================================

export const errorMiddleware = (err, req, res, next) => {

    let error = { ...err };

    error.message = err.message;

    error.statusCode = err.statusCode || 500;

    // ==========================================
    // Duplicate MongoDB Key
    // ==========================================

    if (err.code === 11000) {

        const field = Object.keys(err.keyValue)[0];

        error = new ErrorHandler(

            `${field} already exists.`,

            400

        );

    }

    // ==========================================
    // Invalid ObjectId
    // ==========================================

    if (err.name === "CastError") {

        error = new ErrorHandler(

            `Invalid ${err.path}.`,

            400

        );

    }

    // ==========================================
    // JWT Invalid
    // ==========================================

    if (err.name === "JsonWebTokenError") {

        error = new ErrorHandler(

            "Invalid authentication token.",

            401

        );

    }

    // ==========================================
    // JWT Expired
    // ==========================================

    if (err.name === "TokenExpiredError") {

        error = new ErrorHandler(

            "Authentication token has expired.",

            401

        );

    }

    // ==========================================
    // Mongoose Validation
    // ==========================================

    if (err.name === "ValidationError") {

        const message = Object.values(err.errors)

            .map((val) => val.message)

            .join(", ");

        error = new ErrorHandler(

            message,

            400

        );

    }

    // ==========================================
    // JSON Syntax Error
    // ==========================================

    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {

        error = new ErrorHandler(

            "Invalid JSON request.",

            400

        );

    }

    // ==========================================
    // Response
    // ==========================================

    res.status(error.statusCode || 500).json({

        success: false,

        message: error.message || "Internal Server Error",

        stack:

            process.env.NODE_ENV === "development"

                ? err.stack

                : undefined,

    });

};

export default ErrorHandler;