const { Schema, model } = require('mongoose');

const HeroeTeamColorSchema = Schema({
    id_heroe: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
}, {  collection: 'HeroeTeamColor' });

HeroeTeamColorSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model( 'HeroeTeamColor', HeroeTeamColorSchema );