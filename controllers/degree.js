const databaseModel = require("../models/index").degree;
// const Institution = require("../models/index").institution; 
// const Certificate = require("../models/index").certificate;
const errorHandler = require("../middleware/errorHandler");
const AppErrorClass = require("../utils/appErrorClass");


/**
 * Retrieves all degrees from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getAll = async (req, res, next) => {
  try {
    const result = await databaseModel.find();
    

    if (!result) {
      return next(new AppErrorClass("No degrees found", 404));
    }

    res.status(200).json(result);
  }  catch (error) {
    next(new AppErrorClass(error.message, 500));
  }
  };

/**
 * Retrieves a single degree from the database by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getSingle = async (req, res, next) => {
  try {
    const degreeId = req.params.id;
  const result = await databaseModel.findOne({ _id: degreeId });
  

  if (!result) {
    return next(new AppErrorClass("No degree found with that ID", 404));
  }

  res.status(200).json(result);
} catch (error) {
  next(new AppErrorClass(error.message, 500));
}
};

/**
 * Creates a new degree in the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const createDegree = async (req, res, next) => {
  try {
    // const institutionId = await getInstitutionIdByName(req.body.institutions);
    // const certificateIds = await getCertificateIdsByNames(req.body.certificatesRequired);

    // if (institutionId === null) {
    //   return next(new AppErrorClass("Institution not found", 404));
    // }

    const result = await databaseModel.create({
      degreeCode: req.body.degreeCode,
      name: req.body.name,
      institutions: req.body.institutions,
      certificatesRequired: req.body.certificates,
      type: req.body.type,
      description: req.body.description,
      potentialEmployment: req.body.potentialEmployment,
      duration: req.body.duration,
      creditsRequired: req.body.creditsRequired,
      level: req.body.level,
    });

    res.status(201).json(result);
  } catch (error) {
    next(new AppErrorClass(error.message, 500));
  }
};

/**
 * Updates a degree in the database by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const updateDegree = async (req, res, next) => {
  try {
  const degreeId = req.params.id;
  const newDoc = {};

  if (req.body.degreeCode != undefined) newDoc.degreeCode = req.body.degreeCode;
  if (req.body.name != undefined) newDoc.name = req.body.name;
  if (req.body.institution !== undefined) newDoc.institution = req.body.institution;
  if (req.body.certificatesRequired != undefined) newDoc.certificatesRequired = req.body.certificatesRequired;
  // if (req.body.institutions !== undefined) {
  //   const institutionId = await getInstitutionIdByName(req.body.institutions);
  //   if (institutionId === null) {
  //     return next(new AppErrorClass("Institution not found", 404));
  //   }
  //   newDoc.institutions = institutionId;
  // }
  // if (req.body.certificatesRequired !== undefined) {
  //   newDoc.certificatesRequired = await getCertificateIdsByNames(req.body.certificatesRequired);
  // }
  if (req.body.type !== undefined) newDoc.type = req.body.type;
  if (req.body.description !== undefined)
    newDoc.description = req.body.description;
  if (req.body.potentialEmployment !== undefined)
    newDoc.potentialEmployment = req.body.potentialEmployment;
  if (req.body.duration != undefined) newDoc.duration = req.body.duration;
  if (req.body.creditsRequired != undefined) newDoc.creditsRequired = req.body.creditsRequired;
  if (req.body.level != undefined) newDoc.level = req.body.level;

  const result = await databaseModel.updateOne(
    { _id: degreeId },
    { $set: newDoc }
  );

  if (result.nModified === 0) {
    return next(new AppErrorClass("No degree found to update", 404));
  } else {
    res.status(200).json(result);
  } 
} catch (error) {
  next(new AppErrorClass(error.message, 500));
}
};

/**
 * Deletes a degree from the database by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const deleteDegree = async (req, res, next) => {
  try {
    const degreeId = req.params.id;
    const result = await databaseModel.deleteOne({ _id: degreeId });

    if (!result.deletedCount) {
      throw new AppErrorClass("No degree found to delete", 404);
    }

    res.status(204).json({ message: "Degree deleted successfully", result });
} catch (error) {
  next(new AppErrorClass(error.message, 500));
}
};

// Exporting the CRUD functions
module.exports = {
  getAll,
  getSingle,
  deleteDegree,
  updateDegree,
  createDegree,
};














// // Helper function to resolve institution name to ObjectId
// const getInstitutionIdByName = async (name) => {
//   const institution = await Institution.findOne({ name }).exec();
//   return institution ? institution._id : null;
// };

// // Helper function to resolve certificate names to ObjectIds
// const getCertificateIdsByNames = async (certificateNames) => {
//   const certificates = await Certificate.find({ name: { $in: certificateNames } }).exec();
//   return certificates.map(certificate => certificate._id);
// };






// const Degree = require('../models/index').degree;
// const { checkIfExists, validateReferences } = require('../utils/referenceService');

// // Get all degrees
// exports.getAll = async (req, res) => {
//   try {
//     const degrees = await Degree.find().populate('certificates');
//     res.json(degrees);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get a single degree by name
// exports.getSingle = async (req, res) => {
//   try {
//     const degree = await Degree.findOne({ name: req.params.name }).populate('certificates');

//     if (!degree) {
//       return res.status(404).json({ error: 'Degree not found' });
//     }

//     res.json(degree);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Create a new degree
// exports.createDegree = async (req, res) => {
//   try {
//     // Validate references
//     // const { validReferences, notFoundReferences } = await validateReferences({
//     //   Institution: [req.body.institutionName],
//     //   Certificate: req.body.certificates || []// assuming certificates is an array of names
//     // });

//     // Log missing references
//     if (notFoundReferences.Institution.length > 0) {
//       console.log(`Institutions not found: ${notFoundReferences.Institution.join(', ')}`);
//     }
//     if (notFoundReferences.Certificate.length > 0) {
//       console.log(`Certificates not found: ${notFoundReferences.Certificate.join(', ')}`);
//     }

//     // Check if the degree already exists
//     const degreeExists = await checkIfExists(Degree, req.body.name);
//     if (degreeExists) {
//       return res.status(400).json({ error: 'Degree already exists' });
//     }

//     // Create and save the new degree
//     const degree = new Degree({
//       name: req.body.name,
//       type: req.body.type,
//       institutionName: validReferences.Institution[0],
//       certificates: validReferences.req.body.certificates
//     });
//     await degree.save();
//     res.status(201).json(degree);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Update a degree by name
// exports.updateDegree = async (req, res) => {
//   try {
//     const { name, type, institutionName, certificates } = req.body;


//     const updatedFields = {};
//     if (name) updatedFields.name = name;
//     if (type) updatedFields.type = type;

//     // Validate references if updating
//     if (institutionName || certificates) {
//       const { validReferences, notFoundReferences } = await validateReferences({
//         Institution: [institutionName],
//         Certificate: certificates || [] // assuming certificates is an array of names
//       });
//     }

//     // Log missing references
//     if (notFoundReferences.Institution.length > 0) {
//       console.log(`Institutions not found: ${notFoundReferences.Institution.join(', ')}`);
//     }
//     if (notFoundReferences.Certificate.length > 0) {
//       console.log(`Certificates not found: ${notFoundReferences.Certificate.join(', ')}`);
//     }

//     // Update with valid references
//     if (institutionName) updatedFields.institutionName = validReferences.Institution[0];
//     if (certificates) updatedFields.certificates = validReferences.certificates;

//     const degree = await Degree.findOneAndUpdate(
//       { name: req.params.name },
//       { $set: updatedFields },
//       { new: true }
//     );

//     if (!degree) {
//       return res.status(404).json({ error: 'Degree not found' });
//     }

//     res.json(degree);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Delete a degree by name
// exports.deleteDegree = async (req, res) => {
//   try {
//     const degree = await Degree.findOneAndDelete({ name: req.params.name });

//     if (!degree) {
//       return res.status(404).json({ error: 'Degree not found' });
//     }

//     res.json({ message: 'Degree deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };