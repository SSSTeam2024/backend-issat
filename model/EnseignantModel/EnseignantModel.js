const mongoose = require("mongoose");

const enseignantSchema = new mongoose.Schema(
  {
    nom_fr: String,
    photo_profil: String,
    nom_ar: String,
    matricule: String,
    mat_cnrps: String,
    prenom_fr: String,
    prenom_ar: String,
    lieu_naissance_fr: String,
    lieu_naissance_ar: String,
    date_naissance: String,
    nationalite: String,
    etat_civil: String,
    sexe: String,
    etat_compte: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EtatCompteEnseignant",
    },
    poste: { type: mongoose.Schema.Types.ObjectId, ref: "PosteEnseignant" },
    grade: { type: mongoose.Schema.Types.ObjectId, ref: "GradeEnseignant" },
    specilaite: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SpecialiteEnseignant",
    },
    departements: { type: mongoose.Schema.Types.ObjectId, ref: "Departement" },
    papers: [
      { type: mongoose.Schema.Types.ObjectId, ref: "DossierAdministratif" },
    ],
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

    entreprise1: String,
    annee_certif1: String,
    certif1: String,

    entreprise2: String,
    annee_certif2: String,
    certif2: String,

    entreprise3: String,
    annee_certif3: String,
    certif3: String,
    category: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Enseignant", enseignantSchema);