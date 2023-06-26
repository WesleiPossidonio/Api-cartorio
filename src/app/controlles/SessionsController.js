import * as Yup from 'yup'
import User from '../models/User'
import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'

class SessionController {
  async store(request, response) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    })

    const emailOrPasswordIncorrect = () => {
      return response
        .status(400)
        .json({ error: 'Make sure your password or email are correct' })
    }

    if (!(await schema.isValid(request.body))) {
      return emailOrPasswordIncorrect()
    }

    const { email, password } = request.body

    const users = await User.findOne({
      where: { email },
    })

    if (!users) {
      return emailOrPasswordIncorrect()
    }

    if (!(await users.checkPassword(password))) {
      return emailOrPasswordIncorrect()
    }

    return response.json({
      id: users.id,
      email,
      name: users.name,
      admin: users.admin,
      registration: users.registration,
      token: jwt.sign({ id: users.id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    })
  }
}

export default new SessionController()
