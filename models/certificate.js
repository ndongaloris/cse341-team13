
module.exports = (mongoose) => {
  const CertificateSchema = new mongoose.Schema({
    certificateCode: { type: String},
    name: {
      type: String,
      required: [true, "Certificate name is required"],
      minlength: [3, "Certificate name must be at least 3 characters long"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    requirements: {
      type: [String],
      required: [true, "Requirements are required"],
    },
    institution: {
      type: String,
      required: [true, "Institution is required"],
    },
    coursesRequired: [{
          type: String,
          required: [true, "Course is required"]
          
        }],
  });

  /**
   * Defines the Certificate model.
   */
  const Certificate = mongoose.model("Certificate", CertificateSchema);

  return Certificate;
};
