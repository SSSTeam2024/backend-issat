const express = require('express');
const departmentController = require('../../controllers/DepartementControllers/DepartementControllers');

const router = express.Router();

router.post('/create-department', departmentController.addDepartement);
router.put('/update-department/:id', departmentController.updateDepartementById);
router.get('/get-department/:id', departmentController.getDepartmentById);
router.get('/get-all-department', departmentController.getAllDeaprtements);
router.delete('/delete-department/:id', departmentController.deleteDepartementById);
// router.post('/getNotesByIdCompany',noteController.getNotesByIdCompany)
module.exports = router;