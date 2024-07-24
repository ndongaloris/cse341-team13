const databaseModel = require("../models/index").course;
const errorHandler = require("../middleware/errorHandler");
const AppErrorClass = require("../utils/appErrorClass");

/**
 * Retrieves all courses from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getAll = errorHandler.catchAsync(async (req, res, next) => {
  //# swagger tags = ['Courses']

  try {
    const result = await databaseModel
      .find()
      .populate("certificate", "name")
      .populate("degree", "name");

    if (!result || result.length === 0) {
      return next(new AppErrorClass("No courses found", 404));
    }

    res.status(200).json(result);
  } catch (error) {
    console.error(error); // Add logging
    next(error);
  }
});

/**
 * Retrieves a single course from the database by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getSingle = errorHandler.catchAsync(async (req, res, next) => {
  //# swagger tags = ['Courses']

  try {
    const courseId = req.params._id;
    console.log(`Fetching course with ID: ${courseId}`); // Log course ID
    const result = await databaseModel
      .findOne({ _id: courseId })
      .populate("certificate", "name")
      .populate("degree", "name");

    if (!result) {
      return next(new AppErrorClass("No course found with that ID", 404));
    }

    res.status(200).json(result);
  } catch (error) {
    console.error(error); // Add logging
    next(error);
  }
});

/**
 * Creates a new course in the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const createCourse = errorHandler.catchAsync(async (req, res, next) => {
  //# swagger tags = ['Courses']

  try {
    const result = await databaseModel.create({
      _id: req.body._id,
      name: req.body.name,
      code: req.body.code,
      description: req.body.description,
      credit: req.body.credit,
      certificate: req.body.certificate,
      degree: req.body.degree,
      courseType: req.body.courseType, // Fixed here
    });

    if (!result) {
      return next(new AppErrorClass("Failed to create course", 400));
    }

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * Updates a course in the database by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const updateCourse = errorHandler.catchAsync(async (req, res, next) => {
  //# swagger tags = ['Courses']

  try {
    const courseId = req.params._id;
    const newDoc = {};

    if (req.body.name != undefined) newDoc.name = req.body.name;
    if (req.body.code !== undefined) newDoc.code = req.body.code;
    if (req.body.description !== undefined)
      newDoc.description = req.body.description;
    if (req.body.credit !== undefined) newDoc.credit = req.body.credit;
    if (req.body.certificate !== undefined)
      newDoc.certificate = req.body.certificate;
    if (req.body.degree !== undefined) newDoc.degree = req.body.degree;
    if (req.body.courseType !== undefined)
      newDoc.courseType = req.body.courseType; // Fixed here

    const result = await databaseModel.updateOne(
      { _id: courseId },
      { $set: newDoc }
    );

    if (result.nModified === 0) {
      return next(new AppErrorClass("No course found to update", 404));
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * Deletes a course from the database by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const deleteCourse = errorHandler.catchAsync(async (req, res, next) => {
  //# swagger tags = ['Courses']

  try {
    const courseId = req.params._id;
    const result = await databaseModel.deleteOne({ _id: courseId });

    if (!result.deletedCount) {
      return next(new AppErrorClass("No course found to delete", 404));
    }

    res.status(204).json({ message: "Course deleted successfully" });
  } catch (error) {
    next(error);
  }
});

// Exporting the CRUD functions
module.exports = {
  getAll,
  getSingle,
  deleteCourse,
  updateCourse,
  createCourse,
};
