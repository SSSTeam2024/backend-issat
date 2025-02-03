const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeplacementSchema = new Schema({
  title: { type: String, required: true },
  enseignant: { type: mongoose.Schema.Types.ObjectId, ref: "Enseignant" , default: null},
  personnel: { type: Schema.Types.ObjectId, ref: 'Personnel' , default: null},
  date_depart: {type: String, required: false},
  date_retour: {type: String, required: false},
  lieu_depart: {type: String, required: false},
  lieu_arrive: {type: String, required: false},
  accompagnants: {type: String, required: false},
  fichier: {type: String, required: false},
  info_voiture: {type: String, required: false},
  etat: {type: String, required: false}
}, 
{ timestamps: true });

module.exports = mongoose.model('Deplacement', DeplacementSchema);