const mongoose = require('mongoose');

const postePersonnelSchema = new mongoose.Schema({
  // value: { type: String, unique: true },
  poste_ar: String,
  poste_fr: String,
 
},
{ timestamps: true });

module.exports = mongoose.model('PostePersonnel', postePersonnelSchema);