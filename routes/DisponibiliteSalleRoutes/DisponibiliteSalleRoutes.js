const express = require('express');
const disponibiliteSalleController = require('../../controllers/SalleDisponibiliteControllers/SalleDisponibiliteControllers');

const router = express.Router();

router.post('/get-disponibilite-salle', disponibiliteSalleController.getFullyOrPartialAvailableRoomsByTimeInterval);
router.get('/get-all-disponibilite-salle', disponibiliteSalleController.getAllDisponibiliteSalles);


module.exports = router;