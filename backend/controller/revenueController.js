import Revenue from "../models/revenueSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";

// ======================================================
// Add Revenue
// ======================================================

export const addRevenue = catchAsyncErrors(async (req, res, next) => {

    const {

        patientName,

        doctorName,

        amount,

        paymentMethod,

        description

    } = req.body;

    if (

        !patientName ||

        !doctorName ||

        !amount

    ) {

        return next(

            new ErrorHandler(

                "Patient name, doctor name and amount are required.",

                400

            )

        );

    }

    const revenue = await Revenue.create({

        patientName,

        doctorName,

        amount,

        paymentMethod,

        description

    });

    return res.status(201).json({

        success: true,

        message: "Revenue added successfully.",

        revenue

    });

});


// ======================================================
// Get Revenue Statistics
// ======================================================

export const totalRevenue = catchAsyncErrors(async (req, res, next) => {

    // Total Revenue

    const totalResult = await Revenue.aggregate([

        {

            $group: {

                _id: null,

                totalRevenue: {

                    $sum: "$amount"

                }

            }

        }

    ]);

    const totalRevenue =

        totalResult.length > 0

            ? totalResult[0].totalRevenue

            : 0;

    // Monthly Revenue

    const monthlyRevenue = await Revenue.aggregate([

        {

            $group: {

                _id: {

                    year: {

                        $year: "$createdAt"

                    },

                    month: {

                        $month: "$createdAt"

                    }

                },

                total: {

                    $sum: "$amount"

                }

            }

        },

        {

            $sort: {

                "_id.year": 1,

                "_id.month": 1

            }

        }

    ]);

    // Today's Revenue

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const todayRevenue = await Revenue.aggregate([

        {

            $match: {

                createdAt: {

                    $gte: today

                }

            }

        },

        {

            $group: {

                _id: null,

                total: {

                    $sum: "$amount"

                }

            }

        }

    ]);

    return res.status(200).json({

        success: true,

        totalRevenue,

        todayRevenue:

            todayRevenue.length > 0

                ? todayRevenue[0].total

                : 0,

        monthlyRevenue

    });

});


// ======================================================
// Get All Revenue Records
// ======================================================

export const getRevenue = catchAsyncErrors(async (req, res, next) => {

    const revenue = await Revenue.find()

        .sort({

            createdAt: -1

        });

    return res.status(200).json({

        success: true,

        totalRecords: revenue.length,

        revenue

    });

});


// ======================================================
// Delete Revenue
// ======================================================

export const deleteRevenue = catchAsyncErrors(async (req, res, next) => {

    const revenue = await Revenue.findById(req.params.id);

    if (!revenue) {

        return next(

            new ErrorHandler(

                "Revenue record not found.",

                404

            )

        );

    }

    await revenue.deleteOne();

    return res.status(200).json({

        success: true,

        message: "Revenue deleted successfully."

    });

});