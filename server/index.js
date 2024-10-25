require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const sequelize = require('./db');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorMiddleware');
const path = require('path');
const cookieParser = require('cookie-parser');
const cron = require('node-cron');
const deleteOldRefreshTokens = require('./helpers/deleteOldRefreshTokens'); 
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(cookieParser());
app.use(fileUpload({}));
app.use('/api', router);
app.use(errorHandler);

cron.schedule('0 0 * * *', () => {
    console.log('Запуск проверки и удаления просроченных токенов...');
    deleteOldRefreshTokens();
});

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log('Server started'));
    } catch (e) {
        console.log(e);
    }
};

start();