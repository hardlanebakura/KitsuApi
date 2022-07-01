const mongoose = require('mongoose');

const animeSchema = new mongoose.Schema({
    id:Number,
    title:String,
    synopsis:String,
    userCount:Number,
    favoritesCount:Number,
    popularityRank:Number,
    ratingRank:Number,
    startDate:String,
    endDate:String,
    posterImage:String,
    coverImage:String,
    episodeCount:Number,
    episodeLength:Number,
    characters:[],
    genres:[],
    episodes:[],
    reviews:[],
    tags:[]

});

animeSchema.statics.findAnime = async function(title) {

    var anime = await this.find({title:title});
    return anime;

}

animeSchema.statics.insertAnime = async function(anime) {

    await (await this.create(anime)).save();

}

animeSchema.statics.findAllAnimes = async function() {

    var animes = await this.find({});
    return animes;

}

animeSchema.statics.updateAnime = async function(anime) {

    await this.updateOne(
        {title: anime.title}, 
        {reviews: anime.reviews}
    )

}

animeSchema.statics.updateTags = async function(anime) {

    await this.updateOne(
        {title: anime.title}, 
        {tags: anime.tags}
    )

}

const animeDB = mongoose.model("Anime", animeSchema);

module.exports = animeDB;