const { register, login, deleteUser, profile, update } = require("./auth.services")

exports.register = async (req, res, next) => {
  try {

    const { email, password, username } = req.body

    if (email == "" ||!email) {
      return next({
        status: 400,
        message: "Email is required"
      })
    }

    if (password == "" ||!password) {
      return next({
        status: 400,
        message: "Password is required"
      })
    }
    
    if (username == "" ||!username) {
      return next({
        status: 400,
        message: "Username is required"
      })
    }

    const data = await register({ email, password, username })
    
    res.status(200).json({
      message: "User registered successfully",
      data
    })

  } catch (error) {
    next(error)
  }
}

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body

    if (username == "" ||!username) {
      return next({
        status: 400,
        message: "Username is required"
      })
    }

    if (password == "" ||!password) {
      return next({
        status: 400,
        message: "Password is required"
      })
    }

    const data = await login({ username, password })

    res.status(200).json({
      message: "Login User",
      data
    })
  } catch (error) {
    next(error)
  }
}

exports.profile = async (req, res, next) => {
  try {
    const data = await profile(req.user.id)
    res.status(200).json({
      message: "User profile",
      data
    })
  } catch (error) {
    next(error)
  }
}

exports.update = async (req, res, next) => {
  try {
    const { id } = req.user
    const {username, email} = req.body

    if (username == "" ||!username) {
      return next({
        status: 400,
        message: "Username is required"
      })
    }
    if (email == "" ||!email) {
      return next({
        status: 400,
        message: "Email is required"
      })
    }

    const data = await update(id, {username, email})

    res.status(200).json({
      message: "User updated successfully",
      data
    })

  } catch (error) {
    next(error)
  }
}

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.user
    const data = await deleteUser(id)

    res.status(200).json({
      message: "User deleted successfully",
      data
    })

  } catch (error) {
    next(error)
  }
}