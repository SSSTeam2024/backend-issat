const express = require('express');
const router = express.Router();
const avisEtudiantController = require('../../controllers/AvisEtudiantController/AvisEtudiantController');

// Create a new reclamation
router.post('/add-avis-etudiant', avisEtudiantController.createAvisEtudiant);

// Get all demandeEtudiants
router.get('/get-all-avis-etudiants', avisEtudiantController.getAllAvisEtudiants);

// Get a single demandeEtudiant by ID
router.post('/get-avis-etudiant', avisEtudiantController.getAvisEtudiantById);

// Update a demandeEtudiant by ID
router.put('/edit-avis-etudiant', avisEtudiantController.updateAvisEtudiant);

// Delete a demandeEtudiant by ID
router.delete('/delete-avis-etudiant', avisEtudiantController.deleteAvisEtudiant);

module.exports = router;