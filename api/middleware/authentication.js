const jwt = require("jsonwebtoken");
const CustomError = require("../errors");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new CustomError.UnauthenticatedError("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      throw new CustomError.UnauthorizedError("Authentication token invalid");
    }
    req.user = user;
    next();
  });
};

const authenticateUser = (req, res, next) => {
  authenticate(req, res, () => {
    if (req.user.userId === req.params.id || req.user.isAdmin) {
      next();
    } else {
      throw new CustomError.UnauthorizedError("You are not alowed to do that!");
    }
  });
};

const authenticateAdmin = (req, res, next) => {
  authenticate(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      throw new CustomError.UnauthorizedError("You are not alowed to do that!");
    }
  });
};

module.exports = {
  authenticate,
  authenticateUser,
  authenticateAdmin,
};
