const { createUMKM } = require('./umkm.controller')

const router = require('express').Router()

router.post('/add-umkm', createUMKM)

module.exports = router