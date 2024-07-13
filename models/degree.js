module.exports = (mongoose) => {
    const Degree = mongoose.model(
        "degrees", // Model name should be singular and capitalized
        mongoose.Schema({
            name: { type: String },
            institution: { type: String },
            type: { type: String },
            description: { type: String },
            potentialEmployment: { type: String },
        })
    );
    return Degree;
};
