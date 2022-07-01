class Episode {

    constructor(data) {

        this.id = data.id;
        this.description = data.attributes.description;
        this.originalTitle = data.attributes.titles.en_jp;
        this.title = data.attributes.titles.en_us;
        this.season = data.attributes.seasonNumber;
        this.number = data.attributes.number;
        this.number = data.attributes.relativeNumber;
        if (data.attributes.thumbnail != null) this.thumbnail = data.attributes.thumbnail.original;

    }

}

module.exports = Episode;