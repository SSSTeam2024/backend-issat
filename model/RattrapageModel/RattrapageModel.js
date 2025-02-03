const mongoose = require("mongoose");

const rattrapageSchema = new mongoose.Schema(
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
    jour: String,
    date: String,
    heure_debut: String,
    heure_fin: String,
    semestre: String,
    etat: String,
    status: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rattrapage", rattrapageSchema);