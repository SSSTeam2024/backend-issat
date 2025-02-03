const mongoose = require("mongoose");

const examenSchema = new mongoose.Schema(
  {
    annee_universitaire: String,
    semestre: String,
    session: String,
    type_examen: String,
    period: String,
    group_enseignant: [
      {
        enseignant: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Enseignant",
            default: null,
          },
        ],
        date: [String],
      },
    ],
    epreuve: [
      {
        group_surveillants: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Enseignant",
            default: null,
          },
        ],
        group_responsables: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Enseignant",
            default: null,
          },
        ],
        nbr_copie: String,
        date: String,
        heure_debut: String,
        heure_fin: String,
        epreuveStatus: String,
        nbrePresent: String,
        nbreAbsent: String,
        nbreExclus: String,
        epreuveNotes: String,
        salle: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Salle",
          default: null,
        },
        matiere: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Matiere",
          default: null,
        },
        classe: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Classe",
          default: null,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Examen", examenSchema);
