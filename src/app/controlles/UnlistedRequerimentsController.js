import UnlistedRequerimentsService from '../service/UnlistedRequerimentsService'

class UnlistedRequerimentsController {
  async delete(request, response) {
    const { id } = request.params

    try {
      await UnlistedRequerimentsService.deleteUnlistedRequirement(id)
      return response
        .status(200)
        .json({ message: 'Unlisted requirement deleted successfully' })
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}

export default new UnlistedRequerimentsController()
