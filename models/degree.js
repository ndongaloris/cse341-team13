module.exports = (mongoose) => {
    const Degree = mongoose.model(
        "degrees", 
        mongoose.Schema({
            Name: String,
            Institution: String,
            Type: String,
            Description : String,
            PotentialEmployment: String,
        })
    );
    return Degree;
}