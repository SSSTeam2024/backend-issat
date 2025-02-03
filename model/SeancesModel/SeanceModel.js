const mongoose = require("mongoose");

const seanceSchema = new mongoose.Schema(
  {
    matiere: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Matiere",
      required: true,
    },
    enseignant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Enseignant",
      required: true,
    },
    classe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classe",
      required: true,
    },
    salle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Salle",
      required: true,
    },
    jour: { type: String, required: true },
    heure_debut: { type: String, required: true },
    heure_fin: { type: String, required: true },
    type_seance: { type: String, required: true },
    semestre: { type: String, required: true },
    emploiPeriodique_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClassEmploiPeriodique",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Seance", seanceSchema);