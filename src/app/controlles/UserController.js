import { v4 } from 'uuid'
import User from '../models/User'

import * as Yup from 'yup'

class UserController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
      admin: Yup.boolean().required(),
      update_number: Yup.string().optional(),
      registration: Yup.string().required(),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { name, email, password, admin, registration, update_number } =
      request.body

    const emailUserExists = await User.findOne({
      where: { email },
    })

    const nameUserExists = await User.findOne({
      where: { name },
    })

    if (emailUserExists) {
      return response.status(409).json({ error: 'email user already exists' })
    }

    if (nameUserExists) {
      return response.status(409).json({ error: 'name user already exists' })
    }

    await User.create({
      id: v4(),
      name,
      email,
      password,
      admin,
      registration,
      update_number,
    })

    return response.status(201).json()
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      update_number: Yup.string().required(),
      password: Yup.string().required().min(6),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { password, update_number } = request.body

    const verificationNumber = await User.findOne({
      where: { update_number },
    })

    if (!verificationNumber) {
      return response.status(400).json({ error: 'Invalid update number' })
    }

    await User.update({ password }, { where: { update_number } })

    return response.status(200).json()
  }
}

export default new UserController()
