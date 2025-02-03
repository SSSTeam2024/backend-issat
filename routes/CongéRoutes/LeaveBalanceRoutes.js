const express = require('express');
const router = express.Router();
const leaveBalanceController = require('../../controllers/CongéControllers/LeaveBalanceController');

// Create a new demand
router.post('/add-leave-balance', leaveBalanceController.createLeaveBalance);
router.post('/add-edit-leave-balance', leaveBalanceController.createOrUpdateLeaveBalance);
// Get all demandeEtudiants
router.get('/get-all-leave-balances', leaveBalanceController.getAllLeaveBalance);

// Get a single demandeEtudiant by ID
router.get('/get-leave-balance/:id', leaveBalanceController.getLeaveBalanceById);

// Update a demandeEtudiant by ID
router.put('/edit-leave-balance', leaveBalanceController.updateLeaveBalance);

// Delete a demandeEtudiant by ID
router.delete('/delete-leave-balance', leaveBalanceController.deleteLeaveBalance);

module.exports = router;