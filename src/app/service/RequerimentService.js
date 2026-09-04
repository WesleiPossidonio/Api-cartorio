import AssociationDataRepository from '../repository/AssociationDataRepository.js'
import RequerimentRepository from '../repository/RequerimentRepository.js'
import UnlistedRequerimentsRepository from '../repository/UnlistedRequerimentsRepository.js'

class RequerimentService {
  validateCompletion(data) {
    const requirementFields = [
      'lista_e_edital',
      'documento_inelegivel',
      'assinatura_do_advogado',
      'declaracao_criminal',
      'declaracao_de_desimpedimento',
      'livro_rasao',
      'ppe',
      'requisitos_estatuto',
      'dissolucao_ou_exticao',
      'fundacoes',
      'reconhecimento_de_firma',
      'preechimento_completo',
      'oab',
      'documentacao_de_identificacao',
      'campo_de_assinatura',
      'retificacao_de_redacao',
      'requisitos_criacao_de_estatuto',
      'requisitos_de_estatutos_fundadores',
      'requerimento_eletronico_rcpj',
    ]

    const fieldsToValidate = requirementFields.filter(
      (field) => data[field] !== undefined && data[field] !== 'Não-Listado',
    )

    const isCompleted = fieldsToValidate.every(
      (field) => data[field] === 'Recebido',
    )

    return isCompleted
  }

  async createRequeriment(data) {
    try {
      const requeriment = await RequerimentRepository.create({
        ...data,
        informacao_divergente: { info: '', state: '' },
      })

      await AssociationDataRepository.update(data.exigencias_id, {
        status_association: 'Concluído',
      })

      if (data.unlisted_requirements && data.unlisted_requirements.length > 0) {
        const unlistedRequirementsData = data.unlisted_requirements.map(
          (req) => ({
            ...req,
            requirement_id: requeriment.id,
          }),
        )
        await UnlistedRequerimentsRepository.create(unlistedRequirementsData)
      }

      return requeriment
    } catch (error) {
      throw new Error('Error creating requeriment: ' + error.message)
    }
  }

  async updateRequeriment(id, data) {
    try {
      const requerimentExists = await RequerimentRepository.findById(id)
      const unlistedRequirements =
        await UnlistedRequerimentsRepository.findByRequirimentId(id)

      if (!requerimentExists) {
        throw new Error('Requeriment not found')
      }

      if (data.unlisted_requirements && data.unlisted_requirements > 0) {
        await UnlistedRequerimentsRepository.update(data.unlisted_requirements)
      }

      const isCompleted = this.validateCompletion(data)
      const unlistedCompleted = unlistedRequirements.every(
        (item) => item.status === 'Concluído',
      )

      const updatedData = {
        ...data,
        estado_do_requerimento:
          isCompleted && unlistedCompleted ? 'Concluído' : 'Pendente',
      }
      return await RequerimentRepository.update(id, updatedData)
    } catch (error) {
      throw new Error('Error updating requeriment: ' + error.message)
    }
  }

  async updatePacthRequeriment(id, data) {
    const requerimentExists = await RequerimentRepository.findById(id)
    if (!requerimentExists) {
      throw new Error('Requeriment not found')
    }

    try {
      return await RequerimentRepository.patchUpdateRequeriment(id, data)
    } catch (error) {
      throw new Error('Error add requeriment: ' + error.message)
    }
  }

  async deleteRequeriment(id) {
    try {
      const requerimentExists = await RequerimentRepository.findById(id)

      if (!requerimentExists) {
        throw new Error('Requeriment not found')
      }

      await AssociationDataRepository.update(requerimentExists.exigencias_id, {
        status_association: 'Pendente',
      })

      const deletedRowsCount = await RequerimentRepository.delete(id)

      return deletedRowsCount
    } catch (error) {
      throw new Error('Error deleting requeriment: ' + error.message)
    }
  }
}

export default new RequerimentService()
