const mongoose = require("mongoose");

const typeParcoursSchema = new mongoose.Schema(
  {
    name_type_parcours_fr: String,
    name_type_parcours_ar: String,
    abreviation: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("TypeParcours", typeParcoursSchema);
