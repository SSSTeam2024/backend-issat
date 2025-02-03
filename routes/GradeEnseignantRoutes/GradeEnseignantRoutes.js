const express = require('express');
const gradeEnseignantController = require('../../controllers/GradeEnseignantControllers/GradeEnseignantControllers');

const router = express.Router();

router.post('/create-grade-enseignant', gradeEnseignantController.addGradeEnseignant);
router.put('/update-grade-enseignant/:id', gradeEnseignantController.updateGradeEnseignantById);
// router.get('/getNote/:id', noteController.getNoteById);
router.get('/get-all-grade-enseignant', gradeEnseignantController.getAllGradeEnseignant);
router.delete('/delete-grade-enseignant/:id', gradeEnseignantController.deleteGradeEnseignantById);
// router.post('/getNotesByIdCompany',noteController.getNotesByIdCompany)
module.exports = router;