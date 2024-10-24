const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const officeRouter = require('./officeRouter');


router.use('/user', userRouter);
router.use('/office', officeRouter);

module.exports = router;