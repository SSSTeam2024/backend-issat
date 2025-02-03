const express = require('express');
const dossierAdministratifController = require('../../controllers/DossierAdministratifControllers/DossierAdministratifControllers');

const router = express.Router();

router.post('/create-dossier-administratif', dossierAdministratifController.addDossierAdministratif);
router.get('/get-all-dossiers', dossierAdministratifController.getAllDossierAdmnistratifs);
router.put('/update-dossier', dossierAdministratifController.updateDossierAdministratif);
router.delete('/remove-paper', dossierAdministratifController.removeSpecificPaperFromDossier);
router.put('/archive-dossier', dossierAdministratifController.archiveDossierAdministratif);
router.put('/restore-dossier', dossierAdministratifController.restoreDossierAdministratifController);
module.exports = router;