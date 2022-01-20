const path = require('path');
// const app = require(path.resolve('', "app"));
const PORT = process.env.PORT

const app = require('./app');
function listener() {
    console.log(`Listening on Port ${PORT}!`);
}

app.listen(PORT, listener)