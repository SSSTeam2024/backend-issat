const express = require('express');
const typeInscriptionEudiantController = require('../../controllers/TypeInscriptionEtudiantControllers/TypeInscriptionEtudiantControllers');

const router = express.Router();

router.post('/create-type-inscription-etudiant', typeInscriptionEudiantController.addTypeInscriptionEtudiant);
router.put('/update-type-inscription-etudiant/:id', typeInscriptionEudiantController.updateTypeInscriptionEtudiantById);
// router.get('/getNote/:id', noteController.getNoteById);
router.get('/get-all-type-inscription-etudiant', typeInscriptionEudiantController.getAllTypeInscriptionEtudiantt);
router.delete('/delete-type-inscription-etudiant/:id', typeInscriptionEudiantController.deleteTypeInscriptionEtudianttById);
// router.post('/getNotesByIdCompany',noteController.getNotesByIdCompany)
module.exports = router;