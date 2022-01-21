const mongoose = require('mongoose');

const accessTokenSchema = new mongoose.Schema({
    access_token: {
        type: String,
        required: true,
    },
    item_id: {
        type: String,
        required: true,
    },
    // error: {
    //     type: String | null,
    //     required: false,
    // },
    created_date: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('accessToken', accessTokenSchema);