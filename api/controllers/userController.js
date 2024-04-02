const User = require("../models/User");
const CustomError = require("../errors");

const getAllUsers = async (req, res) => {
  const users = await User.find({ isAdmin: false }).select("-password");
  res.status(200).json(users);
};

const getUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`);
  }
  res.status(200).json({ user });
};

const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`);
  }
  res.status(200).json({ msg: "User has been deleted!" });
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError("Please provide both values");
  }
  const user = await User.findOne({ _id: req.params.id });
  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid invalid old password.");
  }
  user.password = newPassword;
  await user.save();

  res.status(200).json({ msg: "Password has been updated." });
};

module.exports = {
  getAllUsers,
  getUser,
  deleteUser,
  updateUserPassword,
};
