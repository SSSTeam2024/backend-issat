const express = require('express');
const router = express.Router();
const avisEnseignantController = require('../../controllers/AvisEnseignantController/AvisEnseignantController');


router.post('/add-avis-enseignant', avisEnseignantController.createAvisEnseignant);


router.get('/get-all-avis-enseignants', avisEnseignantController.getAllAvisEnseignants);


router.post('/get-avis-enseignant', avisEnseignantController.getAvisEnseignantById);


router.put('/edit-avis-enseignant', avisEnseignantController.updateAvisEnseignant);

router.delete('/delete-avis-enseignant', avisEnseignantController.deleteAvisEnseignant);

module.exports = router;