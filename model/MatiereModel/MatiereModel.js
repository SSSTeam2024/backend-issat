const mongoose = require("mongoose");

const matiereSchema = new mongoose.Schema(
  {
    code_matiere: String,
    coefficient_matiere: String,
    credit_matiere: String,
    regime_matiere: String,
    matiere: String,
    semestre: {
      type: String,
      default: "S1",
    },
    types: [
      {
        type: { type: String },
        volume: { type: String },
        nbr_elimination: { type: String },
      },
    ],
    classes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Classe" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Matiere", matiereSchema);
