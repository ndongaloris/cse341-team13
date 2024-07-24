const databaseModel = require("../models/index").institution;
const errorHandler = require("../middleware/errorHandler");
const AppErrorClass = require("../utils/appErrorClass");

/**
 * Retrieves all institutions from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getAll = errorHandler.catchAsync(async (req, res) => {
  //# swagger tags = ['Institutions']

  const result = await databaseModel.find();

  if (!result) {
    return next(new AppErrorClass("No institutions found", 404));
  }

  res.status(200).json(result);
});

/**
 * Retrieves a single institution from the database by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getSingle = errorHandler.catchAsync(async (req, res) => {
  //# swagger tags = ['Institutions']

  const institutionId = req.params.id;
  const result = await databaseModel.findOne({ _id: institutionId });

  if (!result) {
    return next(new AppErrorClass("No institution found with that ID", 404));
  }

  res.status(200).json(result);
});

/**
 * Creates a new institution in the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const createInstitution = errorHandler.catchAsync(async (req, res, next) => {
  //# swagger tags = ['Institutions']

  const result = await databaseModel.create({
    _id: req.body._id,
    name: req.body.name,
    address: req.body.address,
    description: req.body.description,
    contactInfo: req.body.contactInfo,
    website: req.body.website,
    accreditation: req.body.accreditation,
    degrees: req.body.degrees,
    certificates: req.body.certificates,
  });

  res.status(201).json(result);
});

/**
 * Deletes an institution from the database by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const deleteInstitution = errorHandler.catchAsync(async (req, res, next) => {
  //# swagger tags = ['Institutions']

  const institutionId = req.params.id;
  const result = await databaseModel.deleteOne({ _id: institutionId });

  if (result.deletedCount === 0) {
    return next(new AppErrorClass("No institution found to delete", 404));
  }

  res.status(204).json({ message: "Institution deleted successfully", result });
});

/**
 * Updates an institution in the database by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const updateInstitution = errorHandler.catchAsync(async (req, res, next) => {
  //# swagger tags = ['Institutions']

  const institutionId = req.params.id;
  const newDoc = {};

  if (req.body.name !== undefined) newDoc.name = req.body.name;
  if (req.body.address !== undefined) newDoc.address = req.body.address;
  if (req.body.description !== undefined)
    newDoc.description = req.body.description;
  if (req.body.dateOfCreation !== undefined)
    newDoc.dateOfCreation = req.body.dateOfCreation;

  const result = await databaseModel.updateOne(
    { _id: institutionId },
    { $set: newDoc }
  );

  if (result.nModified === 0) {
    return next(new AppErrorClass("No institution found to update", 404));
  } else {
    res.status(200).json(result);
  }
});

// Exporting the CRUD functions
module.exports = {
  getAll,
  getSingle,
  createInstitution,
  deleteInstitution,
  updateInstitution,
};
