const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const audiovisualController = require('../controllers/audiovisualController')
const seasonController = require('../controllers/seasonController')
const profileController = require('../controllers/profileController')
const validatorAudiovisuals = require('../config/validatorAudiovisuals')
const validatorUser = require('../config/validatorUser')
const passport = require('passport')
const rateControllers = require('../controllers/rateControllers')

const { newUser, logIn, logInForced, selectPremium } = userController
const { getAllAudiovisuals, getSingleAudiovisual, addAudiovisual, deleteAudiovisual, updateAudiovisual, addOrRemoveRate, addComment, modifyOrRemoveComment } = audiovisualController
const { getAllSeasons, addSeason, deleteSeason, modifySeason, getSinleSeason  } = seasonController
const {createProfile, getAllProfiles, getSingleProfile, updateProfile, deleteProfile, addToList, getUserProfiles, getAllListedAudivisuals}= profileController
const { personalRate } = rateControllers


router.route('/audiovisuals')
.get(getAllAudiovisuals)
.post(validatorAudiovisuals, addAudiovisual)

router.route('/audiovisual/:id')
.get(getSingleAudiovisual)
.delete(deleteAudiovisual)
.put(updateAudiovisual)

router.route('/audiovisual/rate/:id')
.put(passport.authenticate('jwt', {session: false}), addOrRemoveRate)

router.route('/audiovisual/comments/:id')
.post(passport.authenticate('jwt', {session: false}), addComment)
.put(passport.authenticate('jwt', {session: false}), modifyOrRemoveComment)

router.route('/user/signup')
.post(validatorUser, newUser)

router.route('/user/login')
.post(logIn)

router.route('/user/loginForced')
.get(passport.authenticate('jwt', {session:false}), logInForced)

router.route('/profile/:id')
.get(getUserProfiles)
.get(getSingleProfile)
.put(updateProfile)
.post(createProfile)

router.route('/profile/delete/:id')
.put(deleteProfile)

router.route('/profile/mylist/:id')
.get(getAllListedAudivisuals)

router.route('/profiles')
.get(getAllProfiles)


router.route('/profile/addToList/:id')
.put(passport.authenticate('jwt', {session: false}), addToList)

router.route('/season/:id')
.get(getSinleSeason)
.delete(deleteSeason)
.put(modifySeason)

router.route('/seasons')
.get(getAllSeasons)
.post(addSeason)

router.route('/rate/:id')
.post(passport.authenticate('jwt', {session: false}), personalRate)

router.route("/selectPremium")
.put(passport.authenticate("jwt",{ session:false }), selectPremium )



module.exports = router