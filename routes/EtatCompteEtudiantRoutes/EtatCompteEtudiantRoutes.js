const express = require('express');
const etatEudiantController = require('../../controllers/EtatCompteEtudiantControllers/EtatCompteEtudiantControllers');

const router = express.Router();

router.post('/create-etat-etudiant', etatEudiantController.addEtatEtudiant);
router.put('/update-etat-etudiant/:id', etatEudiantController.updateEtatEtudianttById);
// router.get('/getNote/:id', noteController.getNoteById);
router.get('/get-all-etat-etudiant', etatEudiantController.getAllEtatEtudiantt);
router.delete('/delete-etat-etudiant/:id', etatEudiantController.deleteEtatEtudianttById);
// router.post('/getNotesByIdCompany',noteController.getNotesByIdCompany)
module.exports = router;