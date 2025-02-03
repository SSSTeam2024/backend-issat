const express = require('express');
const router = express.Router();
const demandePersonnelController = require('../../controllers/demandePersonnelControllers/DemandePersonnelControllers')

// Create a new reclamation
router.post('/add-demande-personnel', demandePersonnelController.createDemandePersonnel);

// Get all demandePersonnels
router.get('/get-all-demande-Personnels', demandePersonnelController.getAllDemandePersonnels);

// Get a single demandePersonnel by ID
router.get('/get-demande-Personnel/:id', demandePersonnelController.getDemandePersonnelById);

// Update a demandePersonnel by ID
router.put('/edit-demande-Personnel/:id', demandePersonnelController.updateDemandePersonnel);

// Delete a demandePersonnel by ID
router.delete('/delete-demande-Personnel/:id', demandePersonnelController.deleteDemandePersonnel);

module.exports = router;