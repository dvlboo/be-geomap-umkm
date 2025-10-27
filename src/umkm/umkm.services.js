const { createLocation, updateLocation } = require("./location/location.repository")
const { createUMKM, findAllUmkm, findUmkmById, deleteUmkm, updateUmkm } = require("./umkm.repository")
const path = require("path")
const crypto = require("crypto")
const { uploader } = require("../../utils/cloudinary")

exports.create = async (payload) => {
  const _location = await createLocation({
    latitude: payload.latitude,
    longitude: payload.longitude
  })

  const _slug = payload.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

  if (payload.product_pict && typeof payload.product_pict == 'object') {
    const { product_pict } = payload
    product_pict.publicId = crypto.randomBytes(16).toString("hex")
    product_pict.name = `${product_pict.publicId}${path.parse(product_pict.name).ext}`
    const _product_pict = await uploader(product_pict, 'geomap/products')
    payload.product_pict = _product_pict.url
  }

  if (payload.place_pict && typeof payload.place_pict == 'object') {
    const { place_pict } = payload
    place_pict.publicId = crypto.randomBytes(16).toString("hex")
    place_pict.name = `${place_pict.publicId}${path.parse(place_pict.name).ext}`
    const _place_pict = await uploader(place_pict, 'geomap/places')
    payload.place_pict = _place_pict.url
  }

  const data = await createUMKM({
    ...payload,
    location_id: _location.id,
    slug: _slug
  })

  return data
}

exports.update = async (id, payload) => {
  // Get existing UMKM to get location_id
  const existingUmkm = await findUmkmById(id)
  
  if (!existingUmkm) {
    throw new Error('UMKM not found')
  }
  
  // Update location only if latitude or longitude changed
  if (payload.latitude || payload.longitude) {
    const newLat = payload.latitude || existingUmkm.location.latitude
    const newLong = payload.longitude || existingUmkm.location.longitude
    
    // Only update if values actually changed
    if (newLat !== existingUmkm.location.latitude || newLong !== existingUmkm.location.longitude) {
      await updateLocation(existingUmkm.location.id, {
        latitude: newLat,
        longitude: newLong
      })
    }
    
    // Remove from payload so it doesn't try to update UMKM table
    delete payload.latitude
    delete payload.longitude
  }
  
  if (payload.product_pict && typeof payload.product_pict == 'object') {
    const { product_pict } = payload
    product_pict.publicId = crypto.randomBytes(16).toString("hex")
    product_pict.name = `${product_pict.publicId}${path.parse(product_pict.name).ext}`
    const _product_pict = await uploader(product_pict, 'geomap/products')
    payload.product_pict = _product_pict.url
  }
  if (payload.place_pict && typeof payload.place_pict == 'object') {
    const { place_pict } = payload
    place_pict.publicId = crypto.randomBytes(16).toString("hex")
    place_pict.name = `${place_pict.publicId}${path.parse(place_pict.name).ext}`
    const _place_pict = await uploader(place_pict, 'geomap/places')
    payload.place_pict = _place_pict.url
  }

  const data = await updateUmkm(id, {
    ...payload
  })

  return data
}

exports.deleteUMKM = async (id) => {
  const data = await deleteUmkm(id)
  return data
}

exports.findAllUMKM = async () => {
  const data = await findAllUmkm()
  return data
}

exports.findUMKMById = async (id) => {
  const data = await findUmkmById(id)
  return data
}