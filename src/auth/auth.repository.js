const { auth } = require('../../models')
const bcrypt = require('bcrypt')


exports.createUser = async ( payload ) => {
  payload.password = bcrypt.hashSync(payload.password, 10)

  const user = await auth.create(payload)
  return user
}

exports.findByEmail = async ( email ) => {
  const user = await auth.findOne({ where: { email } })
  return user
}

exports.findByUsername = async ( username ) => {
  const user = await auth.findOne({ where: { username } })
  return user
}

exports.findById = async ( id ) => {
  const user = await auth.findOne({ where: { id } })
  return user
}

exports.updateUser = async ( id, payload ) => {
  if (payload.password) {
    payload.password = bcrypt.hashSync(payload.password, 10)
  }
  await auth.update(payload, { where: { id } })
  const user = await auth.findOne({ where: { id } })
  return user
}

exports.deleteUser = async ( id ) => {
  const user = await auth.findOne({ where: { id } })
  await auth.destroy({ where: { id } })
  return user
}