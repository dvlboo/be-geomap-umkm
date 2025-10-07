const { create } = require("./umkm.services")

exports.createUMKM = async (req, res, next) => {
  try {
    const { 
      name, owner, phone, address, regency, story, year, classification, 
      longitude, latitude, type, order_id, payment_id, medsos
    } = req.body

    const { place_pict, product_pict } = JSON.parse(JSON.stringify(req.files || {}))
    
    const missingFields = []
    if (!name) missingFields.push("name")
    if (!owner) missingFields.push("owner")
    if (!phone) missingFields.push("phone")
    if (!address) missingFields.push("address")
    if (!regency) missingFields.push("regency")
    if (!story) missingFields.push("story")
    if (!year) missingFields.push("year")
    if (!classification) missingFields.push("classification")
    if (!longitude) missingFields.push("longitude")
    if (!latitude) missingFields.push("latitude")
    if (!type) missingFields.push("type")
    if (!place_pict) missingFields.push("place_pict")
    if (!product_pict) missingFields.push("product_pict")

    if (missingFields.length > 0) {
      return res.status(400).json({ message: `Field(s) ${missingFields.join(", ")} is required` })
    }

    const data = await create({
      name, owner, phone, address, regency, story, year, classification, longitude, 
      latitude, type, order_id, payment_id, medsos, place_pict, product_pict
    })

    res.status(200).json({
      message: "UMKM created successfully",
      data
    })

  } catch (error) {
    next(error)
  }
}