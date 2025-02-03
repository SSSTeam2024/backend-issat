const express = require('express');
const postePersonnelController = require('../../controllers/PostePersonnelControllers/PostePersonnelControllers');

const router = express.Router();

router.post('/create-poste-personnel', postePersonnelController.createPostePersonnel);
router.put('/update-poste-personnel/:id', postePersonnelController.updatePostePersonnelById);
router.get('/get-all-poste-personnel', postePersonnelController.getAllPostesPersonnel);
router.delete('/delete-poste-personnel/:id', postePersonnelController.deletePostePersonnelById);
module.exports = router;