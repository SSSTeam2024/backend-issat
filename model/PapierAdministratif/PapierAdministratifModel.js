const mongoose = require("mongoose");

const papierAdministratifSchema = new mongoose.Schema(
  {
    nom_ar: { type: String },
    nom_fr: { type: String},
    category: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "PapierAdministratif",
  papierAdministratifSchema
);