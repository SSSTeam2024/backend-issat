const mongoose = require('mongoose');

const etatCompteEnseignantSchema = new mongoose.Schema({
  // value_etat_enseignant: { type: String, unique: true },
  etat_ar: String,
  etat_fr: String,

 
},
{ timestamps: true });

module.exports = mongoose.model('EtatCompteEnseignant', etatCompteEnseignantSchema);