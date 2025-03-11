import User from "../models/user.model.js";

export const createUser = async (data) => {
  if (await User.findOne({ email: data.email })) {
    throw new Error("User already exists");
  }
  return await User.create(data);
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("User is not registered");
  }
  const isValidPassword = await user.isValidPassword(password);
  if (!isValidPassword) {
    throw new Error("Password is invalid");
  }
  return user;
};

export const updateUserDetails = async (email, data) => {
  const user = await User.findOneAndUpdate(
    { email: email },
    { $set: data },
    { new: true, runValidators: true }
  );
  if (!user) {
    throw new Error("User is not registered");
  }
  return user;
};
