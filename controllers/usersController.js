const User = require('../models/Users')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const usersControllers= {
    loadNewUser: async (req, res) => {
        var {email, password, country, premium} = req.body
        var response;
        var error;
        var userSaved;        
        var emailExist = await User.findOne({email})
        const passwordHasheado = bcryptjs.hashSync(password, 10)
        if(!emailExist) {
                try{ 
                userSaved = new User({email, password: passwordHasheado, country, premium})
                await userSaved.save()
                const token = jwt.sign({...userSaved}, process.env.SECRET_OR_KEY)
                response = token               
                } catch (e){
                error= 'Something went wrong, try again'
               }  
        }else {
            error= 'This email address is already being used'
        }

        res.json({
            success: !error ? true : false,
            response: {token: response, email: userSaved.email, premium: userSaved.premium},
            error: error
        }) 
    },

    userLogIn: async (req, res) => {
        const {email, password} = req.body
        var response;
        var error;
        const userExist = await User.findOne({email})
        if(userExist){
            const passwordEqual = bcryptjs.compareSync(password, userExist.password)
            if(passwordEqual){
                const token = jwt.sign({...userExist}, process.env.SECRET_OR_KEY)
                response = {token, email: userExist.email}
            } else {
                error = 'Incorrect username or password'
            } 
        } else {
                error = 'Incorrect username or password'
            }        
        
        res.json({
            success: !error ? true : false,
            response: response,
            error: error
        })
    },

    LogInForced: (req, res) => {
        res.json({success: true, response: {email: req.user.email}})
    }
}
module.exports = usersControllers