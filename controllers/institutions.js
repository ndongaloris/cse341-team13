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
      const result = await databaseModel.find();

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
    const result = await databaseModel.findById(institutionId);
    

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
    // // Resolve degree and certificate names to ObjectIds
    // const degreeIds = await getDegreeIdsByNames(req.body.degrees);
    // const certificateIds = await getCertificateIdsByNames(req.body.certificates);

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
    if (req.body.accreditation !== undefined) newDoc.accreditation = req.body.accreditation;
    if (req.body.degrees !== undefined) newDoc.degrees = req.body.degrees;
    if (req.body.certificates !== undefined) newDoc.certificates = req.body.certificates;
    // if (req.body.degrees !== undefined) {
    //   newDoc.degrees = await getDegreeIdsByNames(req.body.degrees);
    // }
    // if (req.body.certificates !== undefined) {
    //   newDoc.certificates = await getCertificateIdsByNames(req.body.certificates);
    // }

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



















// // Helper function to resolve degree names to ObjectIds
// const getDegreeIdsByNames = async (degreeNames) => {
//   const degrees = await Degree.find({ name: { $in: degreeNames } }).exec();
//   return degrees.map(degree => degree._id);
// };

// // Helper function to resolve certificate names to ObjectIds
// const getCertificateIdsByNames = async (certificateNames) => {
//   const certificates = await Certificate.find({ name: { $in: certificateNames } }).exec();
//   return certificates.map(certificate => certificate._id);
// };

// const databaseModel = require('../models/index').institution;
// const { validateReferences } = require('../utils/referenceService');
// // console.log(databaseModel);

// // Get all institutions
// const getAll = async (req, res) => {
//   try {
//     const institutions = await databaseModel.find();
//     // .populate('degrees certificates');
//     res.json(institutions);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get a single institution by name
// const getSingle = async (req, res) => {
//   try {
//     const institution = await databaseModel.findOne({ name: req.params.name }).populate('degrees certificates');

//     if (!institution) {
//       return res.status(404).json({ error: 'Institution not found' });
//     }

//     res.json(institution);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Create a new institution
// const createInstitution = async (req, res) => {
//   try {
//     // const { name, address, degrees, certificates } = req.body;


//     // Validate references
//     const { validReferences, notFoundReferences } = await validateReferences({
//       Degree: req.body.degrees || [], // assuming degrees is an array of names
//       Certificate: req.body.certificates || [] // assuming certificates is an array of names
//     });

    

//     // Log missing references
//     if (notFoundReferences.Degree.length > 0) {
//       console.log(`Degrees not found: ${notFoundReferences.Degree.join(', ')}`);
//     }
//     if (notFoundReferences.Certificate.length > 0) {
//       console.log(`Certificates not found: ${notFoundReferences.Certificate.join(', ')}`);
//     }

//     // Create and save the new institution
//     const institution = new Institution({ 
//       name: req.body.name, 
//       abbreviation: req.body.abbreviation,
//       location: req.body.location, 
//       address: req.body.address, 
//       website: req.body.website,
//       description: req.body.description,
//       degrees: req.body.degrees, 
//       certificates: req.body.certificates });
//     await databaseModel.save();
//     res.status(201).json(institution);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Update an institution by name
// const updateInstitution = async (req, res) => {
//   try {

    
//     const updatedFields = {};
//     if (req.body.name) updatedFields.name = req.body.name;
//     if (req.body.abbreviation) updatedFields.abbreviation = req.body.abbreviation;
//     if (req.body.location) updatedFields.location = req.body.location;
//     if (req.body.address) updatedFields.address = req.body.address;
//     if (req.body.website) updatedFields.website = req.body.website;
//     if (req.body.description) updatedFields.description = req.body.description;
//     // if (req.body.degrees) updatedFields.degrees = req.body.degrees;
//     // if (req.body.certificates) updatedFields.certificates = req.body.certificates;
//     // Validate references if provided
//     if (req.body.degrees || req.body.certificates) {
//       const { validReferences, notFoundReferences } = await validateReferences({
//         Degree: req.body.degrees || [], // assuming degrees is an array of names
//         Certificate: req.body.certificates || [] // assuming certificates is an array of names
//       });

//       // Log missing references
//       if (notFoundReferences.Degree.length > 0) {
//         console.log(`Degrees not found: ${notFoundReferences.Degree.join(', ')}`);
//       }
//       if (notFoundReferences.Certificate.length > 0) {
//         console.log(`Certificates not found: ${notFoundReferences.Certificate.join(', ')}`);
//       }

//       // Update with valid references
//       if (req.body.degrees) updatedFields.degrees = validReferences.Degree;
//       if (req.body.certificates) updatedFields.certificates = validReferences.Certificate;
//     }

//     // Find and update the institution by its name
//     const institution = await databaseModel.findOneAndUpdate(
//       { name: req.params.name },
//       { $set: updatedFields },
//       { new: true }
//     );

//     if (!institution) {
//       return res.status(404).json({ error: 'Institution not found' });
//     }

//     res.json(institution);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Delete an institution by name
// const deleteInstitution = async (req, res) => {
//   try {
//     const institution = await databaseModel.findOneAndDelete({ name: req.params.name });

//     if (!institution) {
//       return res.status(404).json({ error: 'Institution not found' });
//     }

//     res.json({ message: 'Institution deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };