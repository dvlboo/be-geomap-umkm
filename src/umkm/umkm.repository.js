const { umkm, type, location, medsos, order, payment } = require("../../models")

exports.createUMKM = async ( payload ) => {
  const { type_id, medsos_id, ...payload} = payload
  const data = await umkm.create(payload)
  
  if (type_id && type_id.length > 0) {
    await data.setTypes(type_id)
  }

  if (medsos_id && medsos_id.length > 0) {
    await Promise.all(medsos_id.map(med =>
      medsos.create({ ...med, umkm_id: data.id })
    ))
  }

  return data
}

exports.findAllUmkm = async () => {
  const data = await umkm.findAll({
    include: [
      { model : type },
      { model : location },
      { model : medsos },
      { model : order },
      { model : payment }
    ]
  })
  return data
}

exports.findUmkmById = async ( id ) => {
  const data = await umkm.findOne({
    where: { id },
    include: [
      { model : type },
      { model : location },
      { model : medsos },
      { model : order },
      { model : payment }
    ] 
  })
  return data
}

exports.updateUmkm = async ( id, payload ) => {
  await umkm.update(payload, { where: { id } })
  const data = await umkm.findOne({ where: { id } })
  return data
}

exports.deleteUmkm = async ( id ) => {
  const data = await umkm.destroy({ where: { id } })
  return data
}