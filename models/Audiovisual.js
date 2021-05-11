const mongoose = require ('mongoose');

const audiovisualSchema = new mongoose.Schema({
    title:{type: String, required: true},
    director:{type: String ,required: true},
    studio:{type: String , required: true},
    year:{type: Number, required: true},
    cast: [{type: String , required: true}] ,
    categories: [{type: String , required: true}] ,
    trailerLink: {type: String, required: true},
    rate: [{vote: {type: Number, required: true}, userId:{type: mongoose.Types.ObjectId, ref: 'user', required:true}}],
    premium: {type: Boolean, required: true},
    originalLanguage: {type: String, required: true},
    audiovisualType: {type: String, required: true},
    audienceAge: {type: Number, required: true},
    sinopsis: {type: String, required: true},
    imageURL: {type: String, required: true}
})

const Audiovisual = mongoose.model('audiovisual',audiovisualSchema);

module.exports = Audiovisual;