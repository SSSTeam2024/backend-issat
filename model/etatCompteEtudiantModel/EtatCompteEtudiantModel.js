const mongoose = require('mongoose');

const etatCompteEtudiantSchema = new mongoose.Schema({
  // value_etat_etudiant: { type: String, unique: true },
  etat_ar: String,
  etat_fr: String,

 
},
{ timestamps: true });

module.exports = mongoose.model('EtatCompteEtudiant', etatCompteEtudiantSchema);