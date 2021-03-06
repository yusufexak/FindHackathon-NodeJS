const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamsSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    attendees: [{
        subscribe: {
            type: String,
        },
    }]

});

module.exports = mongoose.model('teams', TeamsSchema);