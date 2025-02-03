const express = require('express');
const timeTableParamsController = require('../../controllers/TimeTableParamsControllers/TimeTableParamsControllers');

const router = express.Router();

router.post('/create-time-table-params', timeTableParamsController.addTimeTableParams);
router.put('/update-time-table-params', timeTableParamsController.updateTimeTableParams);
router.get('/get-time-table-params', timeTableParamsController.getTimeTableParams);
module.exports = router;