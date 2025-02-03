const mongoose = require("mongoose");

const ficheVoeuxSchema = new mongoose.Schema(
  {
    fiche_voeux_classes: [
      {
        matieres: [{ type: mongoose.Schema.Types.ObjectId, ref: "Matiere" }],
        classe: { type: mongoose.Schema.Types.ObjectId, ref: "Classe" },
      },
    ],
    jours: [
      {
        jour: String,
        temps: String,
      },
    ],
    enseignant: { type: mongoose.Schema.Types.ObjectId, ref: "Enseignant" },

    semestre: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("ficheVoeux", ficheVoeuxSchema);