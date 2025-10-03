const { register, login, deleteUser, update, profile, forgotPassword, resetPassword, changePassword } = require('./auth.controller')
const { authMiddleware } = require('./auth.middleware')

const router = require('express').Router()

router.post('/register', register)
router.post('/login', login)
router.post('/change-password', authMiddleware(), changePassword)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:id/:token', resetPassword)

router
  .route('/')
  .get(authMiddleware(), profile)
  .put(authMiddleware(), update)
  .delete(authMiddleware(), deleteUser)

module.exports = router