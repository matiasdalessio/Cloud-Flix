const validatorAudiovisuals = (req, res, next) => {
    if(req.body.title === '' || req.body.director === '' || req.body.year === ''  || req.body.cast.length === 0 || req.body.categories.length === 0  || req.body.premium === '' || req.body.availableLanguages.length === 0 || req.body.availableSubtitles.length === 0 || req.body.audiovisualType === '' || req.body.audienceAge === '' || req.body.sinopsis === '' || req.body.imageURL === '' || req.body.duration === ''){
        return res.json({success: false, error: 'You cannot send empty values.'})
    }else {
    next()
    }
}

module.exports = validatorAudiovisuals