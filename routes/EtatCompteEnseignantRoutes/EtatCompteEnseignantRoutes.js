const express = require('express');
const etatEnseignantController = require('../../controllers/EtatEnseignantControllers/EtatEnseignantControllers');

const router = express.Router();

router.post('/create-etat-enseignant', etatEnseignantController.addEtatEnseignant);
router.put('/update-etat-enseignant/:id', etatEnseignantController.updateEtatEnseignantById);
// router.get('/getNote/:id', noteController.getNoteById);
router.get('/get-all-etat-enseignant', etatEnseignantController.getAllEtatEnseignant);
router.delete('/delete-etat-enseignant/:id', etatEnseignantController.deleteEtatEnseignantById);
// router.post('/getNotesByIdCompany',noteController.getNotesByIdCompany)
module.exports = router;