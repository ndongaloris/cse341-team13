const databaseModel = require("../models/index").course;
const errorHandler = require("../middleware/errorHandler");
const AppErrorClass = require("../utils/appErrorClass");

/**
 * Retrieves all courses from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getAll = async (req, res, next) => {
  try {
    const result = await databaseModel.find()
    .populate({
      path: 'certificates', 
      select: 'name' 
    })
    .populate({
      path: 'degree', 
      select: 'name' 
    })
    .exec();

    if (!result || result.length === 0) {
      return next(new AppErrorClass("No courses found", 404));
    }

    res.status(200).json(result);
  } catch (error) {
    console.error(error); // Add logging
    next(error);
  }
};

/**
 * Retrieves a single course from the database by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getSingle = async (req, res, next) => {
  try {
    const courseId = req.params.id;
    const result = await databaseModel.findOne({ _id: courseId })
    .populate({
      path: 'certificates', 
      select: 'name' 
    })
    .populate({
      path: 'degree', 
      select: 'name' 
    })
    .exec();

    if (!result) {
      return next(new AppErrorClass("No course found with that ID", 404));
    }

    res.status(200).json(result);
  } catch (error) {
    console.error(error); // Add logging
    next(error);
  }
};

/**
 * Creates a new course in the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const createCourse = async (req, res, next) => {
  try {
    const result = await databaseModel.create({
      name: req.body.name,
      code: req.body.code,
      description: req.body.description,
      credit: req.body.credit,
      certificates: req.body.certificates,
      degree: req.body.degree,
      courseType: req.body.courseType 
    });

    if (!result) {
      return next(new AppErrorClass("Failed to create course", 400));
    }

    res.status(201).json(result);
  } catch (error) {
    console.error(error); // Add logging
    next(error);
  }
};

/**
 * Updates a course in the database by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const updateCourse = async (req, res, next) => {
  try {
    const courseId = req.params.id;
    const newDoc = {};

    if (req.body.name != undefined) newDoc.name = req.body.name;
    if (req.body.code !== undefined) newDoc.code = req.body.code;
    if (req.body.description !== undefined) newDoc.description = req.body.description;
    if (req.body.credit !== undefined) newDoc.credit = req.body.credit;
    if (req.body.certificates !== undefined) newDoc.certificates = req.body.certificates;
    if (req.body.degree !== undefined) newDoc.degree = req.body.degree;
    if (req.body.courseType !== undefined) newDoc.courseType = req.body.courseType; // Fixed here

    const result = await databaseModel.updateOne(
      { _id: courseId },
      { $set: newDoc }
    );

    if (result.nModified === 0) {
      return next(new AppErrorClass("No course found to update", 404));
    }

    res.status(200).json(result);
  } catch (error) {
    console.error(error); // Add logging
    next(error);
  }
};

/**
 * Deletes a course from the database by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const deleteCourse = async (req, res, next) => {
  try {
    const courseId = req.params.id;
    const result = await databaseModel.deleteOne({ _id: courseId });

    if (!result.deletedCount) {
      return next(new AppErrorClass("No course found to delete", 404));
    }

    res.status(204).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error(error); // Add logging
    next(error);
  }
};

// Exporting the CRUD functions
module.exports = {
  getAll,
  getSingle,
  deleteCourse,
  updateCourse,
  createCourse,
};
