const { OfficeImages } = require('../models/models');
const ApiError = require('../error/ApiError');
const staticManagement = require('../helpers/staticManagement')
class OfficeService {

    async getImages() {
        const images = await OfficeImages.findAndCountAll();
        return images;
    }
    async addImage(image) {
        if (image) {
            const fileName = await staticManagement.staticCreate(image);
            const images = await OfficeImages.create({ imageSrc: fileName });
            return images
        }
        else {
            throw ApiError.BadRequest('Изображение не передано');
        }
    }
    async deleteById(id) {
        const image = await OfficeImages.findOne({ where: { id } });
        if (!image) {
            throw ApiError.BadRequest('Изображение отсутствует');
        }
        await staticManagement.staticDelete(image.imageSrc);
        return await OfficeImages.destroy({ where: { id } });
    }
}
module.exports = new OfficeService();