const mongoose = require("mongoose");
const goalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true],
      ref: "User",
    },
    text: {
      type: String,
      required: [true, "Please Add Text Value"],
    },
  },
  { timestamps: true } // Use timestamps: true for createdAt and updatedAt fields
);

module.exports = mongoose.model("Goal", goalSchema);
