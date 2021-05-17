const Audiovisual = require('../models/Audiovisual')

const audiovisualControllers = {
    getAllAudiovisuals: async (req,res) => {
        try {
            const Audiovisuals = await Audiovisual.find()
            res.json({success: true, respuesta: Audiovisuals})
        } catch(error) {
            console.log(error)
            res.json({success: false, respuesta: 'Oops! an error has ocurred with the server. Verify the endpoint and if it still not working, please try again later...'})
        }
    },
    getSingleAudiovisual: async (req,res) => {
        const audiovisualId = (req.params.id)
        try {
            const selectedAudiovisual = await Audiovisual.findOne({_id: audiovisualId})
            res.json({success: true, respuesta: selectedAudiovisual})
        } catch(error) {
            console.log(error)
            res.json({success: false, respuesta: 'Oops! an error has ocurred with the server. Verify the endpoint and if it still not working, please try again later...'})
        }    
    },
    addAudiovisual: async (req,res) => {
        console.log(req.body)
        try {
            const audiovisualToAdd = new Audiovisual(req.body).populate({ path: "comments", populate: { path: "userId", select: { "email": 1 } } })
            await audiovisualToAdd.save()
            res.json({success: true, respuesta: audiovisualToAdd})
        } catch(error) { 
            console.log(error)
            res.json({success: false, respuesta: 'Oops! Verify the endpoint and if it still not working means an error has ocurred with the server. Please try again later...'})
        }         
    },
    deleteAudiovisual: async (req, res) => {
        const audiovisualId = req.params.id
        try {
            const deletedAudiovisual = await Audiovisual.findOneAndDelete({_id: audiovisualId})
            res.json({success: true, respuesta: deletedAudiovisual})
        } catch(error) {
            console.log(error)
            res.json({success: false, respuesta: 'Oops! the ID you enter was not founded'})
        }
    },
    updateAudiovisual: async (req, res) => {
        const audiovisualId = req.params.id
        try {
            const modifiedAudiovisual = await Audiovisual.findOneAndUpdate({_id: audiovisualId}, {...req.body}, {new: true})
            res.json({success: true, respuesta: modifiedAudiovisual})
        } catch(error) {
            console.log(error)
            res.json({success: false, respuesta: 'Oops! the ID you enter was not founded'})
        }
    },
    addOrRemoveRate: async (req, res) => {
        var {sendedData} = req.body
        const audiovisualId = req.params.id
        const {avatar, name, _id} = req.user
        const userId = _id
        const userInfo = {avatar, name, userId}
        try {
            const rated = await Audiovisual.findOneAndUpdate({_id: audiovisualId}, sendedData.add ? {$push:{rate:{...userInfo}}} : {$pull:{rate: {userId}}}, {new: true})
            res.json({success: true, respuesta: rated.rate})
        } catch(error) {
            console.log(error)
            res.json({success: false, respuesta: 'Oops! the ID you enter was not founded'})
        }
    },
    addComment: async (req, res) => {
        var {sendedData} = req.body
        var {comment} = sendedData
        const audiovisualId = req.params.id
        const {avatar, name, _id} = req.user
        const userId = _id
        const userInfo = {avatar, name, userId, comment}
        try {
            const commentAdded = await Audiovisual.findOneAndUpdate({_id: audiovisualId}, {$push:{comments:{...userInfo}}}, {new: true})
            res.json({success: true, respuesta: commentAdded.comments})
        } catch(error) {
            console.log(error)
            res.json({success: false, respuesta: 'Oops! the ID you enter was not founded'})
        }
    },
    modifyOrRemoveComment: async (req, res) => {
        const {sendedData} = req.body
        const {commentId, editedComment} = sendedData
        try {
            const modifiedOrRemovedComment = await Audiovisual.findOneAndUpdate({"comments._id" : commentId}, !editedComment ?{$pull:{comments: {_id: commentId}}} : {$set:{"comments.$.comment":editedComment}}, {new: true})
            res.json({success: true, respuesta: modifiedOrRemovedComment.comments})
        } catch(error) {
            console.log(error)
            res.json({success: false, respuesta: 'Oops! the ID you enter was not founded'})
        }
    },
    
}

module.exports = audiovisualControllers