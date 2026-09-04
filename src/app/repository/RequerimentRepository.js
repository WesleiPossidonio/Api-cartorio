import Requeriment from '../models/Requeriment'

class RequerimentRepository {
  async create(data) {
    const requeriment = await Requeriment.create(data)
    return requeriment
  }

  async update(id, data) {
    const [updatedRowsCount] = await Requeriment.update(data, {
      where: { id },
    })

    return updatedRowsCount
  }

  async patchUpdateRequeriment(id, data) {
    await Requeriment.update(data, { where: { id } })
    return Requeriment.findByPk(id)
  }

  async updateStatus(id, status) {
    const [updatedRowsCount] = await Requeriment.update(
      { estado_do_requerimento: status },
      { where: { id } },
    )
    return updatedRowsCount
  }

  async findById(id) {
    const requeriment = await Requeriment.findByPk(id)
    return requeriment
  }

  async delete(id) {
    return Requeriment.destroy({ where: { id } })
  }
}

export default new RequerimentRepository()
