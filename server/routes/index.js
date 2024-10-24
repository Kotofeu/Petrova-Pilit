const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const officeRouter = require('./officeRouter');
const homeSliderRouter = require('./homeSliderRouter');


router.use('/user', userRouter);
router.use('/office', officeRouter);
router.use('/home-slider', homeSliderRouter);

module.exports = router;