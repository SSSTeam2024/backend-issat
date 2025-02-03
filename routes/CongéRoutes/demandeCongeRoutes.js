const express = require('express');
const router = express.Router();
const demandeCongeController = require('../../controllers/CongéControllers/DemandeCongeController');

// Create a new demand
router.post('/add-demande-conge', demandeCongeController.createDemandeConge);

// Get all demandeEtudiants
router.get('/get-all-demande-conge', demandeCongeController.getAllDemandeConges);

// Get a single demandeEtudiant by ID
router.get('/get-demande-conge/:id', demandeCongeController.getDemandeCongeById);

// Update a demandeEtudiant by ID
router.put('/edit-demande-conge', demandeCongeController.updateDemandeConge);

// Delete a demandeEtudiant by ID
router.delete('/delete-demande-conge', demandeCongeController.deleteDemandeConge);

module.exports = router;