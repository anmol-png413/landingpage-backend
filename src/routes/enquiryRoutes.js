const express = require('express')
const router = express.Router()
const { submitEnquiry } = require('../controllers/enquiryController')

// POST /api/enquiry/:slug
// slug = landing page identifier (e.g. 'gaurs-bento', 'au-realty')
router.post('/:slug', submitEnquiry)

module.exports = router
