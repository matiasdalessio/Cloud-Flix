const mongoose = require ('mongoose');

const audiovisualSchema = new mongoose.Schema({
    title:{type: String, required: true},
    director:{type: String ,required: true},
    studio:{type: String , required: true},
    year:[{type: String}],
    cast: {type: [String] , required: true} ,
    categories: {type: [String] , required: true},
    trailerLink: {type: String, required: true},
    rate: [{type: [String], required: true}],
    premium: [{type:  Boolean, required: true}],
    originalLanguage: {type: String, required: true},
    type: [{type: String, required: true}],
    audienceAge: [{type: String, required: true}],
    sinopsis: [{type: String, required: true}],
    seasons: [{type: [String]}],
})

const Audiovisual = mongoose.model('audiovisual',audiovisualSchema);

module.exports = Audiovisual;