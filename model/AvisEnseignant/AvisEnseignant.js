const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AvisEnseignantSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  auteurId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false } ,
  departement: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Departement', required: false }],
  date_avis: { type: Date, required: false },
  lien: { type: String, required: false },
  gallery: { type: [String], required: false },
  pdf: { type: String, required: false },
}, 
{ timestamps: true });

module.exports = mongoose.model('AvisEnseignant', AvisEnseignantSchema);