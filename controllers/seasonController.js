const Season = require('../models/Season')

const seasonControllers = {
    getAllSeasons: async (req, res) => {
        var response;
        var err;        
        try {
            const seasons = await Season.find()
            response = seasons
        } catch(error) {
            err = 'An unexpected error has occurred with our servers'
        }        
        res.json({
            success: !err ? true : false,
            response: !err && response,
            err: err
        })
    },    
    getSinleSeason: async (req, res) => {
        const id = req.params.id     
        var response;
        var err;    
        try {
            const season = await Season.findOne({_id: id})
            response = season
        } catch(error) {
            err = 'An unexpected error has occurred with our servers'
        }    
        res.json({
            success: !err ? true : false,
            response: !err && response,
            err: err
        })
    },
    addSeason: async (req,res) => {
        const { numberSeason, chapters, idAudiovisual } = req.body 
        var response;
        var err;
        try {
            const seasonToSave = new Season({
                numberSeason,
                chapters,
                idAudiovisual
            })
            await seasonToSave.save()
            response = seasonToSave
        } catch(error) {
            err = 'An unexpected error has occurred with our servers'
        }
        res.json({
            success: !err ? true : false,
            response: !err && response,
            err: err
        })
    },
    deleteSeason: async (req, res) => {
        const id = req.params.id
        var response;
        var err;
        try {
            await Season.findOneAndDelete({_id: id})
            const seasons = await Season.find()
            response = seasons 
        } catch(error) {
            err = 'An unexpected error has occurred with our servers'
        }
        res.json({
            success: !err ? true : false,
            response: !err && response,
            err: err
        })
    },
    modifySeason: async (req,res) => {
        const id = req.params.id
        var response;
        var err;
        try {
            await Season.findOneAndUpdate({_id: id}, {...req.body}, {new: true})
            const seasons  = await Season.find()
            response = seasons
        } catch(error) {
            err = 'An unexpected error has occurred with our servers'
        }
        res.json({
            success: !err ? true : false,
            response: !err && response,
            err: err
        })
    },

    seasonsBySeries: async (req, res) => {
        const id = req.params.id
        var response;
        var err;        
        try {
            const seasons = await Season.find({idAudiovisual: id})
            response = seasons
        } catch(error) {
            err = 'An unexpected error has occurred with our servers'
        }        
        res.json({
            success: !err ? true : false,
            response: !err && response,
            err: err
        })
    }
}

module.exports = seasonControllers