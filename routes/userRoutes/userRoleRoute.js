const express = require('express');
const router = express.Router();
const userRoleController = require('../../controllers/userControllers/userRoleController');

router.get('/get-all-user-roles', userRoleController.getAllUserRoles);
router.post('/create-user-role', userRoleController.createUserRole);

router.put('/update-user-role', userRoleController.updateUserRole);
router.delete('/delete-user-role', userRoleController.deleteUserRole);
module.exports = router;