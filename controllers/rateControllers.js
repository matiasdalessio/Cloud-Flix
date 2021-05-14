const Audiovisual = require('../models/Audiovisual')

const rateControllers = {
    personalRate: async (req, res) => {
        const userId = req.user._id
        const id = req.params.id
        const { num } = req.body 

        var response;
        var err;   

        try {
            const rate = await Audiovisual.findOneAndUpdate({ _id: id }, { $push: { rate: {vote: num, userId: userId}}},{new:true})
            response = rate
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

module.exports = rateControllers