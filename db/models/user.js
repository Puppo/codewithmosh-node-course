const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("../../config/config");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    minLength: 5,
    maxLength: 255,
  },
  name: {
    type: String,
    minLength: 1,
    maxLength: 100,
  },
  password: {
    type: String,
    minLength: 5,
    maxLength: 1024,
  },
  isAdmin: {
    type: Boolean,
  },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      isAdmin: this.isAdmin,
    },
    config.jwtKey()
  );
};

const UserModel = new mongoose.model("User", userSchema);

module.exports = {
  model: UserModel,
  schema: userSchema,
};
