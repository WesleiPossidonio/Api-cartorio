const {
  default: UnlistedRequerimentsRepository,
} = require('../repository/UnlistedRequerimentsRepository')

class UnlistedRequerimentsService {
  async createOne(data) {
    try {
      const unlistedRequirement =
        await UnlistedRequerimentsRepository.createOne(data)

      return unlistedRequirement
    } catch (error) {
      throw new Error('Error creating unlisted requirement: ' + error.message)
    }
  }

  async deleteUnlistedRequirement(id) {
    try {
      const unlistedRequirementExists =
        await UnlistedRequerimentsRepository.findById(id)

      if (!unlistedRequirementExists) {
        throw new Error('Unlisted requirement not found')
      }

      return await UnlistedRequerimentsRepository.delete(id)
    } catch (error) {
      throw new Error('Error deleting unlisted requirement: ' + error.message)
    }
  }

  async updateUnlistedRequirement(data) {
    try {
      if (!data) {
        throw new Error('Data is required')
      }

      return await UnlistedRequerimentsRepository.update(data)
    } catch (error) {
      throw new Error('Error updating unlisted requirements: ' + error.message)
    }
  }

  async updateById(id, data) {
    try {
      const unlistedRequirementExists =
        await UnlistedRequerimentsRepository.findById(id)

      if (!unlistedRequirementExists) {
        throw new Error('Unlisted requirement not found')
      }

      return await UnlistedRequerimentsRepository.updateById(id, data)
    } catch (error) {
      throw new Error(
        'Error updating unlisted requirement by id: ' + error.message,
      )
    }
  }
}

export default new UnlistedRequerimentsService()
