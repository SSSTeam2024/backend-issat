const express = require('express');
const papierAdministratifController = require('../../controllers/PapierAdministratifControllers/PapierAdministratifControllers');

const router = express.Router();

router.post('/create-papier-administratif', papierAdministratifController.addPapierAdministratif);
router.put('/update-papier-administratif', papierAdministratifController.updatePapierAdministratiftById);
router.get('/get-all-papier-administratif', papierAdministratifController.getPapierAdministratifs);
router.delete('/delete-papier-administratif/:id', papierAdministratifController.deletePapierAdministratif);
module.exports = router;