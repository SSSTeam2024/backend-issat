const mongoose = require("mongoose");

const DomaineClasseSchema = new mongoose.Schema(
  {
    name_domaine_ar: String,
    name_domaine_fr: String,
    abreviation: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("DomaineClasse", DomaineClasseSchema);
