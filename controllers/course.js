const databaseModel = require("../models/index").course;
const errorHandler = require("../middleware/errorHandler");
const AppErrorClass = require("../utils/appErrorClass");

/**
 * Retrieves all courses from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getAll = errorHandler.catchAsync(async (req, res, next) => {
  const result = await databaseModel.find().populate('certificate degree');

  if (!result) {
    return next(new AppErrorClass("No courses found", 404));
  }

  res.status(200).json(result);
});

/**
 * Retrieves a single course from the database by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getSingle = errorHandler.catchAsync(async (req, res, next) => {
  const courseId = req.params._id;
  const result = await databaseModel.findOne({ _id: courseId });

  if (!result) {
    return next(new AppErrorClass("No course found with that ID", 404));
  }

  res.status(200).json(result);
});

/**
 * Creates a new course in the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const createCourse = errorHandler.catchAsync(async (req, res, next) => {
  const result = await databaseModel.create({
    _id: req.params._id,
    name: req.body.name,
    code: req.body.code,
    description: req.body.description,
    credit: req.body.credit,
    certificate: req.body.certificate,
    degree: req.body.degree,
    courseType: req.body.type

  });

  if (!result) {
    return next(new AppErrorClass("No course found to create", 404));
  }

  res.status(201).json(result);
});

/**
 * Updates a course in the database by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const updateCourse = errorHandler.catchAsync(async (req, res, next) => {
  const courseId = req.params._id;
  const newDoc = {};

  if (req.body.name != undefined) newDoc.name = req.body.name;
  if (req.body.code !== undefined) newDoc.code = req.body.code;
  if (req.body.description !== undefined) newDoc.description = req.body.description;
  if (req.body.credit !== undefined) newDoc.credit = req.body.credit;
  if (req.body.certificate !== undefined) newDoc.certificate = req.body.certificate;
  if (req.body.degree !== undefined) newDoc.degree = req.body.degree;
  if (req.body.type !== undefined) newDoc.courseType = req.body.type;

  const result = await databaseModel.updateOne(
    { _id: courseId },
    { $set: newDoc }
  );

  if (result.nModified === 0) {
    return next(new AppErrorClass("No course found to update", 404));
  } else {
    res.status(200).json(result);
  }
});

/**
 * Deletes a course from the database by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const deleteCourse = errorHandler.catchAsync(async (req, res, next) => {
  const courseId = req.params._id;
  const result = await databaseModel.deleteOne({ _id: courseId });

  if (!result.deletedCount) {
    throw new AppErrorClass("No course found to delete", 404);
  }

  res.status(204).json({ message: "course deleted successfully", result });
});

// Exporting the CRUD functions
module.exports = {
  getAll,
  getSingle,
  deleteCourse,
  updateCourse,
  createCourse,
};
