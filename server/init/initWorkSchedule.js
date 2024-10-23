require('dotenv').config();
const sequelize = require('../db');
const modules = require('../models/models');

const initWorkSchedule = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        await modules.WorkSchedule.sync({ force: true });

        const daysOfWeek = [
            { name: 'Понедельник', shortName: 'Пн.' },
            { name: 'Вторник', shortName: 'Вт.' },
            { name: 'Среда', shortName: 'Ср.' },
            { name: 'Четверг', shortName: 'Чт.' },
            { name: 'Пятница', shortName: 'Пт.' },
            { name: 'Суббота', shortName: 'Сб.' },
            { name: 'Воскресенье', shortName: 'Вс.' },
        ];

        await modules.WorkSchedule.bulkCreate(daysOfWeek);
        console.log('Table created and populated with initial data.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    } finally {
        await sequelize.close();
    }
};

initWorkSchedule();