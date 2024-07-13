const databaseModel = require("../models/index").institution;

/**
 * Retrieves all institutions from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getAll = async (req, res) => {
    try {
        const result = await databaseModel.find();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in getAll:", error);
        res.status(500).json({ message: "Error retrieving institutions" });
    }
};

/**
 * Retrieves a single institution from the database by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getSingle = async (req, res) => {
    try {
        const institutionId = req.params.id;
        const result = await databaseModel.findOne({ _id: institutionId });
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in getSingle:", error);
        res.status(500).json({ message: "Error retrieving the institution" });
    }
};

/**
 * Creates a new institution in the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const createInstitution = async (req, res) => {
    try {
        const result = await databaseModel.create({
            name: req.body.name,
            address: req.body.address,
            description: req.body.description,
            dateOfCreation: req.body.dateOfCreation
        });
        res.setHeader('Content-Type', 'application/json');
        res.status(201).json(result);
    } catch (error) {
        console.error("Error in createInstitution:", error);
        res.status(500).json({ message: "Error creating the institution" });
    }
};

/**
 * Deletes an institution from the database by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const deleteInstitution = async (req, res) => {
    try {
        const institutionId = req.params.id;
        const result = await databaseModel.deleteOne({ _id: institutionId });
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ message: 'Institution deleted successfully', result });
    } catch (error) {
        console.error("Error in deleteInstitution:", error);
        res.status(500).json({ message: "Error deleting the institution" });
    }
};

/**
 * Updates an institution in the database by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const updateInstitution = async (req, res) => {
    try {
        const institutionId = req.params.id;
        const newDoc = {};

        if (req.body.name !== undefined) newDoc.name = req.body.name;
        if (req.body.address !== undefined) newDoc.address = req.body.address;
        if (req.body.description !== undefined) newDoc.description = req.body.description;
        if (req.body.dateOfCreation !== undefined) newDoc.dateOfCreation = req.body.dateOfCreation;

        const result = await databaseModel.updateOne({ _id: institutionId }, { $set: newDoc });
        res.setHeader('Content-Type', 'application/json');
        if (result.nModified === 0) {
            res.status(404).json({ message: 'No institution found to update' });
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        console.error("Error in updateInstitution:", error);
        res.status(500).json({ message: "Error updating the institution" });
    }
};

// Exporting the CRUD functions
module.exports = {
    getAll,
    getSingle,
    createInstitution,
    deleteInstitution,
    updateInstitution
};
