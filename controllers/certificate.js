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
    const result = await databaseModel.find();
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
    const result = await databaseModel.findOne({ _id: certificateId });
    

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
    // const institutionId = await getInstitutionIdByName(req.body.institution);
    // const courseIds = await getCourseIdByNames(req.body.coursesRequired);

    // if (!institutionId) {
    //   return next(new AppErrorClass("Institution not found", 404));
    // }



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

    // if (req.body.institution !== undefined) {
    //   const institutionId = await getInstitutionIdByName(req.body.institution);
    //   if (!institutionId) {
    //     return next(new AppErrorClass("Institution not found", 404));
    //   }
    //   newDoc.institution = institutionId;
    // }

    // if (req.body.coursesRequired !== undefined) {
    //   const courseIds = await getCourseIdByNames(req.body.coursesRequired);
    //   newDoc.coursesRequired = courseIds;
    // }

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















// Helper functions to resolve names to ObjectIds
// const getInstitutionIdByName = async (name) => {
//   const institution = await Institution.findOne({ name }).exec();
//   return institution ? institution._id : null;
// };

// const getCourseIdByNames = async (name) => {
//   const courses = await Course.find({ name: { $in: name } }).exec();
//   return courses.map(course => course._id);
// };




// const Certificate = require('../models/index').certificate;
// const { checkIfExists, validateReferences } = require('../utils/referenceService');

// // Get all certificates
// exports.getAll = async (req, res) => {
//   try {
//     const certificates = await Certificate.find().populate('degrees courses');
//     res.json(certificates);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get a single certificate by name
// exports.getSingle = async (req, res) => {
//   try {
//     const certificate = await Certificate.findOne({ name: req.params.name }).populate('degrees courses');

//     if (!certificate) {
//       return res.status(404).json({ error: 'Certificate not found' });
//     }

//     res.json(certificate);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Create a new certificate
// exports.createCertificate = async (req, res) => {
//   try {
    

//     // // Validate the individual fields
//     // if (!req.body.name || !req.body.description) {
//     //   return res.status(400).json({ error: 'Missing required fields' });
//     // }

//     // Validate references
//     // const { validReferences, notFoundReferences } = await validateReferences({
//     //   Degree: req.body.degrees || [], // assuming degrees is an array of names
//     //   Course: req.body.courses || [] // assuming courses is an array of names
//     // });

//     // Log missing references
//     // if (notFoundReferences.Degree.length > 0) {
//     //   console.log(`Degrees not found: ${notFoundReferences.Degree.join(', ')}`);
//     // }
//     // if (notFoundReferences.Course.length > 0) {
//     //   console.log(`Courses not found: ${notFoundReferences.Course.join(', ')}`);
//     // }

//     // // Check if the certificate already exists
//     // const certificateExists = await checkIfExists(Certificate, req.body.name);
//     // if (certificateExists) {
//     //   return res.status(400).json({ error: 'Certificate already exists' });
//     // }

//     // Create and save the new certificate
//     const certificate = new Certificate({ 
//       name: req.body.name, 
//       description: req.body.description, 
//       degrees:  validReferences.Degree, 
//       courses: validReferences.Course 
//     });
//     await certificate.save();
//     res.status(201).json(certificate);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Update a certificate by name
// exports.updateCertificate = async (req, res) => {
//   try {
    
//     // Validate references if updating
//     // if (req.body.degrees || req.body.courses) {
//     //   const { validReferences, notFoundReferences } = await validateReferences({
//     //     Degree: req.body.degrees || [], // assuming degrees is an array of names
//     //     Course: req.body.courses || [] // assuming courses is an array of names
//     //   });
//     // }

//     // Log missing references
//     // if (notFoundReferences.Degree.length > 0) {
//     //   console.log(`Degrees not found: ${notFoundReferences.Degree.join(', ')}`);
//     // }
//     // if (notFoundReferences.Course.length > 0) {
//     //   console.log(`Courses not found: ${notFoundReferences.Course.join(', ')}`);
//     // }

//     const updatedFields = {};
//     if (req.body.name) updatedFields.name = req.body.name;
//     if (req.body.description) updatedFields.description = req.body.description;
//     if (req.body.degrees) updatedFields.degrees = validReferences.Degree;
//     if (req.body.courses) updatedFields.courses = validReferences.Course;

//     // Find and update the certificate by its name
//     const certificate = await Certificate.findOneAndUpdate(
//       { name: req.params.name },
//       { $set: updatedFields },
//       { new: true }
//     );

//     if (!certificate) {
//       return res.status(404).json({ error: 'Certificate not found' });
//     }

//     res.json(certificate);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Delete a certificate by name
// exports.deleteCertificate = async (req, res) => {
//   try {
//     const certificate = await Certificate.findOneAndDelete({ name: req.params.name });

//     if (!certificate) {
//       return res.status(404).json({ error: 'Certificate not found' });
//     }

//     res.json({ message: 'Certificate deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };



// 