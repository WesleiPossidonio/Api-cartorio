import User from '../models/User.js'
import { Op, Sequelize } from 'sequelize'

const searchCondition = (search) =>
  Sequelize.where(
    Sequelize.literal(`
      to_tsvector(
        'portuguese',
        coalesce("Users"."name", '') || ' ' ||
        coalesce("Users"."email", '') || ' ' ||
        coalesce("Users"."registration", '')
      )
    `),
    '@@',
    Sequelize.fn('plainto_tsquery', 'portuguese', search),
  )

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

  async findAll(filters = {}) {
    const page = Number(filters.page) || 1
    const limit = Number(filters.limit) || 10

    const offset = (page - 1) * limit

    const { rows: users, count: total } = await User.findAndCountAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    })

    return {
      usersData: users,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    }
  }

  async findAllSearch(filters = {}) {
    const { search } = filters

    const page = Number(filters.page) || 1
    const limit = Number(filters.limit) || 10

    const offset = (page - 1) * limit

    const { rows: users, count: total } = await User.findAndCountAll({
      where: {
        [Op.and]: [searchCondition(search)],
      },

      order: [['createdAt', 'DESC']],

      limit,
      offset,

      distinct: true,
    })

    return {
      usersData: users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    }
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
