const { getTokenFromHeader, extractToken } = require("../../utils/jwtoken")
const { profile } = require("./auth.services")

exports.authMiddleware = () => async (req, res, next) => {
  try {
    const token = getTokenFromHeader(req?.headers)

    const extractedToken = extractToken(token)
    
    const user = await profile(extractedToken?.id)

    req.user = user
    
    next()
  } catch (error) {
    next(error)
  }
}
