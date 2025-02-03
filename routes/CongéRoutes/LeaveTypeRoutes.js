const express = require('express');
const router = express.Router();
const leaveTypeController = require('../../controllers/CongéControllers/LeaveTypeController');


router.post('/add-leave-type', leaveTypeController.createLeaveType);


router.get('/get-all-leave-types', leaveTypeController.getAllLeaveType);


router.post('/get-leave-type-by-id', leaveTypeController.getLeaveTypeById);


router.put('/edit-leave-type', leaveTypeController.updateLeaveType);


router.delete('/delete-leave-type', leaveTypeController.deleteLeaveType);


router.post('/subcategory', leaveTypeController.getSubcategoryById);

module.exports = router;