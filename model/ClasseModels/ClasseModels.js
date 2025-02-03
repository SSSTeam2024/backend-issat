const mongoose = require('mongoose');

const classeSchema = new mongoose.Schema({
  nom_classe_fr: String,
  nom_classe_ar: String,
  departement: { type: mongoose.Schema.Types.ObjectId, ref: 'Departement' } ,
  niveau_classe: { type: mongoose.Schema.Types.ObjectId, ref: 'NiveauClasse' } ,
  matieres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Matiere' }]

},
{ timestamps: true });

module.exports = mongoose.model('Classe', classeSchema);