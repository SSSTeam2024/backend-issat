const express = require('express');
const router = express.Router();
const eventController = require('../../controllers/eventContoller/eventController');

router.get('/get-all-events', eventController.getAllEvents);
router.post('/create-event', eventController.createEvent);

module.exports = router;
