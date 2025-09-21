const { register, login, deleteUser, update, profile } = require('./auth.controller')
const { authMiddleware } = require('./auth.middleware')

const router = require('express').Router()

router.post('/register', register)
router.post('/login', login)

router
  .route('/')
  .get(authMiddleware(), profile)
  .put(authMiddleware(), update)
  .delete(authMiddleware(), deleteUser)

module.exports = router