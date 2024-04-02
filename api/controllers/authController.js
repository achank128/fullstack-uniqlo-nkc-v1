const User = require("../models/User");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const { email, password, birthday, gender } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new BadRequestError("Email already exists");
  }
  const user = await User.create({ email, password, birthday, gender });
  const token = user.createJWT();
  res.status(201).json({
    user: {
      userId: user._id,
      email: user._doc.email,
      birthday: user._doc.birthday,
      gender: user._doc.gender,
    },
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Email does not exist.");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Incorrect password.");
  }

  const token = user.createJWT();
  res.status(200).json({
    user: {
      userId: user._id,
      email: user._doc.email,
      birthday: user._doc.birthday,
      gender: user._doc.gender,
      isAdmin: user._doc.isAdmin,
    },
    token,
  });
};

const logout = async (req, res) => {
  res.status(201).json("logout");
};

module.exports = {
  register,
  login,
  logout,
};
