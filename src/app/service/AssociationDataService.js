import AssociationDataRepository from '../repository/AssociationDataRepository.js'

class AssociationDataService {
  async createAssociationData(data) {
    const currentYear = new Date().getFullYear()

    const firstProtocolNumber =
      currentYear === 2026 ? 2026236 : currentYear * 1000 + 1

    try {
      const lastProtocolNumber =
        await AssociationDataRepository.findLastProtocolNumberByYear(
          currentYear,
        )

      const nextProtocolNumber = lastProtocolNumber
        ? Number(lastProtocolNumber) + 1
        : firstProtocolNumber

      const associationData = await AssociationDataRepository.create({
        ...data,
        numero_do_protocolo: nextProtocolNumber,
      })

      return associationData
    } catch (error) {
      throw new Error('Error creating association data: ' + error.message)
    }
  }

  async updateAssociationData(id, data) {
    try {
      const associationData = await AssociationDataRepository.findById(id)
      if (!associationData) {
        throw new Error('Association data not found')
      }

      const updatedRowsCount = await AssociationDataRepository.update(id, data)
      return updatedRowsCount
    } catch (error) {
      throw new Error('Error updating association data: ' + error.message)
    }
  }

  async findPendingWithoutRequirement(filters) {
    const { page = 1, limit = 10, search } = filters

    try {
      const pagination = {
        page: Number(page),
        limit: Number(limit),
      }

      if (search?.trim()) {
        return await AssociationDataRepository.findPendingWithoutRequirementSearch(
          {
            search: search.trim(),
            ...pagination,
          },
        )
      }

      return await AssociationDataRepository.findPendingWithoutRequirement(
        pagination,
      )
    } catch (error) {
      throw new Error(
        'Error finding pending associations without requirement: ' +
          error.message,
      )
    }
  }

  async findPendingRequirements(filters) {
    const { page = 1, limit = 10, search } = filters

    try {
      const pagination = {
        page: Number(page),
        limit: Number(limit),
      }

      if (search?.trim()) {
        return await AssociationDataRepository.findPendingRequirementsSearch({
          search: search.trim(),
          ...pagination,
        })
      }

      return await AssociationDataRepository.findPendingRequirements(pagination)
    } catch (error) {
      throw new Error('Error finding pending requirements: ' + error.message)
    }
  }

  async findCompletedAssociations(filters) {
    const { page = 1, limit = 10, search } = filters

    try {
      const pagination = {
        page: Number(page),
        limit: Number(limit),
      }

      if (search?.trim()) {
        return await AssociationDataRepository.findCompletedAssociationsSearch({
          search: search.trim(),
          ...pagination,
        })
      }

      return await AssociationDataRepository.findCompletedAssociations(
        pagination,
      )
    } catch (error) {
      throw new Error('Error finding completed associations: ' + error.message)
    }
  }

  async getAllAssociationData() {
    try {
      const associationDataList =
        await AssociationDataRepository.findAllAssociationData()
      return associationDataList
    } catch (error) {
      throw new Error('Error retrieving association data: ' + error.message)
    }
  }

  async findAll() {
    try {
      const listClients =
        await AssociationDataRepository.findAllAssociationData()
      return listClients
    } catch (error) {
      throw +new Error('Error finding association data: ' + error.message)
    }
  }
}

export default new AssociationDataService()
