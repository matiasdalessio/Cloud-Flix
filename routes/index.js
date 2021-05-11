const express = require('express')
const router = express.Router()
<<<<<<< HEAD
const usersControllers = require('../controllers/usersControllers')
const validatorUser = require('../config/validator')
const passport = require('passport')

const {loadNewUser, userLogin, loginForced} = usersControllers


/*Users*/
router.route('/user/signup')
.post(validatorUser, loadNewUser)

router.route('/user/login')
.post(userLogin)

router.route('/user/loginForced')
.get(passport.authenticate('jwt', {session:false}), loginForced)
=======
const seasonControllers = require('../controllers/seasonController')

const { allSeasons, allSeasons, deleteSeason } = seasonControllers

router.route('/seasons')
.get(allSeasons)
.post(allSeasons)
.delete(deleteSeason)

module.exports = router
>>>>>>> 3b24b29c3ff4e5b333cf0da55cf01743903ce490
