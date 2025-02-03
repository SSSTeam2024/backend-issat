const express = require('express');
const shortCodeController = require('../../controllers/ShortCodeController/shortCodeController');

const router = express.Router();

router.post('/create-short-code', shortCodeController.addShortCode);
router.get('/get-all-short-codes', shortCodeController.getAllShortCodes);
module.exports = router;