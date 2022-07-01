require('dotenv').config();
const mongoose = require("mongoose");
const uri = process.env.URL_DB;
const options = { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 1900 };

function mongooseConnect() {

    mongoose.connect(uri, options)
    .then(response => console.log("Connected"))
    .catch(error => console.log(error));

}

module.exports = mongooseConnect;