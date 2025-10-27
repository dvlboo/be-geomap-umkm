const { createUMKM, updateUMKM, deleteUMKM, getAllUMKM, getUMKMById } = require('./umkm.controller')

const router = require('express').Router()

router
  .route('/')
  .post(createUMKM)
  .get(getAllUMKM)

router
  .route('/:id')
  .get(getUMKMById)
  .put(updateUMKM)
  .delete(deleteUMKM)

module.exports = router