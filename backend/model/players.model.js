const mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
    name: String,
    score: Number,
    level:String
});

const PlayerModel = mongoose.model("gamer", playerSchema);


module.exports = PlayerModel;