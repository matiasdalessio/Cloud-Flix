const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema({
    email:{type: String, required: true},
    password:{type: String, required: true},
    country:{type: String, required: true},
    premium:{type: Boolean , default: false}    
})

const User = mongoose.model('user',userSchema);

module.exports = User;