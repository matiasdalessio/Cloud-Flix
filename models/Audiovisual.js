const mongoose = require ('mongoose');

const audiovisualSchema = new mongoose.Schema({
    title:{type: String, required: true},
    director:{type: String ,required: true},
    year:{type: Number, required: true},
    cast: [{type: String , required: true}] ,
    categories: [{type: String , required: true}] ,
    rate: [{vote: {type: Number, required: true}, userId:{type: mongoose.Types.ObjectId, ref: 'user', required:true}, default: 0}],
    premium: {type: Boolean, required: true},
    availableLanguages: [{type: String, required: true}],
    availableSubtitles: [{type: String, required: true}],
    audiovisualType: {type: String, required: true},
    audienceAge: {type: String, required: true},
    sinopsis: {type: String, required: true},
    imageBanner: {type: String, required: true},
    imageBackground: {type: String, required: true},
    duration: {type: String},
    comments:[{name:{type:String, required: true}, avatar:{type:String, required: true}, comment:{type:String, required: true}, userId:{type: mongoose.Types.ObjectId, ref: 'user', required:true}, default: 0}],
})

const Audiovisual = mongoose.model('audiovisual',audiovisualSchema);

module.exports = Audiovisual;
