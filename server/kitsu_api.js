require('dotenv').config();
const axios = require('axios');
const { response } = require('express');
const mongoose = require('mongoose');
const URL = "https://kitsu.io/api/edge/";
const API_ID = process.env.API_ID;
const uri = process.env.URL_DB;
const options = { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 1900 };
const Anime = require('./classes/Anime');
const Character = require('./classes/Character');
const Episode = require('./classes/Episode');
const Review = require('./classes/Review');
const animeDB = require('./db_models/Anime');
const fs = require('fs');
const { couldStartTrivia } = require('typescript');

mongoose.connect(uri, options)
.then(response => console.log("Connected"))
.catch(error => console.log(error));

class KitsuApi {

    constructor() {}

    findLibrary(id) {

        var animes = [];
        var mangas = [];

        axios.get(`${URL}library-entries?filter[userId]=${id}`)
        .then(response => {

            for (const item of Object.keys(response.data.data)) {

                for (const [k, v] of Object.entries(response.data.data[item].relationships.anime.links)) if (k == "related") animes.push(v);
                if ("manga" in response.data.data[item].relationships) mangas.push(response.data.data[item].relationships.manga.links.related);

            }
    
            const library = {"animes":animes, "mangas":mangas};
            for (const anime of library.animes) this.findAnime(anime, "");

        })
        .catch(error => console.log(error));

    }

    findTrending() {

        axios.get("https://kitsu.io/api/edge/trending/anime")
        .then(response => {

            let data = response.data.data;
            for (const item of data) {

                var anime = new Anime(item);
                anime.setTag("trending");
                //console.log(item.relationships);
                this.findAnimeGenres(anime, item.relationships);

            }

        })
        .catch(error => console.log(error));

    }

    find() {

        let file = fs.readFileSync("./data/animes.json");
        let data = JSON.parse(file);
        for (const category of Object.keys(data.animes)) {

            for (const anime of data.animes[category]) this.findAnime(`${URL}anime/${anime.id}`)

        }

    }

    findAnime(id) {

        axios.get(id)
        .then(response => {

            const data = response.data.data;
            
            var anime = new Anime(data);
            this.findAnimeGenres(anime, response.data.data.relationships);

        })
        .catch(error => console.log(error));

    }

    findAnimeGenres(anime, relationshipsData) {

        var animeGenres = [];
        axios.get(`${URL}anime/${anime.id}/genres`)
        .then(response => { 
            const data = response.data.data;
            //console.log(anime.title);
            for (const genre of data) animeGenres.push(genre.attributes.name);
            anime.setGenres(animeGenres);
            this.findEpisodes(anime, relationshipsData);
        })
        .catch(error => console.log(error));

    }

    findEpisodes(anime, relationshipsData) {

        var episodes = [];
        axios.get(`${URL}anime/${anime.id}/episodes`)
        .then(response => {

            const data = response.data.data;
            for (const episode of data) { var episode1 = new Episode(episode); episodes.push(episode1); }
            anime.episodes = episodes;
            this.findRelationships(anime, relationshipsData);

        })
        .catch(error => console.error(error));

    }

    findRelationships(anime, data) {

        for (const item of Object.keys(data)) { 
            
        if (data[item].links.related.substr(0, 2) == "/a") data[item].links.related = URL.substr(0, URL.length - 1) + data[item].links.related;
        //console.log(item); console.log(data[item].links.related);
        
            if (item == "animeCharacters") {

                axios.get(data[item].links.related)
                .then(response => {

                    let data = response.data.data;
                    for (const c of data) {
                        
                        axios.get(c.links.self + "/character")
                        .then(response => {

                            let data = response.data.data;
                            var character = new Character(data);
                            anime.setCharacter(character);

                        })
                        //.then(() => { if (anime.characters.length == data.length) animeDB.insertAnime(anime); })

                    }

                    //if (data.length == 0) animeDB.insertAnime(anime);

                })
                .then(() => {
                
                    animeDB.findAllAnimes()
                    .then(response => {

                        const titles = response.map(x => x.title);
                        //if (!(titles.includes(anime.title))) { animeDB.insertAnime(anime); }

                    })
                    .catch(error => console.log(error))

                })

            }

            if (item == "reviews") {

                axios.get(data[item].links.related)
                .then(response => {

                    let data = response.data.data;
                    for (const item of data) {

                        axios.get(item.relationships.user.links.related)
                        .then(res => {

                            var review = new Review(item);
                            let user = res.data.data;
                            review.updateFields(user);
                            anime.setReview(review);
                            if (anime.reviews.length == data.length) animeDB.updateAnime(anime);

                        })

                    }

                })
                .then(() => this.findTags(anime))

            }
        
        }

    }

    findTags(anime) {

        let file = fs.readFileSync("./data/animes.json");
        let data = JSON.parse(file);
        for (const category of Object.keys(data.animes)) {

            for (const categoryItem of data.animes[category]) {

                if (categoryItem.name === anime.title) { if (!(anime.tags.includes(category))) { anime.setTag(category); animeDB.updateTags(anime) }; }

            }

        }

        //console.log(anime.title + " " + anime.tags);
        
    }

}

d = new KitsuApi();
d.findLibrary(API_ID);
//d.findTrending();
d.find();