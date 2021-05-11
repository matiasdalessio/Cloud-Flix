const mongoose = require ('mongoose');

const seasonSchema = new mongoose.Schema({
    numberSeason:{type: Number, required: true},
<<<<<<< HEAD
    chapters:{type: String, required: true},    
=======
    chapters:[{title:{type: String, required: true}, trailerURL:{type:String, required: true}} ],    
>>>>>>> 6ba19f9b053d804360608b29a908d120359dbbae
    idAudiovisual: {type: mongoose.Types.ObjectId ,ref:'audiovisual'}
})

const Season = mongoose.model('season',seasonSchema);

module.exports = Season;