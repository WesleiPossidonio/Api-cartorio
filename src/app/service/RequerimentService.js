import AssociationDataRepository from '../repository/AssociationDataRepository.js'
import RequerimentRepository from '../repository/RequerimentRepository.js'

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
      const requeriment = await RequerimentRepository.create(data)

      await AssociationDataRepository.update(data.exigencias_id, {
        status_association: 'Concluído',
      })

      return requeriment
    } catch (error) {
      throw new Error('Error creating requeriment: ' + error.message)
    }
  }

  async updateRequeriment(id, data) {
    try {
      const requerimentExists = await RequerimentRepository.findById(id)

      if (!requerimentExists) {
        throw new Error('Requeriment not found')
      }

      const isCompleted = this.validateCompletion(data)
      const updatedData = {
        ...data,
        estado_do_requerimento: isCompleted ? 'Concluído' : 'Pendente',
      }

      return await RequerimentRepository.update(id, updatedData)
    } catch (error) {
      throw new Error('Error updating requeriment: ' + error.message)
    }
  }

  async deleteRequeriment(id) {
    try {
      const requerimentExists = await RequerimentRepository.findById(id)

      if (!requerimentExists) {
        throw new Error('Requeriment not found')
      }

      const deletedRowsCount = await RequerimentRepository.delete(id)

      return deletedRowsCount
    } catch (error) {
      throw new Error('Error deleting requeriment: ' + error.message)
    }
  }
}

export default new RequerimentService()
