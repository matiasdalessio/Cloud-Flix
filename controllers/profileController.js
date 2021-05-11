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
    loadAllProfiles: async (req, res) => {
        const allProfiles = await Profile.find()
        res.json({success: true, response: allProfiles})
    },
    loadSingleProfile: async (req, res) => {
        const idLoader = req.params._id
        const singleProfile = await Profile.findOne({_id:idLoader})
        res.json({success: true, response: singleProfile})
    },
    updateProfile: async (req,res) => {
        const idUpdate = req.params._id
        const profile = await Profile.findOneAndUpdate({_id: idUpdate},req.body,{new:true})
        res.json({response: profile, success: true})
    },
    deleteProfile: async (req,res) => {
        const idDelete = req.params._id
        const deleteProfile = await Profile.findOneAndDelete({_id: idDelete})
        res.json({response:deleteProfile, success:true})
    }
}

module.exports = profileControllers