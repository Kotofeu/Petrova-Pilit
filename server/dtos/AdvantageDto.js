module.exports = class AdvantageDto {
    id;
    name;
    description;
    iconSrс;
    imageSrc;
    constructor(model) {
        this.id = model.id;
        this.name = model.name;
        this.description = model.description;
        this.iconSrс = model.iconSrс;
        this.imageSrc = model.imageSrc;
    }
}