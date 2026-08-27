import User from '../models/User.js'

class UserRepository {
  async create(data) {
    const user = await User.create(data)
    return user
  }

  async update(id, data) {
    const [updatedRowsCount] = await User.update(data, {
      where: { id },
    })
    return updatedRowsCount
  }

  async findById(id) {
    const user = await User.findByPk(id)
    return user
  }

  async findByEmail(email) {
    const user = await User.findOne({ where: { email } })
    return user
  }

  async findUpdateNumber(update_number) {
    const user = await User.findOne({ where: { update_number } })
    return user
  }

  async delete(id) {
    const deletedRowsCount = await User.destroy({
      where: { id },
    })
    return deletedRowsCount
  }
}

export default new UserRepository()
