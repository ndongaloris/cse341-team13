module.exports = (mongoose) => {
    const Institution = mongoose.model(
        "institutions", 
        mongoose.Schema({
            Name: String,
            Addresses: String,
            Description : String,
            DateOfCreation: String,
        })
    );
    return Institution;
}