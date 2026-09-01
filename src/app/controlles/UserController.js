import validator from 'validator'
import * as Yup from 'yup'
import UserService from '../service/UserService'

// Função de sanitização reutilizável
const sanitizeInput = (data) => {
  const sanitizedData = {}
  Object.keys(data).forEach((key) => {
    sanitizedData[key] =
      typeof data[key] === 'string' && key !== 'registration'
        ? validator.escape(data[key])
        : data[key]
  })
  return sanitizedData
}
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

    const sanitizedBody = sanitizeInput(request.body)

    try {
      await schema.validateSync(sanitizedBody, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { name, email, password, admin, registration, update_number } =
      sanitizedBody

    try {
      await UserService.createUser(
        { name, email, password, admin, registration, update_number },
        request.userId,
      )
      return response.status(201).json({ message: 'User created successfully' })
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      update_number: Yup.string().optional(),
      password: Yup.string().optional().min(6),
      name: Yup.string().optional(),
      email: Yup.string().email().optional(),
      registration: Yup.string().optional(),
    })

    const sanitizedBody = sanitizeInput(request.body)

    try {
      await schema.validateSync(sanitizedBody, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { password, name, email, registration } = sanitizedBody
    const { id } = request.params

    const dataUser = { password, name, email, registration }
    try {
      await UserService.updateUser(id, dataUser, request.userId)
      return response.status(200).json({ message: 'User updated successfully' })
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }

  async index(request, response) {
    const { page = 1, limit = 10, search } = request.query

    try {
      const users = await UserService.getAllUsers({
        page: Number(page),
        limit: Number(limit),
        search: search?.trim(),
      })

      return response.status(200).json(users)
    } catch (error) {
      console.log(error)

      return response.status(500).json({
        error: 'Internal server error',
      })
    }
  }

  async updatePassword(request, response) {
    const schema = Yup.object().shape({
      password: Yup.string().required().min(6),
      update_number: Yup.string().required(),
    })

    const sanitizedBody = sanitizeInput(request.body)

    try {
      await schema.validateSync(sanitizedBody, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { password, update_number } = sanitizedBody

    try {
      await UserService.updatePassword(update_number, password)
      return response
        .status(200)
        .json({ message: 'Password updated successfully' })
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }

  async delete(request, response) {
    const { id } = request.params

    try {
      await UserService.deleteUser(id, request.userId)
      return response.status(200).json({ message: 'User deleted successfully' })
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}

export default new UserController()
