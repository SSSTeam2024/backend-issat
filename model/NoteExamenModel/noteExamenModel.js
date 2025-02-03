const mongoose = require("mongoose");

const noteExamenSchema = new mongoose.Schema(
  {
    enseignant: { type: mongoose.Schema.Types.ObjectId, ref: "Enseignant" },
    semestre: String,
    groupe: { type: mongoose.Schema.Types.ObjectId, ref: "Classe" },
    matiere: { type: mongoose.Schema.Types.ObjectId, ref: "Matiere" },
    type_examen: String,
    etudiants: [
      {
        etudiant: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Etudiant",
          default: null,
        },
        note: String,
      },
    ],
    completed: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("NoteExamen", noteExamenSchema);
