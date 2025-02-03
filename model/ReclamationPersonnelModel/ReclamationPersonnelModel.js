const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReclamationPersonnelSchema = new Schema({
  personnelId: { type: Schema.Types.ObjectId, ref: 'Personnel', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  response: {type: String, required: false},
  status: { type: String, enum: ['en attente', 'traité', 'rejeté'], default: 'en attente' },  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  photos: { type: [String], required: false },
  pdf: { type: String, required: false },
  video: { type: String, required: false }
});

module.exports = mongoose.model('ReclamationPersonnel', ReclamationPersonnelSchema);