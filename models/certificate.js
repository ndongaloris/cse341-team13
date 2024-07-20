module.exports = (mongoose) => {
    const CertificateSchema = new mongoose.Schema({
        _id: { type: String, required: true},
      name: {
        type: String,
        required: [true, "Certificate name is required"],
        minlength: [3, "Certificate name must be at least 3 characters long"],
      },
      description: {
        type: String,
        required: [true, "Description is required"]
      },
      requirements: {
        type: [String],
        required: [true, "Requirements are required"],
    },
      degree: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Degree',
        required: [true, "Degree type is required"],
      },
      courses: {
        type: [
            { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Course',
                required: [true, "Course is required"],
            }], 
      }
    });
  
CertificateSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'degree',
        select: 'name'
    })
    .populate({
        path: 'courses',
        select: 'code name description'
    });
    next();
    });

    /**
     * Defines the Certificate model.
     */
    const Certificate = mongoose.model("Certificates", CertificateSchema);
  
    return Certificate;
  };
  