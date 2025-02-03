const express = require('express');
const posteEnseignantController = require('../../controllers/PosteEnseignantControllers/PosteEnseignantControllers');

const router = express.Router();

router.post('/create-poste-enseignant', posteEnseignantController.createPosteEnseignant);
router.put('/update-poste-enseignant/:id', posteEnseignantController.updatePosteEnseignantById);
// router.get('/getNote/:id', noteController.getNoteById);
router.get('/get-all-poste-enseignant', posteEnseignantController.getAllPostesEnseignant);
router.delete('/delete-poste-enseignant/:id', posteEnseignantController.deletePosteEnseignantById);
// router.post('/getNotesByIdCompany',noteController.getNotesByIdCompany)
module.exports = router;