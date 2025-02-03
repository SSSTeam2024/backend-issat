const express = require('express');
const matiereController = require('../../controllers/MatiereControllers/MatiereControllers');

const router = express.Router();

router.post('/create-matiere', matiereController.addMatiere);
router.put('/update-matiere/:id', matiereController.updateMatiereById);
// router.get('/getNote/:id', noteController.getNoteById);
router.get('/get-all-matiere', matiereController.getAllMatieres);
router.delete('/delete-matiere/:id', matiereController.deleteMatiereById);
// router.post('/getNotesByIdCompany',noteController.getNotesByIdCompany)
module.exports = router;