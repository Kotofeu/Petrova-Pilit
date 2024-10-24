const fs = require('fs').promises; 
const path = require('path');
const sharp = require('sharp');
const ffmpeg = require('fluent-ffmpeg'); 
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
                    try {
                        await image.mv(path.resolve(__dirname, '..', 'static', fileName));
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
            }
        }
    }

    async staticCreate(image) {
        if (image.constructor === Array) {
            throw new Error('Вы передали больше 1 изображения');
        }
        
        let imageName;
        if (image && image.name) {
            imageName = `${uuidv4()}.${image.name.split('.').pop()}`;
            const filePath = path.resolve(__dirname, '..', 'static', imageName);
            
            try {
                await image.mv(filePath);
                await this.compressFile(filePath, image.name);
            } catch (error) {
                throw new Error('Ошибка сохранения изображения');
            }
        }
        return imageName;
    }
    

    async compressFile(filePath, fileName) {
        const ext = path.extname(fileName).toLowerCase();
    
        switch (ext) {
            case '.jpg':
            case '.jpeg':
                await sharp(filePath)
                    .jpeg({ quality: 80 })
                    .toFile(filePath);
                break;
            case '.png':
                await sharp(filePath)
                    .png({ quality: 80 })
                    .toFile(filePath);
                break;
            case '.gif':
                await sharp(filePath)
                    .gif({ quality: 80 })
                    .toFile(filePath);
                break;
            case '.bmp':
                break;
            case '.tiff':
                await sharp(filePath)
                    .tiff({ quality: 80 })
                    .toFile(filePath);
                break;
            case '.svg':
                break;
            case '.mp4':
            case '.mov':
            case '.wmv':
            case '.avi':
            case '.mpeg':
                await compressVideo(filePath);
                break;
            default:
                break;
        }
    }
    
    compressVideo(filePath) {
        return new Promise((resolve, reject) => {
            const outputFilePath = filePath.replace(/.(mp4|mov|wmv|avi|mpeg)$/, '-compressed$&');
    
            ffmpeg(filePath)
                .outputOptions('-crf', '23')
                .on('end', () => {
                    fs.unlinkSync(filePath);
                    fs.renameSync(outputFilePath, filePath);
                    resolve();
                })
                .on('error', (error) => {
                    reject(error);
                })
                .save(outputFilePath); 
        });
    }
}

module.exports = new StaticManagement();