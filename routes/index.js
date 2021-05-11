const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const audiovisualController = require('../controllers/audiovisualController')
const seasonController = require('../controllers/seasonController')
const profileController = require('../controllers/profileController')
const validatorAudiovisuals = require('../config/validatorAudiovisuals')
const validatorUser = require('../config/validator')
const passport = require('passport')

const { loadNewUser, userLogIn, logInForced } = usersController
const { getAllAudiovisuals, getSingleAudiovisual, addAudiovisual, deleteAudiovisual, updateAudiovisual, addOrRemoveRate, addComment, modifyOrRemoveComment } = audiovisualController
const { getAllSeasons, addSeason, deleteSeason, modifySeason, getSinleSeason  } = seasonController
const {createProfile, loadAllProfiles, loadSingleProfile, updateProfile, deleteProfile}= profileController


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
.post(validatorUser, loadNewUser)

router.route('/user/login')
.post(userLogIn)

router.route('/user/loginForced')
.get(passport.authenticate('jwt', {session:false}), logInForced)

router.route('/profile/:id')
.get(loadSingleProfile)
.delete(deleteProfile)
.put(updateProfile)

router.route('/profiles')
.get(loadAllProfiles)
.post(createProfile)

router.route('/season/:id')
.get(getSinleSeason)
.delete(deleteSeason)
.put(modifySeason)

router.route('/seasons')
.get(getAllSeasons)
.post(addSeason)




module.exports = router










