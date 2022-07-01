class Review {

    constructor(data) {

        this.id = data.id;
        this.content = data.attributes.contentFormatted;
        this.likesCount = data.attributes.likesCount;
        this.rating = data.attributes.rating;
        this.source = data.attributes.source;

    }

    updateFields(data) {

        this.user_id = data.id;
        this.user_name = data.attributes.name;
        if (data.attributes.avatar !== null) this.user_avatar = data.attributes.avatar.original;
        if (data.attributes.coverImage !== null) this.user_coverImage = data.attributes.coverImage.original;

    }

}

module.exports = Review;