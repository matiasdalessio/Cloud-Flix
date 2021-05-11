const express = require('express')
const router = express.Router()
const usersControllers = require('../controllers/usersControllers')
const validador = require('../config/validator')
const passport = require('passport')

/*Users*/
router.route('/user/signup')
.post(validador, usersControllers.loadNewUser)

router.route('/user/login')
.post(usersControllers.userLogin)

router.route('/user/loginForced')
.get(passport.authenticate('jwt', {session:false}), usersControllers.loginForced)

/*Profiles*/

