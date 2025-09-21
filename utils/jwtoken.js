const jsonwebtoken = require('jsonwebtoken')

exports.getTokenFromHeader = (headers) => {
  const { authorization } = headers

  if (!authorization) {
    throw new Error('Need Authorization Header')
  }

  const splitedAuth = authorization.split(' ')

  if (splitedAuth.length < 2 || splitedAuth[0] != 'Bearer') {
    throw new Error('Invalid authorization header format. Format is "Bearer <token>"')
  }

  return splitedAuth[1]
}

exports.extractToken = (token) => decode = jsonwebtoken.verify(token, process.env.JWT_SECRET)