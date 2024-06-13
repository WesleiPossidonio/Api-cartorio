import * as Yup from 'yup'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth.js'

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

    if (!(await schema.isValid(request.body))) {
      return nameOrPasswordIncorrect()
    }

    const { name, password } = request.body

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
