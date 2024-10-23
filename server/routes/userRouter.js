const Router = require('express')
const userController = require('../controllers/userController');
const { body } = require('express-validator');
const router = new Router()
const authMiddleware = require('../middleware/AuthMiddleware')
const confirmMiddleware = require('../middleware/ConfirmMiddleware')
const checkRole = require('../middleware/CheckRoleMiddleware')





router.post('/registration', body('password').isLength({ min: 8, max: 32 }), confirmMiddleware, userController.createUserWithToken)
router.post('/reset-password', body('password').isLength({ min: 8, max: 32 }), confirmMiddleware, userController.resetPassword)
router.post('/change-email', body('newEmail').isEmail(), confirmMiddleware, userController.changeEmail)
router.post('/recover-send-code', body('email').isEmail(), userController.recoverUserSendCode)
router.post('/change-email-send-code', body('newEmail').isEmail(), authMiddleware, userController.changeEmailSendCode)
router.post('/new-user-send-code', body('email').isEmail(), userController.newUserSendCode)
router.post('/activate', body('email').isEmail(), body('code').isLength({ min: 6, max: 6 }), userController.activate)

/*
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.post('/edit', authMiddleware, userController.edit)
router.post('/create-admin', checkRole('ADMIN'), userController.createAdmin)



router.post('/basket', authMiddleware, basketController.postGoogInBasket);
router.get('/basket',Basket);
router.delete('/basket');
router.get('/basket/find-good');


router.post('/favourite');
router.get('/favourite');
router.delete('/favourite');
router.get('/favourite/find-good');

router.get('/:id', userController.getById);
*/
module.exports = router