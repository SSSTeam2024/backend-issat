const express = require('express');
const etatPersonnelController = require('../../controllers/EtatPersonnelControllers/EtatPersonnelControllers');

const router = express.Router();

router.post('/create-etat-personnel', etatPersonnelController.addEtatPersonnel);
router.put('/update-etat-personnel/:id', etatPersonnelController.updateEtatPersonnelById);
// router.get('/getNote/:id', noteController.getNoteById);
router.get('/get-all-etat-personnel', etatPersonnelController.getAllEtatPersonnel);
router.delete('/delete-etat-personnel/:id', etatPersonnelController.deleteEtatPersonnelById);
// router.post('/getNotesByIdCompany',noteController.getNotesByIdCompany)
module.exports = router;