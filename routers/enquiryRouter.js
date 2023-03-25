const express = require('express');
const router = express.Router();
const enquiry = require('../controllers/enquiryController')

router.post('/add',enquiry.enquiry)

module.exports = router
