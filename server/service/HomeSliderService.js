const { HomeSlider } = require('../models/models');
const ApiError = require('../error/ApiError');
const staticManagement = require('../helpers/staticManagement')
class HomeSliderService {

    async getImages() {
        const images = await HomeSlider.findAndCountAll();
        return images;
    }
    async addImage(image) {
        if (image) {
            const fileName = await staticManagement.staticCreate(image);
            const images = await HomeSlider.create({ imageSrc: fileName });
            return images
        }
        else {
            throw ApiError.BadRequest('Изображение не передано');
        }
    }
    async deleteById(id) {
        const image = await HomeSlider.findOne({ where: { id } });
        if (!image) {
            throw ApiError.NotFound('Изображение отсутствует');
        }
        await staticManagement.staticDelete(image.imageSrc);
        return await HomeSlider.destroy({ where: { id } });
    }
}
module.exports = new HomeSliderService();