const databaseModel = require("../models/index").course;
const Certificate = require("../models/index").certificate; 
const Degree = require("../models/index").degree;
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
    const result = await databaseModel.find();
    

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
    const courseId = req.params.id;
    const result = await databaseModel.findOne({ _id: courseId });
    

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
const createCourse = async (req, res, next) => {
  try {
    // const certificateIds = await getCertificateIdsByNames(req.body.certificates);
    // const degreeId = await getDegreeIdByName(req.body.degree);

    // if (degreeId === null) {
    //   return next(new AppErrorClass("Degree not found", 404));
    // }


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
const updateCourse = errorHandler.catchAsync(async (req, res, next) => {
  //# swagger tags = ['Courses']

  try {
    const courseId = req.params.id;
    const newDoc = {};

    if (req.body.name != undefined) newDoc.name = req.body.name;
    if (req.body.code !== undefined) newDoc.code = req.body.code;
    if (req.body.description !== undefined)
      newDoc.description = req.body.description;
    if (req.body.credit !== undefined) newDoc.credit = req.body.credit;
    if (req.body.certificates !== undefined) newDoc.certificates = req.body.certificates;
    if (req.body.degree !== undefined) newDoc.degree = req.body.degree;
    // if (req.body.certificates !== undefined) {
    //   newDoc.certificates = await getCertificateIdsByNames(req.body.certificates);
    // }
    // if (req.body.degree !== undefined) {
    //   const degreeId = await getDegreeIdByName(req.body.degree);
    //   if (degreeId === null) {
    //     return next(new AppErrorClass("Degree not found", 404));
    //   }
    //   newDoc.degree = degreeId;
    // }
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
});

/**
 * Deletes a course from the database by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const deleteCourse = errorHandler.catchAsync(async (req, res, next) => {
  //# swagger tags = ['Courses']

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
});

// Exporting the CRUD functions
module.exports = {
  getAll,
  getSingle,
  deleteCourse,
  updateCourse,
  createCourse,
};
















// // Helper functions to resolve names to ObjectIds
// const getCertificateIdsByNames = async (certificateNames) => {
//   const certificates = await Certificate.find({ name: { $in: certificateNames } }).exec();
//   return certificates.map(certificate => certificate._id);
// };

// const getDegreeIdByName = async (name) => {
//   const degree = await Degree.findOne({ name }).exec();
//   return degree ? degree._id : null;
// };



// const Course = require('../models/index').course;
// const { checkIfExists, validateReferences } = require('../utils/referenceService');

// // Get all courses
// exports.getAll = async (req, res) => {
//   try {
//     const courses = await Course.find().populate('certificates degrees');
//     res.json(courses);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get a single course by code
// exports.getSingle = async (req, res) => {
//   try {
//     const course = await Course.findOne({ code: req.params.code }).populate('certificates degrees');

//     if (!course) {
//       return res.status(404).json({ error: 'Course not found' });
//     }

//     res.json(course);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Create a new course
// exports.createCourse = async (req, res) => {
//   try {
//     // const { name, code, description, credit, certificates, degree, courseType } = req.body;

//     // // Validate the individual fields
//     // if (!req.body.name || !req.body.code || !req.body.description || !req.body.credit || !req.body.degree || !req.body.courseType) {
//     //   return res.status(400).json({ error: 'Missing required fields' });
//     // }

//     // Validate references
//     const { validReferences, notFoundReferences } = await validateReferences({
//       Certificate: req.body.certificates || [], // assuming certificates is an array of names
//       Degree: [req.body.degree] // assuming degree is a name
//     });

//     // Log missing references
//     if (notFoundReferences.Certificate.length > 0) {
//       console.log(`Certificates not found: ${notFoundReferences.Certificate.join(', ')}`);
//     }
//     if (notFoundReferences.Degree.length > 0) {
//       console.log(`Degree not found: ${notFoundReferences.Degree.join(', ')}`);
//     }

//     // // Check if the course already exists
//     // const courseExists = await checkIfExists(Course, code);
//     // if (courseExists) {
//     //   return res.status(400).json({ error: 'Course already exists' });
//     // }

//     // Create and save the new course
//     const course = new Course({ 
//       name: req.body.name, 
//       code: req.body.code, 
//       description: req.body.description, 
//       credit: req.body.credit, 
//       certificates: validReferences.Certificate,
//       degree: validReferences.Degree[0], 
//       courseType });
//     await course.save();
//     res.status(201).json(course);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Update a course by code
// exports.updateCourse = async (req, res) => {
//   try {
//     const { name, code, description, credit, certificates, degree, courseType } = req.body;

//     // Validate references if updating
//     if (certificates || degree) {
//       const { validReferences, notFoundReferences } = await validateReferences({
//         Certificate: certificates || [], // assuming certificates is an array of names
//         Degree: [degree] // assuming degree is a name
//       });
//     }

//     // Log missing references
//     if (notFoundReferences.Certificate.length > 0) {
//       console.log(`Certificates not found: ${notFoundReferences.Certificate.join(', ')}`);
//     }
//     if (notFoundReferences.Degree.length > 0) {
//       console.log(`Degree not found: ${notFoundReferences.Degree.join(', ')}`);
//     }

    
//     const updatedFields = {};
//     if (name) updatedFields.name = name;
//     if (description) updatedFields.description = description;
//     if (credit != null) updatedFields.credit = credit;
//     // Update with valid references
//     if (certificates) updatedFields.certificates = validReferences.Certificate;
//     if (degree) updatedFields.degree = validReferences.Degree[0];
//     if (courseType) updatedFields.courseType = courseType;

//     // Find and update the course by its code
//     const course = await Course.findOneAndUpdate(
//       { code: req.params.code },
//       { $set: updatedFields },
//       { new: true }
//     );

//     if (!course) {
//       return res.status(404).json({ error: 'Course not found' });
//     }

//     res.json(course);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Delete a course by code
// exports.deleteCourse = async (req, res) => {
//   try {
//     const course = await Course.findOneAndDelete({ code: req.params.code });

//     if (!course) {
//       return res.status(404).json({ error: 'Course not found' });
//     }

//     res.json({ message: 'Course deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
