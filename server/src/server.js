const path = require('path');
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
// const app = require(path.resolve('', "app"));
const { PORT = 5000 } = process.env;


const app = require('./app');
function listener() {
    console.log(`Listening on Port ${PORT}!`);
}

app.listen(PORT, listener)