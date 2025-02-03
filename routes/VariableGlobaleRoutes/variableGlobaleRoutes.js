const express = require('express');
const variableGlobaleController = require('../../controllers/VariableGlobaleController/variableGlobaleController');

const router = express.Router();

router.post('/create-variable-globale', variableGlobaleController.addVariableGlobale);
router.get('/get-all-variables-globales', variableGlobaleController.getAllVariableGlobales);
module.exports = router;