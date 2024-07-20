const validator = require("validator");
const bcrypt = require("bcrypt");

/**
 * ? What is the `Sparse` validation property?
 * ? In Mongoose and MongoDB, sparse is an index that when
 * ? when set to true allows multiple document to have a null
 * ? value for a given field without violating the uniqueness
 * ? constraint of the field. In the User model, Users can sign up
 * ? using either traditional email/password, Google OAuth, or GitHub
 * ? OAuth. Some users will have a googleId, some will have githubId,
 * ? and some will have neither, using just email and password 
 * ? instead.

 * ? By making googleId and githubId fields sparse, we allow
 * ? multiple users to have null values for these fields without
 * ? conflicting with the uniqueness constraint, which would not be
 * ? possible with a regular unique index.
 *
 */

/**
 *
 * @param {Mongoose} mongoose - Mongoose instance
 * @returns {Schema}
 */

module.exports = (mongoose) => {
  const UserSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    username: { type: String, unique: true, sparse: true }, //* sparse allows multiple nulls
    email: {
      type: String,
      unique: true,
      required: function () {
        //* the email is required if no OAuth
        return !this.googleId && !this.githubId;
      },
      validate: [validator.isEmail, "Please fill in a valid email address"],
    },
    password: {
      type: String,
      required: function () {
        //* the password is required if no OAuth
        return !this.googleId && !this.githubId;
      },
    },
    googleId: { type: String, unique: true, sparse: true },
    githubId: { type: String, unique: true, sparse: true },
    role: {
      type: String,
      enum: ["student", "dev", "instructor", "admin"],
      default: "student",
    },
  });

  //* Pre-save hook to hash password if it's modified or new
  UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
  });

  //* Method to check password validity
  UserSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };

  const User = mongoose.model("User", UserSchema);
  return User;
};
