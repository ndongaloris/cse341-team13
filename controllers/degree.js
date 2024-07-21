const databaseModel = require("../models/index").degree;
const errorHandler = require("../middleware/errorHandler");
const AppErrorClass = require("../utils/appErrorClass");

/**
 * Retrieves all degrees from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getAll = async (req, res, next) => {
  const result = await databaseModel.find();

  if (!result) {
    return next(new AppErrorClass("No degrees found", 404));
  }

  res.status(200).json(result);
};

/**
 * Retrieves a single degree from the database by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getSingle = async (req, res, next) => {
  const degreeId = req.params.id;
  const result = await databaseModel.findOne({ _id: degreeId });

  if (!result) {
    return next(new AppErrorClass("No degree found with that ID", 404));
  }

  res.status(200).json(result);
};

/**
 * Creates a new degree in the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const createDegree = async (req, res, next) => {
  const result = await databaseModel.create({
    _id: req.body._id,
    name: req.body.name,
    institutions: req.body.institutions,
    certificates: req.body.certificates,
    type: req.body.type,
    description: req.body.description,
    potentialEmployment: req.body.potentialEmployment,
    duration: req.body.duration,
    creditsRequired: req.body.creditsRequired,
    level: req.body.level,
  });

  if (!result) {
    return next(new AppErrorClass("No degree found to create", 404));
  }

  res.status(201).json(result);
};

/**
 * Updates a degree in the database by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const updateDegree = async (req, res, next) => {
  const degreeId = req.params.id;
  const newDoc = {};

  if (req.body.name != undefined) newDoc.name = req.body.name;
  if (req.body.institution !== undefined)
    newDoc.institution = req.body.institution;
  if (req.body.type !== undefined) newDoc.type = req.body.type;
  if (req.body.description !== undefined)
    newDoc.description = req.body.description;
  if (req.body.potentialEmployment !== undefined)
    newDoc.potentialEmployment = req.body.potentialEmployment;

  const result = await databaseModel.updateOne(
    { _id: degreeId },
    { $set: newDoc }
  );

  if (result.nModified === 0) {
    return next(new AppErrorClass("No degree found to update", 404));
  } else {
    res.status(200).json(result);
  }
};

/**
 * Deletes a degree from the database by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const deleteDegree = async (req, res, next) => {
  const degreeId = req.params.id;
  const result = await databaseModel.deleteOne({ _id: degreeId });

  if (!result.deletedCount) {
    throw new AppErrorClass("No degree found to delete", 404);
  }

  res.status(204).json({ message: "Degree deleted successfully", result });
};

// Exporting the CRUD functions
module.exports = {
  getAll,
  getSingle,
  deleteDegree,
  updateDegree,
  createDegree,
};
