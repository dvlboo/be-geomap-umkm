const { createUser, updateUser, deleteUser, findByUsername, findByEmail, findById } = require("./auth.repository")
const jsonwebtoken = require("jsonwebtoken")

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
  const passwordMatch = bcrypt.compare(payload.password, user.password)
  
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

exports.deleteUser = async (id) => await deleteUser(id)