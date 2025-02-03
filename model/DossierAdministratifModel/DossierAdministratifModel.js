const mongoose = require('mongoose');

const DossierAdministratifSchema = new mongoose.Schema({
  isArchived: { type: Boolean, default: false },
  enseignant: { type: mongoose.Schema.Types.ObjectId, ref: 'Enseignant' },
  personnel: { type: mongoose.Schema.Types.ObjectId, ref: 'Personnel' },
  papers: [
    {
      papier_administratif: { type: mongoose.Schema.Types.ObjectId, ref: 'PapierAdministratif' },
      annee: String,
      remarques: String,
      file: String
    }
  ],
}, {
  timestamps: true,
});

module.exports = mongoose.model('DossierAdministratif', DossierAdministratifSchema);