
const mongoose = require('mongoose');

const SalleDisponibiliteSchema = new mongoose.Schema({
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Salle', required: true },
    dayOfWeek: { type: String, required: true }, // 0 for Monday, 5 for Saturday
    timeSlot: { type: String, required: true }, // e.g., '08:00', '08:30', etc.
    isAvailable: { type: String , required: true},
    occupationType: {type: String, default: null}, // if isAvailable = '1' => 'Totally occupied for sessions of type 1' | 'Partially occupied for sessions of type 1/15'
                                                     // if isAvailable = '0' => First created: null / Changed: 'Empty string'
  },
  { timestamps: true });
  
  module.exports = mongoose.model('SalleDisponibilite', SalleDisponibiliteSchema);