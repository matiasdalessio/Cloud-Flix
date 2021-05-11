const Seasons = require('../models/Seasons')

const seasonControllers = {
    allSeasons: async (req, res) => {
        var response;
        var err;
        
        try {
            const seasons = await Seasons.find()
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

    addSeason: async (req,res) => {
        const { numberSeason, chapters, idAudiovisual } = req.body 

        var response;
        var err;

        try {
            const seasonToSave = new Seasons({
                numberSeason,
                chapters,
                idAudiovisual
            })
            await seasonToSave.save()
            const seasons  = await Itinerary.find()
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

    deleteSeason: async (req, res) => {
        const id = req.params.id

        var response;
        var err;

        try {
            await Seasons.findOneAndDelete({_id: id})
            const seasons = await Seasons.find()
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
            await Itinerary.findOneAndUpdate({_id: id}, {...req.body}, {new: true})
            const seasons  = await Itinerary.find()
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

    season: async (req, res) => {
        const id = req.params.id 

        var response;
        var err;

        try {
            const season = await Itinerary.findById(id)
            response = season
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