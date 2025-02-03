const mongoose = require("mongoose");

const typeSeanceSchema = new mongoose.Schema(
  {
    seance_ar: String,
    seance_fr: String,
    abreviation: String,
    charge: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("TypeSeance", typeSeanceSchema);