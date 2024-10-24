const Router = require('express')
const userController = require('../controllers/userController');
const { body } = require('express-validator');
const router = new Router()
const authMiddleware = require('../middleware/AuthMiddleware')
const checkRole = require('../middleware/CheckRoleMiddleware')





router.post('/registration', body('password').isLength({ min: 8, max: 32 }), userController.createUserWithToken)
router.post('/recover', body('password').isLength({ min: 8, max: 32 }), userController.recoverUser)
router.post('/change-email', body('newEmail').isEmail(), authMiddleware, userController.changeEmail)

router.post('/recover-send-code', body('email').isEmail(), userController.recoverUserSendCode)
router.post('/change-email-send-code', body('newEmail').isEmail(), authMiddleware, userController.changeEmailSendCode)
router.post('/new-user-send-code', body('email').isEmail(), userController.newUserSendCode)

router.post('/activate', body('email').isEmail(), body('code').isLength({ min: 6, max: 6 }), userController.activate)
router.post('/login', body('email').isEmail(), userController.login)
router.post('/logout', userController.logout)
router.post('/refresh', userController.refresh)

router.post('/give-role', checkRole('ADMIN'), userController.giveRole)

router.post('/change/:id', checkRole('ADMIN'), userController.changeById)
router.post('/change-image', authMiddleware, userController.changeImage)
router.post('/change-name', authMiddleware, userController.changeName)
router.post('/change-phone', authMiddleware, userController.changePhone)


router.get('/', authMiddleware, userController.getUser)
router.get('/all', checkRole('ADMIN'), userController.getAllUsers)
router.get('/:id', checkRole('ADMIN'), userController.getUserById);

router.delete('/', authMiddleware, userController.deleteUser)
router.delete('/:id', checkRole('ADMIN'), userController.deleteUserById)


module.exports = router