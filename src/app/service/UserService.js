import UserRepository from '../repository/UserRepository.js'

class UserService {
  async createUser(data, userId) {
    try {
      const existsAdminUser = await UserRepository.findById(userId)
      const axistsEmail = await UserRepository.findByEmail(data.email)

      if (!existsAdminUser || existsAdminUser.role !== 'admin') {
        throw new Error('Acesso negado')
      }

      if (axistsEmail) {
        throw new Error('Email user already exists')
      }

      const user = await UserRepository.create(data)
      return user
    } catch (error) {
      throw new Error('Error creating user: ' + error.message)
    }
  }

  async updateUser(id, data, userId) {
    try {
      const existsAdminUser = await UserRepository.findById(userId)
      if (!existsAdminUser || existsAdminUser.role !== 'admin') {
        throw new Error('Acesso negado')
      }

      const updatedRowsCount = await UserRepository.update(id, data)
      return updatedRowsCount
    } catch (error) {
      throw new Error('Error updating user: ' + error.message)
    }
  }

  async findUserById(id) {
    try {
      const user = await UserRepository.findById(id)
      return user
    } catch (error) {
      throw new Error('Error finding user: ' + error.message)
    }
  }

  async updatePassword(update_number, password) {
    try {
      const user = await UserRepository.findUpdateNumber(update_number)
      if (!user) {
        throw new Error('User not found')
      }

      const updatedRowsCount = await UserRepository.update(user.id, {
        password,
      })
      return updatedRowsCount
    } catch (error) {
      throw new Error('Error updating password: ' + error.message)
    }
  }

  async deleteUser(id, userId) {
    try {
      const existsAdminUser = await UserRepository.findById(userId)
      if (!existsAdminUser || existsAdminUser.role !== 'admin') {
        throw new Error('Acesso negado')
      }

      const deletedRowsCount = await UserRepository.delete(id)
      return deletedRowsCount
    } catch (error) {
      throw new Error('Error deleting user: ' + error.message)
    }
  }
}

export default new UserService()
