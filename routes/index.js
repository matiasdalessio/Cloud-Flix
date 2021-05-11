const express = require('express')
const router = express.Router()
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
