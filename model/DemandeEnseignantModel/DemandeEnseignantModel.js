const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DemandeEnseignantSchema = new Schema({
  enseignantId: { type: Schema.Types.ObjectId, ref: 'Enseignant', required: true },
  title: { type: String, required: false },
  description: { type: String, required: true },
  piece_demande:{type: Schema.Types.ObjectId, ref: 'TemplateBody', required: false, default : null},
  langue:{type: String, required: false},
  nombre_copie:{type: Number, required: false},
  response: {type: String, required: false},
  status: { type: String, enum: ['en attente', 'traité', 'rejeté'], default: 'en attente' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DemandeEnseignant', DemandeEnseignantSchema);