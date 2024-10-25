const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const officeRouter = require('./officeRouter');
const homeSliderRouter = require('./homeSliderRouter');
const contactsRouter = require('./contactsRouter');
const advantagesRouter = require('./advantagesRouter');
const settingsRoutes = require('./settingsRoutes');
const servicesRouter = require('./servicesRouter');


router.use('/user', userRouter);
router.use('/office', officeRouter);
router.use('/home-slider', homeSliderRouter);
router.use('/contact', contactsRouter);
router.use('/advantage', advantagesRouter);
router.use('/service', servicesRouter);

module.exports = router;