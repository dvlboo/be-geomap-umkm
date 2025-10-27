const { umkm, location, medsos } = require("../../models")

exports.createUMKM = async ( payload ) => {
  const { medsos: medsosData } = payload
  const data = await umkm.create(payload)

  if (medsosData && medsosData.length > 0) {
    await Promise.all(medsosData.map(med =>
      medsos.create({ ...med, umkm_id: data.id })
    ))
  }

  const result = await umkm.findOne({
    where: { id: data.id },
    attributes: { exclude: ['location_id'] },
    include: [
      { model: location, as: 'location' },
      { model: medsos, as: 'medsos' }
    ]
  })

  return result
}

exports.findAllUmkm = async () => {
  const data = await umkm.findAll({
    attributes: { exclude: ['location_id'] },
    include: [
      { model : location, as: 'location' },
      { model : medsos, as: 'medsos' },
    ]
  })
  return data
}

exports.findUmkmById = async ( id ) => {
  const data = await umkm.findOne({
    where: { id },
    attributes: { exclude: ['location_id'] },
    include: [
      { model : location, as: 'location' },
      { model : medsos, as: 'medsos' }
    ] 
  })
  return data
}

exports.updateUmkm = async ( id, payload ) => {
  const { medsos: medsosData } = payload
  
  await umkm.update(payload, { where: { id } })
  
  if (medsosData && medsosData.length > 0) {
    const existingMedsos = await medsos.findAll({ where: { umkm_id: id } })
    
    const isSame = existingMedsos.length === medsosData.length && 
      existingMedsos.every((existing, index) => {
        const newData = medsosData[index]
        return newData && 
          existing.platform === newData.platform && 
          existing.url === newData.url && 
          existing.username === newData.username
      })
    if (!isSame) {
      await medsos.destroy({ where: { umkm_id: id } })
      await Promise.all(medsosData.map(med =>
        medsos.create({ ...med, umkm_id: id })
      ))
    }
  }
  
  const data = await umkm.findOne({ 
    where: { id },
    attributes: { exclude: ['location_id'] },
    include: [
      { model: location, as: 'location' },
      { model: medsos, as: 'medsos' }
    ]
  })
  return data
}

exports.deleteUmkm = async ( id ) => {
  const data = await umkm.findOne({ 
    where: { id },
    attributes: { exclude: ['location_id'] },
    include: [
      { model: location, as: 'location' },
      { model: medsos, as: 'medsos' }
    ]
  })
  await umkm.destroy({ where: { id } })
  return data
}