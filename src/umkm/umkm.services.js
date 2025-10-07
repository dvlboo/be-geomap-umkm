const { createLocation } = require("./location/location.repository")
const { createUMKM } = require("./umkm.repository")
const path = require("path")
const crypto = require("crypto")
const { uploader } = require("../../utils/cloudinary")

exports.create = async (payload) => {
  const _location = await createLocation({
    latitude: payload.latitude,
    longitude: payload.longitude
  })
  
  if (payload.product_pict && typeof payload.product_pict == 'object') {
    const { product_pict } = payload
    product_pict.publicId = crypto.randomBytes(16).toString("hex")
    product_pict.name = `${product_pict.publicId}${path.parse(product_pict.name).ext}`
    const _product_pict = await uploader(product_pict)
    payload.product_pict = _product_pict.url
  }

  if (payload.place_pict && typeof payload.place_pict == 'object') {
    const { place_pict } = payload
    place_pict.publicId = crypto.randomBytes(16).toString("hex")
    place_pict.name = `${place_pict.publicId}${path.parse(place_pict.name).ext}`
    const _place_pict = await uploader(place_pict)
    payload.place_pict = _place_pict.url
  }

  const data = await createUMKM({
    ...payload,
    location_id: _location.id
  })


  return data
}

