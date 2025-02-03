const mongoose = require('mongoose');

const categoriePersonnelSchema = new mongoose.Schema({
  // value: { type: String, unique: true },
  categorie_ar: String,
  categorie_fr: String,

 
},
{ timestamps: true });

module.exports = mongoose.model('CategoriePersonnel', categoriePersonnelSchema);