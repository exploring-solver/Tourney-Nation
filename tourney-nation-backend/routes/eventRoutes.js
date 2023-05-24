const express = require('express');
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator')

module.exports = router;