const mongoose = require("mongoose");

const personnelSchema = new mongoose.Schema(
  {
    nom_fr: String,
    nom_ar: String,
    photo_profil: String,
    matricule: String,
    mat_cnrps: String,
    prenom_fr: String,
    photo_profil: String,
    prenom_ar: String,
    lieu_naissance_fr: String,
    lieu_naissance_ar: String,
    date_naissance: String,
    nationalite: String,
    etat_civil: String,
    sexe: String,
    date_designation: String,
    etat_compte: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EtatPersonnel",
    },
    poste: { type: mongoose.Schema.Types.ObjectId, ref: "PostePersonnel" },
    grade: { type: mongoose.Schema.Types.ObjectId, ref: "GradePersonnel" },
    categorie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CategoriePersonnel",
    },
    service: { type: mongoose.Schema.Types.ObjectId, ref: "ServicePersonnel" },
  
    papers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DossierAdministratif' }],

    date_affectation: String,
    compte_courant: String,
    identifinat_unique: String,
    num_cin: String,
    date_delivrance: String,

    state: String,
    dependence: String,
    code_postale: String,
    adress_ar: String,
    adress_fr: String,
    num_phone1: String,
    num_phone2: String,
    email: String,
    nom_conjoint: String,
    job_conjoint: String,
    nombre_fils: String,
    category: [String], 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Personnel", personnelSchema);