const databaseModel = require("../models/index").certificate;
const errorHandler = require("../middleware/errorHandler");
const AppErrorClass = require("../utils/appErrorClass");

/**
 * Retrieves all certificates from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getAll = async (req, res, next) => {
  const result = await databaseModel.find();

  if (!result) {
    return next(new AppErrorClass("No certificates found", 404));
  }

  res.status(200).json(result);
};

/**
 * Retrieves a single certificate from the database by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getSingle = async (req, res, next) => {
  const certificateId = req.params._id;
  const result = await databaseModel.findOne({ _id: certificateId });

  if (!result) {
    return next(new AppErrorClass("No certificate found with that ID", 404));
  }

  res.status(200).json(result);
};

/**
 * Creates a new certificate in the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const createCertificate = async (req, res, next) => {
  const result = await databaseModel.create({
    _id: req.body._id,
    name: req.body.name,
    description: req.body.description,
    requirement: req.body.requirement,
    degree: req.body.degree,
    courses: req.body.courses
  });

  if (!result) {
    return next(new AppErrorClass("No certificate found to create", 404));
  }

  res.status(201).json(result);
};

/**
 * Updates a certificate in the database by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const updateCertificate = async (req, res, next) => {
  const certificateId = req.params._id;
  const newDoc = {};

  if (req.body.name != undefined) newDoc.name = req.body.name;
  if (req.body.description !== undefined) newDoc.description = req.body.description;
  if (req.body.requirement !== undefined) newDoc.requirement = req.body.requirement;
  if (req.body.degree !== undefined) newDoc.degree = req.body.degree;
  if (req.body.courses !== undefined) newDoc.courses = req.body.courses;

  const result = await databaseModel.updateOne(
    { _id: certificateId },
    { $set: newDoc }
  );

  if (result.nModified === 0) {
    return next(new AppErrorClass("No certificate found to update", 404));
  } else {
    res.status(200).json(result);
  }
};

/**
 * Deletes a certificate from the database by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const deleteCertificate = async (req, res, next) => {
  const certificateId = req.params.id;
  const result = await databaseModel.deleteOne({ _id: certificateId });

  if (!result.deletedCount) {
    throw new AppErrorClass("No certificate found to delete", 404);
  }

  res.status(204).json({ message: "certificate deleted successfully", result });
};

// Exporting the CRUD functions
module.exports = {
  getAll,
  getSingle,
  deleteCertificate,
  updateCertificate,
  createCertificate,
};
