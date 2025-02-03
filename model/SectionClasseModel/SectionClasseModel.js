const mongoose = require("mongoose");

const sectionClasseSchema = new mongoose.Schema(
  {
    name_section_ar: String,
    name_section_fr: String,
    abreviation: String,
    niveau_classe: [
      { type: mongoose.Schema.Types.ObjectId, ref: "NiveauClasse" },
    ],
    departements: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Departement" },
    ],
    mention_classe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MentionClasse",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SectionClasse", sectionClasseSchema);
