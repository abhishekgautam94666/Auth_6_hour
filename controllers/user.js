import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

// --------Register------------
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User already exits", 400));

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashedPassword });

    sendCookie(user, res, "Register successfully", 201);
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Not register",
    });
  }
};

// --------Login------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    console.log(user);
    if (!user) {
      return next(new ErrorHandler("Invalid Email or password", 400));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new ErrorHandler("Invalid Email or password", 400));
    }

    sendCookie(user, res, `Wecome back,${user.name}`, 200);
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Invalid email or passwor",
    });
  }
};

// --------getAllUser------------
export const getAllUsers = async (req, res) => {};

// --------getUserDeatil------------
export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

//--------logout----
export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", { expires: new Date(Date.now()) })
    .json({
      success: true,
    });
};
