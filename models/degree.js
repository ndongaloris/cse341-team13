module.exports = (mongoose) => {
  const DegreeSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, "Degree name is required"],
        minlength: [3, "Degree name must be at least 3 characters long"],
      },
      institutions: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Institutions",
        required: [true, "Institution is required"],
      },
      certificates: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Certificates",
        required: [true, "Certificate is required"],
      },
      type: {
        type: String,
        required: [true, "Degree type is required"],
        enum: ["Associate", "Bachelor"],
      },
      description: {
        type: String,
      },
      potentialEmployment: {
        type: [String], //* this indicates a list of potential employments
      },
      duration: {
        type: String,
        required: [true, "Degree duration is required"],
        match: [
          /^\d+ (years?|months?)$/,
          "Duration should be in the format '10 years' or '3 months'",
        ],
      },
      creditsRequired: {
        type: Number,
        required: [true, "Credits required is mandatory"],
        min: [1, "Minimum credits required is 1"],
      },
      level: {
        type: String,
        required: [true, "Degree level is required"],
        enum: ["Undergraduate", "Graduate"],
      },
    },
    {
      timestamps: true,
    }
  );

  /**
   * * To prevent duplicate degrees with the same name and type
   * * within the same institution, the code below, use a compound index
   * * that includes the institution ID and degree name + degree type.
   * * This ensures different institutions to have degrees with the same name and type.
   * * without conflicts.
   *
   */
  DegreeSchema.index({ institution: 1, name: 1, type: 1 }, { unique: true });

  /**
   * Defines the Degree model.
   */
  const Degree = mongoose.model("Degrees", DegreeSchema);

  return Degree;
};
