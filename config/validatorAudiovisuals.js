const validatorAudiovisuals = (req, res, next) => {
    if(req.body.title === '' || req.body.director === '' || req.body.year === ''  || req.body.cast === [] || req.body.categories === [] || req.body.trailerLink === '' || req.body.premium === null || req.body.originalLanguage === '' || req.body.audiovisualType === '' || req.body.audienceAge === '' || req.body.sinopsis === '' || req.body.imageURL === ''){
        return res.json({success: false, error: 'You cannot send empty values.'})
    }else {
    next()
    }
}

module.exports = validatorAudiovisuals