const express = require('express');
const servicePersonnelController = require('../../controllers/ServicePersonnelControllers/ServicePersonnelControllers');

const router = express.Router();

router.post('/create-service-personnel', servicePersonnelController.addServicePersonnel);
router.put('/update-service-personnel/:id', servicePersonnelController.updateServicePersonnelById);
// router.get('/getNote/:id', noteController.getNoteById);
router.get('/get-all-service-personnel', servicePersonnelController.getAllServicePersonnel);
router.delete('/delete-service-personnel/:id', servicePersonnelController.deleteServicePersonnelById);
// router.post('/getNotesByIdCompany',noteController.getNotesByIdCompany)
module.exports = router;