const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    address : {
        type: String,
        required: true
    },
    image : {
        type: String,
        required: true
    },
    creator : {
        type: mongoose.Types.ObjectId,
        ref: 'Users',
        required: true
    }
})

module.exports = mongoose.model('Places', schema);