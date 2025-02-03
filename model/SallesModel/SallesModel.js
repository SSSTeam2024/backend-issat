const mongoose = require('mongoose');

const salleSchema = new mongoose.Schema({
  salle: String,
  emplacement: String,
  type_salle: String,
  departement: { type: mongoose.Schema.Types.ObjectId, ref: 'Departement' } 

},
{ timestamps: true });

module.exports = mongoose.model('Salle', salleSchema);