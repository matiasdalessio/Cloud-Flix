const express = require('express')
const router = express.Router()
const seasonControllers = require('../controllers/seasonController')

const { allSeasons, allSeasons, deleteSeason } = seasonControllers

router.route('/seasons')
.get(allSeasons)
.post(allSeasons)
.delete(deleteSeason)

module.exports = router
