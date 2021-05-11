const mongoose = require ('mongoose');

const audiovisualSchema = new mongoose.Schema({
    title:{type: String, required: true},
    director:{type: String ,required: true},
    studio:{type: String , required: true},
    year:{type: Number, required: true},
    cast: [{type: String , required: true}] ,
<<<<<<< HEAD
    categories: [{type: String, required: true}],
    trailerLink: {type: String, required: true},
    rate: [{type: Number, required: true}],
    premium: {type: Boolean, required: true},
    originalLanguage: {type: String, required: true},
    type: {type: String, required: true},
    audienceAge: {type: Number, required: true},
    sinopsis: [{type: String, required: true}],
    seasons: [{type: [String]}],
=======
    categories: [{type: String , required: true}] ,
    trailerLink: {type: String, required: true},
    rate: [{vote: {type: Number, required: true}, userId:{type: mongoose.Types.ObjectId, ref: 'user', required:true}}],
    premium: {type: Boolean, required: true},
    originalLanguage: {type: String, required: true},
    audiovisualType: {type: String, required: true},
    audienceAge: {type: Number, required: true},
    sinopsis: {type: String, required: true},
    imageURL: {type: String, required: true}
>>>>>>> 6ba19f9b053d804360608b29a908d120359dbbae
})

const Audiovisual = mongoose.model('audiovisual',audiovisualSchema);

module.exports = Audiovisual;