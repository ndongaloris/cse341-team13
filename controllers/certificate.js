const databaseModel = require("../models/index").certificate;
const errorHandler = require("../middleware/errorHandler");
const AppErrorClass = require("../utils/appErrorClass");

/**
 * Retrieves all certificates from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getAll = async (req, res, next) => {
  try {
    const result = await databaseModel.find()
    .populate({
      // path: "degree",
      path: "institution",
      select: "institutionCode name"
    })
    .populate({
      path: "coursesRequired",
      select: "code name description"
    })
    .exec();

    console.log("Certificate:", result);

    if (!result) {
      return next(new AppErrorClass("No certificates found", 404));
    }

    res.status(200).json(result);
  } catch (error) {
    console.error(error); // Add logging
    next(error);
  }    
};

/**
 * Retrieves a single certificate from the database by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getSingle = async (req, res, next) => {
  try {
    const certificateId = req.params.id;
    const result = await databaseModel.findOne({ _id: certificateId })
    .populate({
      // path: "degree",
      path: "institution",
      select: "name"
    })
    .populate({
      path: "coursesRequired",
      select: "code name description"
    })
    .exec();

    if (!result) {
      return next(new AppErrorClass("No certificate found with that ID", 404));
    }

    res.status(200).json(result);
} catch (error) {
  console.error(error); // Add logging
  next(error);
}
};

/**
 * Creates a new certificate in the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const createCertificate = async (req, res, next) => {
  try {
    const result = await databaseModel.create({
      certificateCode: req.body.certificateCode,
      name: req.body.name,
      description: req.body.description,
      requirements: req.body.requirements,
      institution: req.body.institution,
      coursesRequired: req.body.coursesRequired
    });

    if (!result) {
      return next(new AppErrorClass("No certificate found to create", 404));
    }

    res.status(201).json(result);
} catch (error) {
  console.error(error); // Add logging
  next(error);
}
};

/**
 * Updates a certificate in the database by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const updateCertificate = async (req, res, next) => {
  try {
    const certificateId = req.params.id;
    const newDoc = {};

    if (req.body.certificateCode != undefined) newDoc.certificateCode = req.body.certificateCode;
    if (req.body.name != undefined) newDoc.name = req.body.name;
    if (req.body.description !== undefined) newDoc.description = req.body.description;
    if (req.body.requirements !== undefined) newDoc.requirements = req.body.requirements;
    if (req.body.institution !== undefined) newDoc.institution = req.body.institution;
    if (req.body.coursesRequired !== undefined) newDoc.coursesRequired = req.body.coursesRequired;

    const result = await databaseModel.updateOne(
      { _id: certificateId },
      { $set: newDoc }
    );

    if (result.nModified === 0) {
      return next(new AppErrorClass("No certificate found to update", 404));
    } 
    
      res.status(200).json(result);
} catch (error) {
  console.error(error); // Add logging
  next(error);
}
};

/**
 * Deletes a certificate from the database by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const deleteCertificate = async (req, res, next) => {
  try {
    const certificateId = req.params.id;
    const result = await databaseModel.deleteOne({ _id: certificateId });

    if (!result.deletedCount) {
      throw new AppErrorClass("No certificate found to delete", 404);
    }

    res.status(204).json({ message: "certificate deleted successfully", result });
} catch (error) {
  console.error(error); // Add logging
  next(error);
}
};

// Exporting the CRUD functions
module.exports = {
  getAll,
  getSingle,
  deleteCertificate,
  updateCertificate,
  createCertificate,
};
