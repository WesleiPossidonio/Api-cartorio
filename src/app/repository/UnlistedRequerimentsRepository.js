import UnlistedRequeriments from '../models/UnlistedRequeriments'

class UnlistedRequerimentsRepository {
  async create(data) {
    return await UnlistedRequeriments.bulkCreate(data)
  }

  async findAll() {
    return await UnlistedRequeriments.findAll()
  }

  async findById(id) {
    return await UnlistedRequeriments.findByPk(id)
  }

  async findByRequirimentId(id) {
    return await UnlistedRequeriments.findAll({
      where: {
        requirement_id: id,
      },
    })
  }

  async update(data) {
    const results = await Promise.all(
      data.map(async (item) => {
        const [updatedRowsCount] = await UnlistedRequeriments.update(item, {
          where: { id: item.id },
        })

        return updatedRowsCount
      }),
    )

    return results
  }

  async delete(id) {
    return UnlistedRequeriments.destroy({ where: { id } })
  }
}

export default new UnlistedRequerimentsRepository()
