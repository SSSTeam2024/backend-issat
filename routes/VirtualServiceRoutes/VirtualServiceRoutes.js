const express = require('express');
const router = express.Router();
const VirtualServiceController = require('../../controllers/VirtualServiceController/VirtualServiceController');

// Create a new reclamation
router.post('/add-virtual-service', VirtualServiceController.createVirtualService);

// Get all demandeEtudiants
router.get('/get-all-virtual-services', VirtualServiceController.getAllVirtualServices);

// Get a single demandeEtudiant by ID
router.post('/get-virtual-service', VirtualServiceController.getVirtualServiceById);

// Update a demandeEtudiant by ID
router.put('/edit-virtual-service', VirtualServiceController.updateVirtualService);

// Delete a demandeEtudiant by ID
router.delete('/delete-virtual-service', VirtualServiceController.deleteVirtualService);

module.exports = router;