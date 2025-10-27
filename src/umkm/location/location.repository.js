const { location } = require('../../../models')

exports.createLocation = async ( payload ) => {
  return await location.create(payload)
}

exports.updateLocation = async ( id, payload ) => {
  await location.update(payload, { where: { id } })
  return await location.findOne({ where: { id } })
}