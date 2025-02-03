const mongoose = require('mongoose');

const etatPersonnelSchema = new mongoose.Schema({
  // value: { type: String, unique: true },
  etat_ar: String,
  etat_fr: String,

 
},
{ timestamps: true });

module.exports = mongoose.model('EtatPersonnel', etatPersonnelSchema);