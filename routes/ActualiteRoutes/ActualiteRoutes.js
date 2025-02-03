const express = require('express');
const router = express.Router();
const ActualiteController = require('../../controllers/ActualiteController/ActualiteController');

// Create a new reclamation
router.post('/add-actualite', ActualiteController.createActualite);

// Get all demandeEtudiants
router.get('/get-all-actualites', ActualiteController.getAllActualites);

// Get a single demandeEtudiant by ID
router.post('/get-actualite', ActualiteController.getActualiteById);

// Update a demandeEtudiant by ID
router.put('/edit-actualite', ActualiteController.updateActualite);

// Delete a demandeEtudiant by ID
router.delete('/delete-actualite', ActualiteController.deleteActualite);

module.exports = router;