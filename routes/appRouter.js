const Router = require("express");
const router = new Router();

const eventRoutes = require("./eventRoutes/eventRoutes");
const userPermissionsRoutes = require("./userPermissionsRoutes/userPermissionsRoute");
const userRoutes = require("./userRoutes/userRoute");
const etatPersonnelRoutes = require("./etatPersonnelRoutes/etatPersonnelRoutes");
const postePersonnelRoutes = require("./postePersonnelRoutes/postePersonnelRoutes");
const gradePersonnelRoutes = require("./GradePersonnelRoutes/GradePersonnelRoutes");
const categoriePersonnelRoutes = require("./CategoriePersonnelRoutes/CategoriePersonnelRoutes");
const servicePersonnelRoutes = require("./ServicesPersonnelRoutes/ServicesPersonnelRoutes");
const etatEnseignantRoutes = require("./EtatCompteEnseignantRoutes/EtatCompteEnseignantRoutes");
const posteEnseignantRoutes = require("./PosteEnseignantRoutes/PosteEnseignantRoutes");
const gradeEnseignantRoutes = require("./GradeEnseignantRoutes/GradeEnseignantRoutes");
const specialiteEnseignantRoutes = require("./SpecialiteEnseignantRoutes/SpecialiteEnseignantRoutes");
const etatEtudiantRoutes = require("./EtatCompteEtudiantRoutes/EtatCompteEtudiantRoutes");
const typeInscriptionEtudiantRoutes = require("./TypeInscriptionEtudiantRoutes/TypeInscriptionEtudiantRoutes");
const departmentRoutes = require("./DepartementRoutes/DepartementRoutes");
const niveauClasseRoutes = require("./NiveauClasseRoutes/NiveauClasseRoutes");
const sectionClasseRoutes = require("./SectionClasseRoutes/SectionClasseRoutes");
const matiereRoutes = require("./MatiereRoutes/MatiereRoutes");
const salleRoutes = require("./SalleRoutes/SalleRoutes");
const classeRoutes = require("./ClasseRoutes/ClasseRoutes");
const etudiantRoutes = require("./EtudiantRoutes/EtudiantRoutes");
const reclamationEtudiantRoutes = require("./ReclamationEtudiantRoutes/ReclamationEtudiantRoutes");
const reclamationEnseignantRoutes = require("./ReclamationEnseignantRoutes/ReclamationEnseignantRoutes");
const reclamationPeronnelRoutes = require("./ReclamationPersonnelRoutes/ReclamationPersonnelRoutes");
const demandeEtudiantRoutes = require("./DemandeEtudiantRoutes/DemandeEtudiantRoutes");
const demandeEnseignantRoutes = require("./DemandeEnseignantRoutes/demandeEnseignantRoutes");
const demandePersonnelRoutes = require("./DemandePersonnelRoutes/DemandePersonnelRoutes");
const enseignantRoutes = require("./EnseignantRoutes/EnseignantRoutes");
const personnelRoutes = require("./PersonnelRoutes/PersonnelRoutes");
const avisEtudiantRoutes = require("./AvisEtudiantRoutes/AvisEtudiantRoutes");
const templateBodyRoutes = require("./TemplateBodyRoutes/templateBodyRoutes");
const shortCodeRoutes = require("./ShortCodeRoutes/shortCodeRoutes");
const variableGlobaleRoutes = require("./VariableGlobaleRoutes/variableGlobaleRoutes");
const avisEnseignantRoutes = require("./AvisEnseignantRoutes/AvisEnseignantRoutes");
const avisPersonnelRoutes = require("./AvisPersonnelRoutes/AvisPersonnelRoutes");
const actualiteRoutes = require("./ActualiteRoutes/ActualiteRoutes");
const papierAdministratif = require("./PapierAdministratifRoutes/PapierAdministratifRoutes");

const dossierAdministratif = require("./DossierAdministratifRoutes/DossierAdministratifRoutes");
const leaveBalance = require("./CongéRoutes/LeaveBalanceRoutes");
const leaveType = require("./CongéRoutes/LeaveTypeRoutes");
const demandeConge = require("./CongéRoutes/demandeCongeRoutes");

const ficheVoeuxRoutes = require("./FicheVoeuxRoutes/FicheVoeuxRoutes");

const seanceRoutes = require("./SeanceRoutes/SeanceRoutes");

const disponibiliteSalleRoutes = require("./DisponibiliteSalleRoutes/DisponibiliteSalleRoutes");

const timeTableParams = require("./TimeTableParamsRoutes/TimeTableParamsRoutes");

const typeSeance = require("./TypeSeanceRoutes/TypeSeanceRoutes");

const classPeriod = require("./ClassEmploiPeriodiqueRoutes/ClassEmploiPeriodiqueRoutes");
const teacherPeriod = require("./TeacherPeriodRoutes/TeacherPeriodRoutes");

const rattrapageRoutes = require("./RattrapageRoutes/RattrapageRoutes");

