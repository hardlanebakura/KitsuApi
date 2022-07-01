const express = require('express');
const cors = require('cors');
//const indexRoutes = require('./routes/routes');
const mongoose = require("mongoose");
require('dotenv').config();
const animeDB = require("./db_models/Anime");

const mongooseConnect = require("./mongoConfig");

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());

//app.use("/", indexRoutes);

const uri = process.env.URL_DB;
const options = { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 1900 };
mongooseConnect();

animeDB.findAllAnimes()
.then(response=> {

    app.get("/", (req, res) => {

        console.log(response.map(x => x.title))
        res.send(response);

    })

    app.get("/categories/", (req, res) => {

        var categories = [];
        for (const anime of response) { for (const item of anime.genres) { if (!categories.includes(item)) categories.push(item); }}
        res.send(categories);

    })

    app.get("/tags", (req, res) => {

        var tags = {};
        for (const anime of response) { 
            for (const tag of anime.tags) {
                (tag in tags) ? tags[tag].push(anime) : tags[tag] = [anime];
            }
        }
        res.send(tags);

    })

    app.get("/titles", (req, res) => {

        var titles = [];
        for (const anime of response) titles.push({ "anime": anime.title, "id": anime.id, "tags": anime.tags });
        res.send(titles);

    })

    for (const anime of response) {

        app.get(`/animes/${anime.id}`, (req, res) => {

            res.send(anime);
        
        })

    }

})
.catch(error => console.error(error));

app.listen(PORT, () => {

    console.log("Server is running on port" + PORT);

})