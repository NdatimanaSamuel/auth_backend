const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Add Name"],
    },
    email: {
      type: String,
      required: [true, "Please Add Email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please Add Passsword"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
