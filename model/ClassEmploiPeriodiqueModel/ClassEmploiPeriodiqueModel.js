const mongoose = require("mongoose");

const classEmploiPeriodiqueSchema = new mongoose.Schema({
  date_debut: String,
  date_fin: String,
  semestre: String,
  id_classe: { type: mongoose.Schema.Types.ObjectId, ref: "Classe" },
  etat: String,
});

module.exports = mongoose.model(
  "ClassEmploiPeriodique",
  classEmploiPeriodiqueSchema
);