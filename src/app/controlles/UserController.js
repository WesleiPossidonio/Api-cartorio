import { v4 } from 'uuid'
import User from '../models/User'

import * as Yup from 'yup'

class UserController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
      admin: Yup.boolean(),
      registration: Yup.string().required(),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { name, email, password, admin, registration } = request.body

    const userExists = await User.findOne({
      where: { email },
    })

    if (userExists) {
      return response.status(409).json({ error: 'User already exists' })
    }

    await User.create({
      id: v4(),
      name,
      email,
      password,
      admin,
      registration,
    })

    return response.status(201).json()
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      password: Yup.string().required().min(6),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { id } = request.params
    const { password } = request.body

    const userExists = await User.findOne({
      where: { id },
    })

    if (!userExists) {
      return response.status(400).json({ error: 'User not found' })
    }

    await User.update({ password }, { where: { id } })

    return response.status(200).json()
  }
}

export default new UserController()
