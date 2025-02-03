const express = require('express');
const specialiteEnseignantController = require('../../controllers/SpecialiteEnseignantControllers/SpecialiteEnseignantControllers');

const router = express.Router();

router.post('/create-specialite-enseignant', specialiteEnseignantController.addSpecialiteEnseignant);
router.put('/update-specialite-enseignant/:id', specialiteEnseignantController.updateSpecialiteEnseignantById);
// router.get('/getNote/:id', noteController.getNoteById);
router.get('/get-all-specialite-enseignant', specialiteEnseignantController.getAllSpecialiteEnseignant);
router.delete('/delete-specialite-enseignant/:id', specialiteEnseignantController.deleteSpecialiteEnseignantById);
// router.post('/getNotesByIdCompany',noteController.getNotesByIdCompany)
module.exports = router;