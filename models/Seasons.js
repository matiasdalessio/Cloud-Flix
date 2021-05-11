const mongoose = require ('mongoose');

const seasonSchema = new mongoose.Schema({
    numberSeason:{type: Number, required: true},
    chapters:{type: String, required: true},    
    idAudiovisual: {type: mongoose.Types.ObjectId ,ref:'audiovisual'}
})

const Season = mongoose.model('season',seasonSchema);

module.exports = Season;