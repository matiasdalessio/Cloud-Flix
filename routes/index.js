const express = require('express')
const router = express.Router()
const usersControllers = require('../controllers/usersControllers')
const audiovisualController = require('../controllers/audiovisualController')
const seasonControllers = require('../controllers/seasonController')
const validatorAudiovisuals = require('../config/validatorAudiovisuals')
const validatorUser = require('../config/validator')
const passport = require('passport')

const { loadNewUser, userLogin, loginForced } = usersControllers
const { getAllAudiovisuals, getSingleAudiovisual, addAudiovisual, deleteAudiovisual, updateAudiovisual, addOrRemoveRate, addComment, modifyOrRemoveComment } = audiovisualController
const { allSeasons, addSeason, deleteSeason, modifySeason, season  } = seasonControllers


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
.post(userLogin)

router.route('/user/loginForced')
.get(passport.authenticate('jwt', {session:false}), loginForced)

router.route('/seasons/:id')
.get(season)
.delete(deleteSeason)
.put(modifySeason)

router.route('/season')
.get(allSeasons)
.post(addSeason)





module.exports = router










