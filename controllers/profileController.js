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
    }
}

module.exports = profileControllers