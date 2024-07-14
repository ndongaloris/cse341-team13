module.exports = (mongoose) => {
  const Degree = mongoose.model(
    "Degree", // Model name should be singular and capitalized
    mongoose.Schema({
      name: {
        type: String,
        required: [true, "Degree name is required"],
        minlength: [3, "Degree name must be at least 3 characters long"],
      },
      institution: {
        type: String,
        /**
         * ? This field is should be a reference to the institution model
         * ? In real-world application, degrees and institutions have a natural
         * ? relationship.
         */
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
    })
  );

  /**
   * * To prevent duplicate degrees with the same name and type
   * * within the same institution, the code below, use a compound index
   * * that includes the institution ID and degree name + degree type.
   * * This ensures different institutions to have degrees with the same name and type.
   * * without conflicts.
   *
   */
  Degree.index({ institution: 1, name: 1, type: 1 }, { unique: true });

  return Degree;
};
