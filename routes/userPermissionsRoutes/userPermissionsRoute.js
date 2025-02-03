const express = require('express');
const router = express.Router();
const userPermissionsController = require('../../controllers/userPermissionsControllers/userPermissionsController');

// router.post('/get-all-user-permissions', userPermissionsController.getAllPermissionsByUserId);
// router.post('/assign-user-permissions', userPermissionsController.assignUserPermissions);
router.post('/add-permission', userPermissionsController.createPermission)
router.post('/add-permissions', userPermissionsController.createPermissions)
router.get('/get-permissions', userPermissionsController.getAllPermissions)
router.post('/assign-user-permissions', userPermissionsController.assignPermissionsToUser)
router.post('/delete-user-permissions', userPermissionsController.deletePermissions);
router.get('/:userId/permissions', userPermissionsController.getPermissionsByUserId)
router.put('/update-permissions', userPermissionsController.updatePermissionsForUser);
router.put('/update-permissions-history', userPermissionsController.updatePermissionsForUserHistory);
router.get('/:userId/permissions-history', userPermissionsController.getUserPermissionHistory);



module.exports = router;
