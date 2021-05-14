const Profile = require('../models/Profile')
const jwt = require('jsonwebtoken')

const profileControllers= {
    createProfile: async (req, res) => {
        var {newProfile} = req.body
        var {name, avatar, kids} = newProfile
        var userId = req.params.id
        var error;
        var profileSaved;     
            try{ 
                profileSaved = new Profile({name, avatar, kids, userId})
                await profileSaved.save()   
                res.json({success: true, respuesta: profileSaved})        
            } catch (e){
                error= 'Something went wrong, try again'
            } 
    },
    getAllProfiles: async (req, res) => {
        const allProfiles = await Profile.find()
        res.json({success: true, response: allProfiles})
    },
    getUserProfiles: async (req,res) => {
        const userId = (req.params.id)
        try {
            const selectedUserProfiles = await Profile.find({userId : userId})
            if (selectedUserProfiles.length != 0) {
                res.json({success: true, respuesta: selectedUserProfiles})
            } else{
            res.json({success: false, respuesta: []})
        }
        } catch(error) {
            console.log(error)
            res.json({success: false, respuesta: 'Oops! an error has ocurred with the server. Verify the endpoint or the ID and if it still not working, please try again later...'})
        }    
    },
    getSingleProfile: async (req, res) => {
        const profileId = req.params.id
        const singleProfile = await Profile.findOne({_id:profileId})
        res.json({success: true, response: singleProfile})
    },
    updateProfile: async (req,res) => {
        const profileId = req.params.id
        const modifiedProfile = await Profile.findOneAndUpdate({_id: profileId},req.body,{new:true})
        res.json({response: modifiedProfile, success: true})
    },
    deleteProfile: async (req,res) => {
        const profileId = req.params.id
        const deletedProfile = await Profile.findOneAndDelete({_id: profileId})
        res.json({response:deletedProfile, success:true})
    },
    addToList: async (req, res) => {
        var {sendedData} = req.body
        var {movie} = sendedData
        console.log(req.body)
        try {
            const addedToList = await Profile.findOneAndUpdate({_id: req.params.id}, sendedData.add ? {$push:{myList:{audiovisualId: movie._id}}} : {$pull:{myList: {audiovisualId: movie._id}}}, {new: true})
            res.json({success: true, response: addedToList.myList})
        } catch(error) {
            console.log(error)
            res.json({success: false, response: 'Oops! the ID you enter was not founded'})
        }
    },
    getAllListedAudivisuals: async (req, res) => {
        console.log(req.body)
        try {
            const audiovisualsListed = await Profile.find({_id: req.params.id}).populate({ path:"myList", populate:{path:"audiovisualId"}})
            // populate({ path:"comments", populate:{ path:"user_id", select:{ "name":1 ,"last_name":1,"picture":1 } } })
            res.json({success: true, response: audiovisualsListed[0].myList})
        } catch(error) {
            console.log(error)
            res.json({success: false, response: 'Oops! the ID you enter was not founded'})
        }
    },
}

module.exports = profileControllers