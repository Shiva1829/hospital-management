import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

export const patientRegister = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !password
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const isRegistered = await User.findOne({ email });

  if (isRegistered) {
    return next(new ErrorHandler("User already Registered!", 400));
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    role: "Patient",
  });

  generateToken(user, "User Registered Successfully!", 200, res);
});

export const login = catchAsyncErrors(async (req, res, next) => {

  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  let user = await User.findOne({ email }).select("+password");

  console.log("==================================");
  console.log("USER FOUND :", user ? user.email : "NOT FOUND");
  console.log("==================================");

  // ===========================================
  // AUTO CREATE DEFAULT ADMIN
  // ===========================================

  if (
    !user &&
    email === "admin@hospital.com" &&
    password === "admin1234" &&
    role === "Admin"
  ) {
    console.log("Creating Default Admin...");

    await User.create({
      firstName: "Hospital",
      lastName: "Administrator",
      email: "admin@hospital.com",
      phone: "9876543210",
      dob: new Date("1995-01-01"),
      gender: "Male",
      password: "admin1234",
      role: "Admin",
    });

    user = await User.findOne({
      email: "admin@hospital.com",
    }).select("+password");
  }

  if (!user) {
    return next(new ErrorHandler("Invalid Email Or Password!", 400));
  }

  const isPasswordMatch = await user.comparePassword(password);
  console.log("Password Match :", isPasswordMatch);

  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid Email Or Password!", 400));
  }

  if (role !== user.role) {
    return next(new ErrorHandler("User Not Found With This Role!", 400));
  }

  generateToken(user, "Login Successfully!", 200, res);
});

export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !password
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const isRegistered = await User.findOne({ email });

  if (isRegistered) {
    return next(
      new ErrorHandler("Admin With This Email Already Exists!", 400)
    );
  }

  const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    role: "Admin",
  });

  res.status(200).json({
    success: true,
    message: "New Admin Registered",
    admin,
  });
});

export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {

  if (!req.files || !req.files.docAvatar) {
    return next(new ErrorHandler("Doctor avatar is required!", 400));
  }

  const docAvatar = req.files.docAvatar;

  const allowedFormats = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp"
  ];

  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return next(
      new ErrorHandler(
        "Only JPG, JPEG, PNG and WEBP images are allowed.",
        400
      )
    );
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    doctorDepartment,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !password ||
    !doctorDepartment
  ) {
    return next(
      new ErrorHandler("Please fill all required fields.", 400)
    );
  }

  const existingDoctor = await User.findOne({ email });

  if (existingDoctor) {
    return next(
      new ErrorHandler(
        "Doctor already exists with this email.",
        400
      )
    );
  }

  const uploadResult = await cloudinary.uploader.upload(
    docAvatar.tempFilePath,
    {
      folder: "AI_Hospital/Doctors",
      resource_type: "image",
    }
  );

  if (!uploadResult) {
    return next(
      new ErrorHandler(
        "Failed to upload doctor avatar.",
        500
      )
    );
  }

  const doctor = await User.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    role: "Doctor",
    doctorDepartment,
    docAvatar: {
      public_id: uploadResult.public_id,
      url: uploadResult.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: "Doctor registered successfully.",
    doctor,
  });
});

export const getAllDoctors = catchAsyncErrors(async (req, res) => {

  const doctors = await User.find({ role: "Doctor" })
    .select("-password")
    .sort({ firstName: 1 });

  res.status(200).json({
    success: true,
    totalDoctors: doctors.length,
    doctors,
  });
});

export const logoutAdmin = catchAsyncErrors(async (req, res) => {
  res.clearCookie("adminToken", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  res.status(200).json({
    success: true,
    message: "Admin logged out successfully.",
  });
});

export const logoutPatient = catchAsyncErrors(async (req, res) => {
  res.clearCookie("patientToken", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  res.status(200).json({
    success: true,
    message: "Patient logged out successfully.",
  });
});

export const getUserDetails = catchAsyncErrors(async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});