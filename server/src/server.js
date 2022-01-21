const express = require("express");
const app = require('./app');
const mongoose = require('mongoose');
const path = require('path');
// require("dotenv").config();
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database!'));

// const app = require(path.resolve('', "app"));
const { PORT = 5000 } = process.env;

// function listener() {
//     console.log(`Listening on Port ${PORT}!`);
// }
// app.listen(PORT, listener)
app.listen(PORT, () => console.log(`Server started on Port: ${PORT}`))