/**
 * Defines the Institution model schema and creates the Institution model.
 * 
 * @param {Object} mongoose - The Mongoose instance.
 * @returns {Object} The Institution model.
 */
module.exports = (mongoose) => {
    /**
     * Institution schema definition.
     */
    const InstitutionSchema = new mongoose.Schema({
        name: { type: String },  // Name of the institution
        address: { type: String },  // Addresses of the institution
        description: { type: String },  // Description of the institution
        dateOfCreation: { type: String },  // Date of creation of the institution
    });

    /**
     * Institution model creation.
     * @model Institution
     */
    const Institution = mongoose.model("institutions", InstitutionSchema); // Model name should be singular and capitalized
    
    return Institution;
};
