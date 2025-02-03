const express = require('express');
const sectionClasseController = require('../../controllers/SectionClasseControllers/SectionClasseControllers');

const router = express.Router();

router.post('/create-section-classe', sectionClasseController.addSectionClasse);
router.put('/update-section-classe/:id', sectionClasseController.updateSectionClasseById);
// router.get('/getNote/:id', noteController.getNoteById);
router.get('/get-all-section-classe', sectionClasseController.getAllSectionClasse);
router.delete('/delete-section-classe/:id', sectionClasseController.deleteSectionClasseById);
// router.post('/getNotesByIdCompany',noteController.getNotesByIdCompany)
module.exports = router;