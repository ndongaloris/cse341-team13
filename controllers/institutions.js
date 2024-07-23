const databaseModel = require("../models/index").institution;
const Degree = require('../models/index').degree;
const Certificate = require('../models/index').certificate;
const errorHandler = require("../middleware/errorHandler");
const AppErrorClass = require("../utils/appErrorClass");

/**
 * Retrieves all institutions from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getAll = async (req, res,next) => {
  try {
      const result = await databaseModel.find()
    .populate({
      path: 'degrees',
      select: 'degreeCode name type', // Select specific fields from the degree documents
    })
    .populate({
      path: 'certificates',
      populate: {
        path: 'coursesRequired', // Populate courses within certificates
        select: 'name code',
      },
    })
    .exec();

    if (!result || result.length === 0) {
      return next(new AppErrorClass("No institutions found", 404));
    }

    res.status(200).json(result);
  } catch (error) {
    next(new AppErrorClass(error.message, 500));
  }
};

/**
 * Retrieves a single institution from the database by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getSingle = async (req, res, next) => {
  try {
      const institutionId = req.params.id;
    const result = await databaseModel.findById(institutionId)
    .populate({
      path: 'degrees',
      select: 'degreeCode name type', // Select specific fields from the degree documents
    })
    .populate({
      path: 'certificates',
      populate: {
        path: 'coursesRequired', // Populate courses within certificates
        select: 'name code',
      },
    })
    .exec();

    if (!result) {
      return next(new AppErrorClass("No institution found with that ID", 404));
    }

    res.status(200).json(result);
  } catch (error) {
    next(new AppErrorClass(error.message, 500));
  }
};

/**
 * Creates a new institution in the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const createInstitution = async (req, res, next) => {
  try {
    const result = await databaseModel.create({
      institutionCode: req.body.institutionCode,
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
  } catch (error) {
    next(new AppErrorClass(error.message, 500));
  }
};

/**
 * Deletes an institution from the database by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const deleteInstitution = async (req, res, next) => {
  try {
    const institutionId = req.params.id;
    const result = await databaseModel.deleteOne({ _id: institutionId });

    if (result.deletedCount === 0) {
      return next(new AppErrorClass("No institution found to delete", 404));
    }

    res.status(204).json({ message: "Institution deleted successfully", result });
  } catch (error) {
    next(new AppErrorClass(error.message, 500));
  }
};

/**
 * Updates an institution in the database by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const updateInstitution = async (req, res, next) => {
  try {
    const institutionId = req.params.id;
    const newDoc = {};
    if (req.body.institutionCode !== undefined) newDoc.institutionCode = req.body.institutionCode;
    if (req.body.name !== undefined) newDoc.name = req.body.name;
    if (req.body.address !== undefined) newDoc.address = req.body.address;
    if (req.body.description !== undefined) newDoc.description = req.body.description;
    if (req.body.contactInfo !== undefined) newDoc.contactInfo = req.body.contactInfo;
    if (req.body.website !== undefined) newDoc.website = req.body.website;
    if (req.body.website !== undefined) newDoc.website = req.body.website;
    if (req.body.accreditation !== undefined) newDoc.accreditation = req.body.accreditation;
    if (req.body.degrees !== undefined) newDoc.degrees = req.body.degrees;
    if (req.body.certificates !== undefined) newDoc.certificates = req.body.certificates;

    const result = await databaseModel.updateOne(
      { _id: institutionId },
      { $set: newDoc }
    );

    if (result.nModified === 0) {
      return next(new AppErrorClass("No institution found to update", 404));
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    next(new AppErrorClass(error.message, 500));
  }
};

// Exporting the CRUD functions
module.exports = {
  getAll,
  getSingle,
  createInstitution,
  deleteInstitution,
  updateInstitution,
};
