import * as Yup from 'yup'
import validator from 'validator'
import User from '../models/User'
import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'

// Função de sanitização reutilizável
const sanitizeInput = (data) => {
  const sanitizedData = {}
  Object.keys(data).forEach((key) => {
    sanitizedData[key] =
      typeof data[key] === 'string' ? validator.escape(data[key]) : data[key]
  })
  return sanitizedData
}

class SessionController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      password: Yup.string().required(),
    })

    const nameOrPasswordIncorrect = () => {
      return response
        .status(400)
        .json({ error: 'Make sure your password or name are correct' })
    }

    const sanitizedBody = sanitizeInput(request.body)

    if (!(await schema.isValid(sanitizedBody))) {
      return nameOrPasswordIncorrect()
    }

    const { name, password } = sanitizedBody

    const users = await User.findOne({
      where: { name },
    })

    if (!users) {
      return nameOrPasswordIncorrect()
    }

    if (!(await users.checkPassword(password))) {
      return nameOrPasswordIncorrect()
    }

    return response.json({
      id: users.id,
      name: users.name,
      admin: users.admin,
      email: users.email,
      registration: users.registration,
      token: jwt.sign({ id: users.id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    })
  }
}

export default new SessionController()
