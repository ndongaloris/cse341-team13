const databaseModel = require("../models/index").degree;

/**
 * Retrieves all degrees from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getAll = async (req, res) => {
    try {
        const result = await databaseModel.find();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        console.error("Error in getAll:", err);
        res.status(500).json({ message: "Error retrieving degrees" });
    }
};

/**
 * Retrieves a single degree from the database by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getSingle = async (req, res) => {
    const degreeId = req.params.id;
    try {
        const result = await databaseModel.findOne({ _id: degreeId });
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        console.error("Error in getSingle:", err);
        res.status(500).json({ message: "Error retrieving the degree" });
    }
};

/**
 * Creates a new degree in the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const createDegree = async (req, res) => {
    try {
        const result = await databaseModel.create({
            name: req.body.name,
            institution: req.body.institution,
            type: req.body.type,
            description: req.body.description,
            potentialEmployment: req.body.potentialEmployment
        });
        res.setHeader('Content-Type', 'application/json');
        res.status(201).json(result);
    } catch (err) {
        console.error("Error in createDegree:", err);
        res.status(500).json({ message: "Error creating the degree" });
    }
};

/**
 * Updates a degree in the database by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const updateDegree = async (req, res) => {
    const degreeId = req.params.id;
    const newDoc = {};

    if (req.body.name != undefined) newDoc.name = req.body.name;
    if (req.body.institution !== undefined) newDoc.institution = req.body.institution;
    if (req.body.type !== undefined) newDoc.type = req.body.type;
    if (req.body.description !== undefined) newDoc.description = req.body.description;
    if (req.body.potentialEmployment !== undefined) newDoc.potentialEmployment = req.body.potentialEmployment;

    try {
        const result = await databaseModel.updateOne({ _id: degreeId }, { $set: newDoc });
        res.setHeader('Content-Type', 'application/json');
        if (result.nModified === 0) {
            res.status(404).json({ message: 'No degree found to update' });
        } else {
            res.status(200).json(result);
        }
    } catch (err) {
        console.error("Error in updateDegree:", err);
        res.status(500).json({ message: "Error updating the degree" });
    }
};

/**
 * Deletes a degree from the database by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const deleteDegree = async (req, res) => {
    try {
        const degreeId = req.params.id;
        const result = await databaseModel.deleteOne({ _id: degreeId });
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ message: 'Degree deleted successfully', result });
    } catch (err) {
        console.error("Error in deleteDegree:", err);
        res.status(500).json({ message: "Error deleting the degree" });
    }
};

// Exporting the CRUD functions
module.exports = {
    getAll,
    getSingle,
    deleteDegree,
    updateDegree,
    createDegree
};
