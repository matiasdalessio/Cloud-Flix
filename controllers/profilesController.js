const Profile = require('../models/Profiles')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const profilesControllers= {
    loadNewProfile: async (req, res) => {
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
    }
}

module.exports = profilesControllers