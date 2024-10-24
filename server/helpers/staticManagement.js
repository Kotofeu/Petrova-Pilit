const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const ApiError = require('../error/ApiError');

class StaticManagement {
    async manyStaticDelete(foundElements) {
        const imagesForDelete = foundElements.map(image => image.imageSrc);
        if (imagesForDelete.length) {
            await Promise.all(imagesForDelete.map(async (image) => {
                const filePath = path.resolve(__dirname, '..', 'static', image);
                try {
                    await fs.unlink(filePath);
                } catch (error) {
                    console.error(`Ошибка при удалении файла ${filePath}:`, error);
                }
            }));
        }
    }

    async manyStaticCreate(images) {
        let imagesNames = [];
        if (images) {
            if (!Array.isArray(images)) images = [images];
            for (const image of images) {
                if (image.name) {
                    const fileName = `${uuidv4()}.${image.name.split('.').pop()}`;
                    imagesNames.push(fileName);
                    const filePath = path.resolve(__dirname, '..', 'static', fileName)
                    try {
                        await this.compressFile(image, filePath, image.name);
                    } catch (error) {
                        throw ApiError.Internal('Ошибка сохранения изображения');
                    }
                }
            }
        }
        return imagesNames;
    }

    async staticDelete(imageSrc) {
        if (imageSrc) {
            const filePath = path.resolve(__dirname, '..', 'static', imageSrc);
            try {
                await fs.unlink(filePath);
            } catch (error) {
                console.error(`Ошибка при удалении файла ${filePath}:`, error);
            }
        }
    }

    async staticCreate(image) {
        if (Array.isArray(image)) {
            throw ApiError.BadRequest('Вы передали больше 1 изображения');
        }

        let imageName;
        if (image && image.name) {
            imageName = `${uuidv4()}.${image.name.split('.').pop()}`;
            const filePath = path.resolve(__dirname, '..', 'static', imageName);
            await this.compressFile(image, filePath, image.name);

        }
        return imageName;
    }

    async compressFile(image, filePath, fileName) {
        const ext = path.extname(fileName).toLowerCase();
        if (
            !['.mp4', '.mov', '.wmv', '.avi', '.mpeg', '.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.svg'].includes(ext)
        ) {
            throw ApiError.BadRequest(`Тип файла ${ext} не поддерживается`);
        }
        try {
            switch (ext) {
                case '.jpg':
                case '.jpeg':
                    await sharp(image.data).jpeg({ quality: 80 }).toFile(filePath);
                    break;
                case '.png':
                    await sharp(image.data).png({ quality: 80 }).toFile(filePath);
                    break;
                case '.tiff':
                    await sharp(image.data).tiff({ quality: 80 }).toFile(filePath);
                    break;
                default:
                    await image.mv(filePath);
                    return;
            }
        } catch (error) {
            console.error(`Ошибка при сжатии файла ${filePath}:`, error);
            throw ApiError.Internal('Ошибка сжатия изображения');
        }
    }
}

module.exports = new StaticManagement();