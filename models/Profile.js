const mongoose = require ('mongoose');

const profileSchema = new mongoose.Schema({
    name:{type: String, required: true},
    avatar:{type: String, required: true},
    kids:{type: Boolean, required: true},
    myList:[{audiovisualId:{type: mongoose.Types.ObjectId ,ref:'audiovisual'}, default: 0}],
    userId: {type: mongoose.Types.ObjectId ,ref:'user'}    
})

const Profile = mongoose.model('profile',profileSchema);

module.exports = Profile;