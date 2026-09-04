const {
  default: UnlistedRequerimentsRepository,
} = require('../repository/UnlistedRequerimentsRepository')

class UnlistedRequerimentsService {
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
      await UnlistedRequerimentsRepository.update(data)
    } catch (error) {
      throw new Error('Error updating unlisted requirements: ' + error.message)
    }
  }
}

export default new UnlistedRequerimentsService()
