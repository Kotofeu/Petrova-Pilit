const homeSliderService = require('../service/HomeSliderService');
const ApiError = require('../error/ApiError');

class HomeSliderController {

    async getImages(req, res, next) {
        try {
            const images = await homeSliderService.getImages();
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
            const images = await homeSliderService.addImage(image);
            return res.json(images);
        } catch (e) {
            next(e);
        }
    }
    async deleteById(req, res, next) {
        try {
            const { id } = req.params
            const images = await homeSliderService.deleteById(id);
            return res.json(images);
        } catch (e) {
            next(e);
        }
    }
}


module.exports = new HomeSliderController();