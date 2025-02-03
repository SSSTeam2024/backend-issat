const mongoose = require('mongoose');

const specialiteEnseignantSchema = new mongoose.Schema({
  // value_specialite_enseignant: { type: String, unique: true },
  specialite_ar: String,
  specialite_fr: String,

 
},
{ timestamps: true });

module.exports = mongoose.model('SpecialiteEnseignant', specialiteEnseignantSchema);