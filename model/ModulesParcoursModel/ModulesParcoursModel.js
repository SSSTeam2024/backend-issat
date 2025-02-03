const mongoose = require("mongoose");

const moduleParcoursSchema = new mongoose.Schema(
  {
    code_Ue: String,
    libelle: String,
    credit: String,
    coef: String,
    nature: String,
    regime: String,
    semestre: String,
    parcours: { type: mongoose.Schema.Types.ObjectId, ref: "Parcours" },
    matiere: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Matiere", default: null },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ModuleParcours", moduleParcoursSchema);
