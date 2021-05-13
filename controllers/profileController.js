const Profile = require('../models/Profile')
const jwt = require('jsonwebtoken')

const profileControllers= {
    createProfile: async (req, res) => {
        var {name, avatar, kids, myList, userId} = req.body
        var response;
        var error;
        var profileSaved;        
        var nameExist = await Profile.findOne({name})
        if(!nameExist) {
                try{ 
                profileSaved = new Profile({name, avatar, kids, myList, userId})
                await profileSaved.save()
                const token = jwt.sign({...profileSaved}, process.env.SECRET_OR_KEY)
                response = token               
                } catch (e){
                error= 'Something went wrong, try again'
               }  
        }else {
            error= 'This user name is already being used'
        }

        res.json({
            success: !error ? true : false,
            response: {token: response, name: profileSaved.name, avatar: profileSaved.avatar, kids: profileSaved.kids, myList: profileSaved.myList},
            error: error
        }) 
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
        console.log(req.body)
        // var {sendedData} = req.body
        // const audiovisualId = req.params.id
        // const {avatar, name, _id} = req.user
        // const userId = _id
        // const userInfo = {avatar, name, userId}
        // try {
        //     const rated = await Audiovisual.findOneAndUpdate({_id: audiovisualId}, sendedData.add ? {$push:{rate:{...userInfo}}} : {$pull:{rate: {userId}}}, {new: true})
        //     res.json({success: true, response: rated.rate})
        // } catch(error) {
        //     console.log(error)
        //     res.json({success: false, response: 'Oops! the ID you enter was not founded'})
        // }
    },
}

module.exports = profileControllers