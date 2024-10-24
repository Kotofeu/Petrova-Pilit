const officeService = require('../service/OfficeService');
const ApiError = require('../error/ApiError');

class OfficeController {

    async getImages(req, res, next) {
        try {
            const images = await officeService.getImages();
            return res.json(images);
        } catch (e) {
            next(e);
        }
    }

    async addImage(req, res, next) {
        try {

            let image;
            if (req.files && req.files.image) {
                image = req.files.image
            }
            const images = await officeService.addImage(image);
            return res.json(images);
        } catch (e) {
            next(e);
        }
    }
    async deleteById(req, res, next) {
        try {
            const { id } = req.params
            const images = await officeService.deleteById(id);
            return res.json(images);
        } catch (e) {
            next(e);
        }
    }
}


module.exports = new OfficeController();