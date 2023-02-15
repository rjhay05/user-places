const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    places: [{
        type: mongoose.Types.ObjectId,
        ref: 'Places',
        required: true
    }]
}
);

module.exports = mongoose.model('Users', schema);