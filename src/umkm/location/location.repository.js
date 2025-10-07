const { location } = require('../../../models')

exports.createLocation = async ( payload ) => {
  return await location.create(payload)
}