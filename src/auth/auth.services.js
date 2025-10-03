const { createUser, updateUser, deleteUser, findByUsername, findByEmail, findById } = require("./auth.repository")
const jsonwebtoken = require("jsonwebtoken")
const bcrypt = require('bcrypt')

exports.register = async (payload) => {
  const userExists = await findByUsername(payload.username)
  const emailExists = await findByEmail(payload.email)

  if (userExists) {
    throw new Error(`User with username ${payload.username} already exists`)
  } else if (emailExists) {
    throw new Error(`User with email ${payload.email} already exists`)
  } else {
    const user = await createUser(payload)

    user?.dataValues?.password
      ? delete user.dataValues.password
      : delete user.password

    const jwtPayload = {
      id: user.id,
      email: user.email,
      username: user.username
    }

    const token = jsonwebtoken.sign(jwtPayload, process.env.JWT_SECRET, { 
      expiresIn: '2h'
    })

    return { 
      user, 
      token 
    }
  }
}

exports.login = async (payload) => {
  const user = await findByUsername(payload.username)
  if (!user) {
    throw new Error(`User with username ${payload.username} not found`)
  }
  const passwordMatch = await bcrypt.compare(payload.password, user.password)
  
  if (!passwordMatch) {
    throw new Error('Invalid password')
  }

  user?.dataValues?.password
    ? delete user.dataValues.password
    : delete user.password
  
  const jwtPayload = {
    id: user.id,
    email: user.email,
    username: user.username
  }

  const token = jsonwebtoken.sign(jwtPayload, process.env.JWT_SECRET, { 
    expiresIn: '2h'
  })
  
  return { 
    user, 
    token 
  }
}

exports.profile = async (id) => {
  const user = await findById(id)
  if (!user) {
    throw new Error(`User with id ${id} not found`)
  }

  user?.dataValues?.password
    ? delete user.dataValues.password
    : delete user.password

  return user
}

exports.update = async (id, payload) => {
  if (payload.username) {
    const userExists = await findByUsername(payload.username)
    if (userExists && userExists.id != id) {
      throw new Error(`User with username ${payload.username} already exists`)
    }
  }

  if (payload.email) {
    const emailExists = await findByEmail(payload.email)
    if (emailExists && emailExists.id != id) {
      throw new Error(`User with email ${payload.email} already exists`)
    }
  }

  const data = await updateUser(id, payload)
  
  return data
}

exports.changePassword = async (id, payload) => {
  const user = await findById(id)
  if (!user) {
    throw new Error(`User not Found`)
  }

  const isPasswordMatch = await bcrypt.compare(payload.currentPassword, user.password)
  if (!isPasswordMatch) {
    throw new Error('Current password is incorrect')
  }

  const newUserPassword = await bcrypt.hashSync(payload.newPassword, 10)

  const updatedUser = await updateUser(id, { 
    ...user,
    password: newUserPassword 
  })
  return updatedUser
}

exports.forgotPassword = async (email) => {
  const user = await findByEmail(email)
  if (!user) {
    throw new Error(`User not Found`)
  }

  const jwtPayload = { id: user.id }

  const token = jsonwebtoken.sign(jwtPayload, process.env.JWT_SECRET, { 
    expiresIn: '2h'
  })

  const link = `${process.env.FRONTEND_URL}/reset-password/${user.id}/${token}`

  await sendEmailResetPassword(user.email, link)

  return link
}

exports.resetPassword = async (id, token, newPassword) => {
  const user = await findById(id)
  if (!user) {
    throw new Error(`User not Found`)
  }

  jsonwebtoken.verify(token, process.env.JWT_SECRET)
  const encryptedPassword = await bcrypt.hash(newPassword, 10)
  return await updateUser(id, { password: encryptedPassword })
}

exports.deleteUser = async (id) => await deleteUser(id)