const examenRoutes = require("./ExamenRoutes/ExamenRoutes");

const domaineClasseRoutes = require("./DomaineClasseRoutes/DomaineClasseRoutes");
const mentionClasseRoutes = require("./MentionClasseRoutes/MentionClasseRoutes");

const typeParcoursRoutes = require("./TypeParcoursRoutes/TypeParcoursRoutes");

const parcoursRoutes = require("./ParcoursRoutes/ParcoursRoutes");
const moduleParcoursRoutes = require("./ModuleParcoursRoutes/ModuleParcoursRoutes");

router.use("/type-parcours", typeParcoursRoutes);

router.use("/parcours", parcoursRoutes);

router.use("/module-parcours", moduleParcoursRoutes);

router.use("/domaine-classe", domaineClasseRoutes);
router.use("/mention-classe", mentionClasseRoutes);
//! Notes Examen
const notesExamenRoutes = require("./NotesExamenRoutes/notesExamenRoutes");
const virtualServiceRoutes = require("./VirtualServiceRoutes/VirtualServiceRoutes");

const deplacementRoutes = require("./DeplacementRoutes/DeplacementRoutes");
const missionRoutes = require("./MissionRoutes/MissionRoutes");
const noteProRoutes = require("./NoteProRoutes/NoteProRoutes");

// gestion des conges
router.use("/examen", examenRoutes);

router.use("/virtual-service", virtualServiceRoutes);

router.use("/LeaveBalance", leaveBalance);
router.use("/LeaveType", leaveType);
router.use("/demandeConge", demandeConge);

router.use("/event", eventRoutes);
router.use("/user-permissions", userPermissionsRoutes);
router.use("/user", userRoutes);
router.use("/enseignant", enseignantRoutes);

router.use("/personnel", personnelRoutes);

router.use("/etat-personnel", etatPersonnelRoutes);
router.use("/poste-personnel", postePersonnelRoutes);
router.use("/grade-personnel", gradePersonnelRoutes);
router.use("/categorie-personnel", categoriePersonnelRoutes);
router.use("/service-personnel", servicePersonnelRoutes);
router.use("/etat-enseignant", etatEnseignantRoutes);
router.use("/poste-enseignant", posteEnseignantRoutes);
router.use("/grade-enseignant", gradeEnseignantRoutes);
router.use("/specialite-enseignant", specialiteEnseignantRoutes);

// etudiant
router.use("/etudiant", etudiantRoutes);
router.use("/etat-etudiant", etatEtudiantRoutes);
router.use("/type-inscription-etudiant", typeInscriptionEtudiantRoutes);

// departement
router.use("/department", departmentRoutes);

//niveau classe

router.use("/niveau-classe", niveauClasseRoutes);
// section classe

router.use("/section-classe", sectionClasseRoutes);

//matiere

router.use("/matiere", matiereRoutes);
//Salle
router.use("/salle", salleRoutes);

//Classe
router.use("/classe", classeRoutes);

//reclamation etudiant/ enseignant/ personnel
router.use("/reclamation-etudiant", reclamationEtudiantRoutes);
router.use("/reclamation-enseignant", reclamationEnseignantRoutes);
router.use("/reclamation-personnel", reclamationPeronnelRoutes);
//demande etudiant / enseignant/ personnel
router.use("/demande-etudiant", demandeEtudiantRoutes);
router.use("/demande-enseignant", demandeEnseignantRoutes);
router.use("/demande-personnel", demandePersonnelRoutes);
router.use("/template-body", templateBodyRoutes);
router.use("/short-code", shortCodeRoutes);
router.use("/variable-globale", variableGlobaleRoutes);
// Avis etudiant // enseignant / personnel
router.use("/avis-etudiant", avisEtudiantRoutes);
router.use("/avis-enseignant", avisEnseignantRoutes);
router.use("/avis-personnel", avisPersonnelRoutes);
// actualite
router.use("/actualite", actualiteRoutes);
//papier administratif
router.use("/papierAdministratif", papierAdministratif);
//dossier administratif
router.use("/dossierAdministratif", dossierAdministratif);

//rattrapage
router.use("/rattrapage", rattrapageRoutes);

//class period
router.use("/class-period", classPeriod);

//teacher period
router.use("/teacher-period", teacherPeriod);

//typeSeance
router.use("/type-seance", typeSeance);

//Time Table Params
router.use("/timeTableParams", timeTableParams);

//fiche voeux
router.use("/fiche-voeux", ficheVoeuxRoutes);
//Seance
router.use("/seance", seanceRoutes);

//disponibilite
router.use("/disponibilite-salle", disponibiliteSalleRoutes);
//deplacement
router.use("/deplacement", deplacementRoutes);
//deplacement
router.use("/mission", missionRoutes);

//notes pro
router.use("/note-pro", noteProRoutes);

//Notes Examen
router.use("/notes", notesExamenRoutes);

module.exports = router;
