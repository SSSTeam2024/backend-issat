const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActualiteSchema = new Schema({
  title: { type: String, required: true },
  address: { type: String, required: false },
  description: { type: String, required: true },
  category: { type: String, required: true },
  auteurId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false } ,
  date_actualite: { type: Date, required: false },
  lien: { type: String, required: false },
  gallery: { type: [String], required: false },
  pdf: { type: String, required: false },
}, 
{ timestamps: true });

module.exports = mongoose.model('Actualite', ActualiteSchema);