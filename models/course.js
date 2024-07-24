module.exports = (mongoose) => {
  const CourseSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Course name is required"],
      minlength: [3, "Course name must be at least 3 characters long"],
    },
    code: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    credit: {
      type: Number,
      min: [1, "Minimum credits required is 1"],
      max: [4, "Maximum credits required is 4"],
      required: [true, "Credit number is required"],
    },
    certificates: {
      type: [
        {
          type: String,
          required: true
        }
      ],
    },
    degree: {
      type: String,
      required: true
    },
    courseType: {
      type: String,
      required: [true, "Course Type is required"],
      enum: ["Core", "General Education", "Religion"],
    },
  });


  /**
   * Defines the Degree model.
   */
  const Course = mongoose.model("Course", CourseSchema);

  return Course;
};
