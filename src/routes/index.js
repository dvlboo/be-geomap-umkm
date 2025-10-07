const router = require('express').Router()

const authRoutes = require('../auth/auth.routes')
const umkmRoutes = require('../umkm/umkm.routes')

router.use('/auth', authRoutes)
router.use('/umkm', umkmRoutes)

module.exports = router