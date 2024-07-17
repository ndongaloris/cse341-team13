const validator = require("validator");

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
  const InstitutionSchema = new mongoose.Schema(
    {
      name: {
        type: String, // Name of the institution
        required: [true, "Institution name is required"],
        minlength: [3, "Institution name must be at least 3 characters long"],
        unique: true, //* Ensures the institution name is unique
      },
      address: {
        type: String,
        required: [true, "Institution address is required"],
      }, // Addresses of the institution
      description: {
        type: String,
        maxlength: [
          500,
          "Institution description must be at most 500 characters long",
        ],
      }, // Description of the institution
      contactInfo: {
        email: {
          type: String,
          validate: [validator.isEmail, "Please fill in a email address"],
          required: [true, "Institution email is required"],
        },
        phoneNumber: {
          type: String,
          validate: [
            validator.isMobilePhone,
            "Please fill in a valid phone number",
          ],
        },
      },
      website: {
        type: String,
        validate: [validator.isURL, "Please fill in a valid URL"],
      },
      accreditation: {
        type: String,
        enum: ["Regional", "National", "International"],
        required: [true, "Institution accreditation type is required"],
      },
    },
    {
      timestamps: true,
      /**
       * * I removed the `dateOfCreation: { type: String }` field from the schema definition.
       * * I added the `timestamps: true` option to the schema definition because it includes
       * * the `createdAt` and `updatedAt` fields. Whenever an object is created or updated,
       * * these fields are automatically populated with the current date and time by Mongoose.
       * * e.g:
        *  * * {
        *  *  *  *  "_id": "60c72b1f4f1a2c001e1c4a6b",
        *  *  *  *  "name": "BYU Pathway Worldwide",
        *  *  *  *  "address": "Salt Lake City, UT",
        *  *  *  *  "description": "An educational institution providing pathways to higher education.",
        *  *  *  *  "contactInfo": {
        *  *  *  *      "email": "info@byupathway.org",
        *  *  *  *      "phone": "1234567890"
        *  *  *  *  },
        *  *  *  *  "website": "https://www.byupathway.org",
        *  *  *  *  "accreditation": "International",
        *  *  *  *  "createdAt": "2021-06-14T12:00:31.987Z",
        *  *  *  *  "updatedAt": "2021-06-14T12:00:31.987Z",
        *  *  *  *  "__v": 0
        *  *  *}

       */
    }
  );

  /**
   * Institution model creation.
   * @model Institution
   */
  const Institution = mongoose.model("Institutions", InstitutionSchema); // Model name should be singular and capitalized

  return Institution;
};
