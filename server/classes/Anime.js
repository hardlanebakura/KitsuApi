class Anime {

    constructor(data) {

        this.id = data.id;
        this.synopsis = data.attributes.synopsis;
        this.title = data.attributes.canonicalTitle;
        this.title_en_us = data.attributes.titles.en_us;
        this.title_jp = data.attributes.titles.ja_jp;
        this.userCount = data.attributes.userCount;
        this.favoritesCount = data.attributes.favoritesCount;
        this.popularityRank = data.attributes.popularityRank;
        this.ratingRank = data.attributes.ratingRank;
        this.startDate = data.attributes.startDate;
        this.endDate = data.attributes.endDate;
        this.posterImage = data.attributes.posterImage.large;
        if (data.attributes.coverImage != null) this.coverImage = data.attributes.coverImage.large;
        this.episodeCount = data.attributes.episodeCount;
        this.episodeLength = data.attributes.episodeLength;
        this.rating = data.attributes.averageRating;
        this.characters = [];
        this.reviews = [];
        this.tags = [];

    }

    setGenres(genres) {

        this.genres = genres;

    }

    setCharacter(character) {

        this.characters.push(character)

    }

    setReview(review) {

        this.reviews.push(review)

    }

    setTag(tag) {

        this.tags.push(tag)

    }

}

module.exports = Anime;
