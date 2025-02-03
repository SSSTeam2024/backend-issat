const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AvisPersonnelSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  auteurId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } ,
  date_avis: { type: Date, required: false },
  lien: { type: String, required: false },
  gallery: { type: [String], required: false },
  pdf: { type: String, required: false },
}, 
{ timestamps: true });

module.exports = mongoose.model('AvisPersonnel', AvisPersonnelSchema);