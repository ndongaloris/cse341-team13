const User = require("../models/index").user;
const errorHandler = require("../middleware/errorHandler");
const AppErrorClass = require("../utils/appErrorClass");

//* ******************** CONTROLLER FUNCTIONS *************** */

/**
 * * Retrieves all users from the database.
 * * @param {Object} req - The request object.
 * * @param {Object} res - The response object.
 * * @param {Object} next - The next middleware function.
 *
 */
const getAllUsers = async (req, res, next) => {
  //# swagger.tags = ['User']

  const result = await User.find({});

  if (!result) {
    return next(new AppErrorClass("No users found", 404));
  }

  res.status(200).json({
    status: "success",
    results: result.length,
    data: result,
  });
};

/**
 * * Retrieves a single user from the database by ID.
 * * @param {Object} req - The request object.
 * * @param {Object} res - The response object.
 * * @param {Object} next - The next middleware function.
 *
 */
const getSingleUser = async (req, res, next) => {
  //# swagger.tags = ['User']

  const userId = req.params.id;
  const result = await User.findById(userId);

  if (!result) {
    return next(new AppErrorClass("No user found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: result,
  });
};

/**
 * * Creates a new user in the database.
 * * @param {Object} req - The request object.
 * * @param {Object} res - The response object.
 * * @param {Object} next - The next middleware function.
 *
 */
const createUser = async (req, res, next) => {
  //# swagger.tags = ['User']
  let feedback;

  const newUser = {
    _id: req.body._id,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    role: ["admin", "instructor"].includes(req.body.role)
      ? "student"
      : req.body.role || "student",
  };

  if (["admin", "instructor"].includes(req.body.role)) {
    feedback = {
      status: "failed",
      providedRole: req.body.role,
      appliedRole: "student",
      message: "You cannot create an admin or instructor role as a student",
    };
  }

  const result = await User.create(newUser);

  res.status(201).json({
    status: "success",
    data: result,
    feedback,
  });
};

/**
 * * Updates a user in the database by ID.
 * * This controller is for admin only
 * * @param {Object} req - The request object.
 * * @param {Object} res - The response object.
 * * @param {Object} next - The next middleware function.
 *
 */
const updateUser = async (req, res, next) => {
  //# swagger.tags = ['User']

  const userId = req.params.id;
  // const newDoc = { ...req.body };
  const newDoc = {
    _id: req.body._id,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role
  }

  console.log("req.body", req.body);
  console.log("newDoc", newDoc);

  const result = await User.findByIdAndUpdate(userId, newDoc, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    return next(new AppErrorClass("No user found to update", 404));
  } else {
    res.status(200).json({
      status: "success",
      data: result,
    });
  }
};

/**
 * * Updates a user in the database by ID.
 * * This controller is for all users
 * * @param {Object} req - The request object.
 * * @param {Object} res - The response object.
 * * @param {Object} next - The next middleware function.
 *
 */
const updateMe = async (req, res, next) => {
  //# swagger.tags = ['User']

  let feedback;
  const userId = req.user.id;

  if (["admin", "instructor"].includes(req.body.role)) {
    feedback = {
      status: "fail",
      providedRole: req.body.role,
      appliedRole: "student",
      message: "You cannot change your role to an admin or instructor",
    };
  }

  const newDoc = {
    ...req.body,
    role: ["admin", "instructor"].includes(req.body.role)
      ? "student"
      : req.body.role || "student",
  };

  const result = await User.findByIdAndUpdate(userId, newDoc, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    return next(new AppErrorClass("No user found to update", 404));
  } else {
    res.status(200).json({
      status: "success",
      data: result,
      feedback,
    });
  }
};

/**
 * * Deletes a user from the database by ID.
 * * @param {Object} req - The request object.
 * * @param {Object} res - The response object.
 * * @param {Object} next - The next middleware function.
 *
 */
const deleteUser = async (req, res, next) => {
  //# swagger.tags = ['User']

  const userId = req.params.id;
  const result = await User.findByIdAndDelete(userId);

  if (!result) {
    return next(new AppErrorClass("No user found to delete", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  updateMe,
};
