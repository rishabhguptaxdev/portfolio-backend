const User = require("../models/user");
const CustomError = require("../utils/CustomErrors");
const sendToken = require("../utils/sendTOken");

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return next(new CustomError("Name, email or password is missing", 400));
    }

    if (email && (await User.findOne({ email }))) {
      return res.status(401).send("User already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    sendToken(user, res);
  } catch (error) {
    console.error("Something went wrong while signup", error);
    throw error;
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new CustomError("Email or Password missing", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new CustomError("User is not registered", 400));
    }

    const isValidPassword = await user.isValidPassword(password);

    if (!isValidPassword) {
      return next(new CustomError("Password is inncorrect", 400));
    }

    sendToken(user, res);
  } catch (error) {
    console.error("Something went wrong while login", error);
    throw error;
  }
};
