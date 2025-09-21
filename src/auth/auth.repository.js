const { Auth } = require('../../models')
const bcrypt = require('bcrypt')


exports.createUser = async ( payload ) => {
  payload.password = bcrypt.hashSync(payload.password, 10)

  const user = await Auth.create(payload)
  return user
}

exports.findByEmail = async ( email ) => {
  const user = await Auth.findOne({ where: { email } })
  return user
}

exports.findByUsername = async ( username ) => {
  const user = await Auth.findOne({ where: { username } })
  return user
}

exports.findById = async ( id ) => {
  const user = await Auth.findOne({ where: { id } })
  return user
}

exports.updateUser = async ( id, payload ) => {
  if (payload.password) {
    payload.password = bcrypt.hashSync(payload.password, 10)
  }
  const user = await Auth.update(payload, { where: { id } })
  return user
}

exports.deleteUser = async ( id ) => {
  const user = await Auth.destroy({ where: { id } })
  return user
}