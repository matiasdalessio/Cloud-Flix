const Audiovisual = require('../models/Audiovisual')

const commentController = {
    commentToAdd: async (req,res) => {
        const { comment , avatar , name } = req.body.info
        const userId = req.user._id
        const id = req.params.id

        var response;
        var err;  

        try {
            const commentToAdd = await Audiovisual.findOneAndUpdate({ _id: id }, { $push: { comments: { avatar: avatar , name: name ,comment: comment, userId: userId}}},{new:true})
            commentToAdd.save()
            response = commentToAdd
        } catch(error) {
            err = 'An unexpected error has occurred with our servers'
        }

        res.json({
            success: !err ? true : false,
            response: !err && response,
            err: err
        }) 
    },

    deleteComment: async (req, res) => {
        const id = req.params.id
        const { idComment } = req.body

        var response;
        var err; 

        try {
            const deleteComment = await Audiovisual.findOneAndUpdate({ _id: id },{ $pull: { comments: { _id: idComment }}},{new:true})
            deleteComment.save()
            response = deleteComment
        } catch(error) {
            err = 'An unexpected error has occurred with our servers'
        }   
    
        res.json({
            success: !err ? true : false,
            response: !err && response,
            err: err
        })
    },

    modifyComment: async (req, res) => {
        const id = req.params.id
        const { comment } = req.body.info
        const { idComment } = req.body

        var response;
        var err; 

        try {
            const modifyComment = await Audiovisual.findOneAndUpdate({ _id: id, "comments._id": idComment }, { $set: { "comments.$.comment": comment } },{new:true})
            modifyComment.save()
            response = modifyComment
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


module.exports = commentController