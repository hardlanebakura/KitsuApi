class Character {

    constructor(data) {

        this.id = data.id;
        this.names = data.attributes.names;
        this.canonicalName = data.attributes.canonicalName;
        this.otherNames = data.attributes.otherNames;
        this.name = data.attributes.name;
        this.description = data.attributes.description;
        if (data.attributes.image !== null) this.image = data.attributes.image.original;

    }

}

module.exports = Character;