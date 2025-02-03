const express = require('express');
const gradePersonnelController = require('../../controllers/GradePersonnelControllers/GradePersonnelControllers');

const router = express.Router();

router.post('/create-grade-personnel', gradePersonnelController.addGradePersonnel);
router.put('/update-grade-personnel/:id', gradePersonnelController.updateGradePersonnelById);
// router.get('/getNote/:id', noteController.getNoteById);
router.get('/get-all-grades-personnel', gradePersonnelController.getAllGradePersonnel);
router.delete('/delete-grade-personnel/:id', gradePersonnelController.deleteGradePersonnelById);
// router.post('/getNotesByIdCompany',noteController.getNotesByIdCompany)
module.exports = router;