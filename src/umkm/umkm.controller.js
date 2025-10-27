const { create, update, deleteUMKM, findAllUMKM, findUMKMById } = require("./umkm.services")

exports.createUMKM = async (req, res, next) => {
  try {
    let { 
      name, owner, phone, address, regency, story, year, classification, 
      longitude, latitude, type, order, payment, medsos
    } = req.body

    // Parse medsos if it's a JSON string
    if (medsos && typeof medsos === 'string') {
      try {
        medsos = JSON.parse(medsos)
      } catch (e) {
        return res.status(400).json({ message: "Invalid medsos format. Must be valid JSON array" })
      }
    }

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
    if (!order) missingFields.push("order")
    if (!place_pict) missingFields.push("place_pict")
    if (!product_pict) missingFields.push("product_pict")

    if (missingFields.length > 0) {
      return res.status(400).json({ message: `Field(s) ${missingFields.join(", ")} is required` })
    }

    const data = await create({
      name, owner, phone, address, regency, story, year, classification, longitude, 
      latitude, type, order, payment, medsos, place_pict, product_pict
    })

    res.status(200).json({
      message: "UMKM created successfully",
      data
    })

  } catch (error) {
    next(error)
  }
}

exports.updateUMKM = async (req, res, next) => {
  try {
    const { id } = req.params
    let payload = req.body
    
    // Parse medsos if it's a JSON string
    if (payload.medsos && typeof payload.medsos === 'string') {
      try {
        payload.medsos = JSON.parse(payload.medsos)
      } catch (e) {
        return res.status(400).json({ message: "Invalid medsos format. Must be valid JSON array" })
      }
    }
    
    const { place_pict, product_pict } = JSON.parse(JSON.stringify(req.files || {}))
    
    if (place_pict) payload.place_pict = place_pict
    if (product_pict) payload.product_pict = product_pict

    const data = await update(id, payload)
    res.status(200).json({
      message: "UMKM updated successfully",
      data
    })

  } catch (error) {
    next(error)
  }
}

exports.deleteUMKM = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = await deleteUMKM(id)
    res.status(200).json({
      message: "UMKM deleted successfully",
      data
    })

  } catch (error) {
    next(error)
  }
}

exports.getAllUMKM = async (req, res, next) => {
  try {
    const data = await findAllUMKM()
    res.status(200).json({
      message: "UMKM fetched successfully",
      data
    })
  } catch (error) {
    next(error)
  }
}

exports.getUMKMById = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = await findUMKMById(id)
    res.status(200).json({
      message: "UMKM fetched successfully",
      data
    })
  } catch (error) {
    next(error)
  }
}