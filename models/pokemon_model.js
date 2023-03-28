const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
    id: { type: Number, unique:true, required: true },
    name: { type: Object, required: true },
    base:{type: Object, required: true},
    type: { type: [String], required: true },
    
});

const Pokemon = mongoose.model('pokemon', pokemonSchema);

module.exports = Pokemon;