const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MissionSchema = new Schema({
  motif: { type: String, required: true },
  enseignant: { type: mongoose.Schema.Types.ObjectId, ref: "Enseignant" , default: null},
  personnel: { type: Schema.Types.ObjectId, ref: 'Personnel' , default: null},
  date_affectation: {type: String, required: false},
  date_fin: {type: String, required: false},
  objectif: {type: String, required: false},
  etat: {type: String, required: false}
}, 
{ timestamps: true });

module.exports = mongoose.model('Mission', MissionSchema);