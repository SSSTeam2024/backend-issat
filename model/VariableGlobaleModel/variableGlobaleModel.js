const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const variableGlobaleSchema = new Schema({
  directeur_ar: String,
  directeur_fr: String,
  secretaire_ar: String,
  secretaire_fr: String,
  signature_directeur: String,
  signature_secretaire: String,
  etablissement_ar: String,
  etablissement_fr: String,
  logo_etablissement: String,
  logo_universite: String,
  logo_republique: String,
  universite_ar: String,
  universite_fr: String,
  address_ar: String,
  gouvernorat_ar: String,
  code_postal: String,
  address_fr: String,
  gouvernorat_fr: String,
  phone: String,
  fax: String,
  website: String
});


module.exports = mongoose.model('VariableGlobale', variableGlobaleSchema);
