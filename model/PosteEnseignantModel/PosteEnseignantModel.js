const mongoose = require('mongoose');

const posteEnseignantSchema = new mongoose.Schema({
  // value_poste_enseignant: { type: String, unique: true },
  poste_ar: String,
  poste_fr: String,
 
},
{ timestamps: true });

module.exports = mongoose.model('PosteEnseignant', posteEnseignantSchema);