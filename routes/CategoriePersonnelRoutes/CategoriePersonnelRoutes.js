const express = require('express');
const categoriePersonnelController = require('../../controllers/CategoriePersonnelControllers/CategoriePersonnelControllers');

const router = express.Router();

router.post('/create-categorie-personnel', categoriePersonnelController.addCategoriePersonnel);
router.put('/update-categorie-personnel/:id', categoriePersonnelController.updateCategoriePersonnelById);
// router.get('/getNote/:id', noteController.getNoteById);
router.get('/get-all-categorie-personnel', categoriePersonnelController.getAllCategoriePersonnel);
router.delete('/delete-categorie-personnel/:id', categoriePersonnelController.deleteCategoriePersonnelById);
// router.post('/getNotesByIdCompany',noteController.getNotesByIdCompany)
module.exports = router;