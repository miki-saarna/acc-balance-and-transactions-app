require("dotenv").config();

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database!'));

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