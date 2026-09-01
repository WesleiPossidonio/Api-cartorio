import * as Yup from 'yup'
import validator from 'validator'
import AssociationData from '../models/AssociationData'
import AssociationDataService from '../service/AssociationDataService'
import AssociationDataRepository from '../repository/AssociationDataRepository'

const sanitizeInput = (data) => {
  const sanitizeCnpjCpf = (cnpjCpf) => {
    if (!cnpjCpf) return undefined

    // eslint-disable-next-line no-useless-escape
    return cnpjCpf.replace(/[^0-9a-zA-Z\/\.\-]/g, '')
  }

  return {
    nome_da_instituicao: data.nome_da_instituicao
      ? validator.escape(data.nome_da_instituicao)
      : undefined,
    numero_do_protocolo: data.numero_do_protocolo
      ? validator.toInt(data.numero_do_protocolo.toString())
      : undefined,
    cnpj_cpf: sanitizeCnpjCpf(data.cnpj_cpf),
    nome_do_representante: data.nome_do_representante
      ? validator.escape(data.nome_do_representante)
      : undefined,
    email_do_representante: data.email_do_representante
      ? validator.normalizeEmail(data.email_do_representante)
      : undefined,
    telefone_contato: data.telefone_contato
      ? validator.escape(data.telefone_contato)
      : undefined,
    sobre_exigencia: data.sobre_exigencia
      ? validator.escape(data.sobre_exigencia)
      : undefined,
    status_association: data.status_association
      ? validator.escape(data.status_association)
      : undefined,
  }
}

class AssociationDataController {
  async store(request, response) {
    const schema = Yup.object().shape({
      nome_da_instituicao: Yup.string().required(),
      cnpj_cpf: Yup.string().required(),
      nome_do_representante: Yup.string().required(),
      email_do_representante: Yup.string().email().required(),
      telefone_contato: Yup.string().required(),
      sobre_exigencia: Yup.string().required(),
      status_association: Yup.string().optional(),
    })

    const sanitizedData = sanitizeInput(request.body)

    try {
      await schema.validateSync(sanitizedData, {
        abortEarly: false,
      })
    } catch (err) {
      return response.status(400).json({
        error: err.errors,
      })
    }

    const {
      nome_da_instituicao,
      numero_do_protocolo,
      cnpj_cpf,
      nome_do_representante,
      email_do_representante,
      telefone_contato,
      sobre_exigencia,
      status_association,
    } = sanitizedData

    try {
      const association = await AssociationDataService.createAssociationData({
        nome_da_instituicao,
        numero_do_protocolo,
        cnpj_cpf,
        nome_do_representante,
        email_do_representante,
        telefone_contato,
        sobre_exigencia,
        status_association,
      })

      return response.status(201).json(association)
    } catch (error) {
      return response.status(500).json({
        error: 'Internal server error',
        errorValue: error.message,
      })
    }
  }

  async index(request, response) {
    try {
      const associations = await AssociationDataService.findAll()
      return response.status(200).json(associations)
    } catch (error) {
      console.log(error)

      return response.status(500).json({
        error: 'Internal server error',
      })
    }
  }

  async pendingWithoutRequirement(request, response) {
    const { page = 1, limit = 10, search } = request.query

    try {
      const associations =
        await AssociationDataService.findPendingWithoutRequirement({
          page: Number(page),
          limit: Number(limit),
          search: search?.trim(),
        })

      return response.status(200).json(associations)
    } catch (error) {
      console.log(error)

      return response.status(500).json({
        error: 'Internal server error',
      })
    }
  }

  async pendingRequirements(request, response) {
    const { page = 1, limit = 10, search } = request.query

    try {
      const associations = await AssociationDataService.findPendingRequirements(
        {
          page: Number(page),
          limit: Number(limit),
          search: search?.trim(),
        },
      )

      return response.status(200).json(associations)
    } catch (error) {
      console.log(error)

      return response.status(500).json({
        error: 'Internal server error',
      })
    }
  }

  async completedAssociations(request, response) {
    const { page = 1, limit = 10, search } = request.query

    try {
      const associations =
        await AssociationDataService.findCompletedAssociations({
          page: Number(page),
          limit: Number(limit),
          search: search?.trim(),
        })

      return response.status(200).json(associations)
    } catch (error) {
      console.log(error)

      return response.status(500).json({
        error: 'Internal server error',
      })
    }
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      nome_da_instituicao: Yup.string().optional(),
      numero_do_protocolo: Yup.number().optional(),
      cnpj_cpf: Yup.string().optional(),
      nome_do_representante: Yup.string().optional(),
      email_do_representante: Yup.string().email().optional(),
      telefone_contato: Yup.string().optional(),
      sobre_exigencia: Yup.string().optional(),
      status_association: Yup.string().optional(),
    })

    const sanitizedData = sanitizeInput(request.body)

    try {
      await schema.validateSync(sanitizedData, {
        abortEarly: false,
      })
    } catch (err) {
      return response.status(400).json({
        error: err.errors,
      })
    }

    const { id } = request.params

    const {
      nome_da_instituicao,
      numero_do_protocolo,
      cnpj_cpf,
      nome_do_representante,
      email_do_representante,
      telefone_contato,
      sobre_exigencia,
      status_association,
    } = sanitizedData

    const updatedData = {
      nome_da_instituicao,
      numero_do_protocolo,
      cnpj_cpf,
      nome_do_representante,
      email_do_representante,
      telefone_contato,
      sobre_exigencia,
      status_association,
    }

    try {
      await AssociationDataService.updateAssociationData(id, updatedData)

      return response.status(200).json({
        message: 'Association updated successfully',
      })
    } catch (error) {
      return response.status(500).json({
        error: error.message,
      })
    }
  }

  async findById(request, response) {
    try {
      const { id } = request.params

      const associationData = await AssociationDataRepository.findById(id)

      if (!associationData) {
        return response.status(404).json({
          message: 'Associação não encontrada.',
        })
      }

      return response.status(200).json(associationData)
    } catch (error) {
      return response.status(500).json({
        message: 'Erro ao buscar associação.',
        error: error.message,
      })
    }
  }

  async bulkUpdate(request, response) {
    const updates = request.body

    if (!Array.isArray(updates) || updates.length === 0) {
      return response.status(400).json({
        error: 'Envie um array de registros para atualização.',
      })
    }

    try {
      await AssociationData.bulkCreate(updates, {
        updateOnDuplicate: [
          'nome_da_instituicao',
          'numero_do_protocolo',
          'cnpj_cpf',
          'nome_do_representante',
          'email_do_representante',
          'telefone_contato',
          'sobre_exigencia',
          'status_association',
        ],
      })

      return response.json({
        message: 'Atualização em massa realizada com sucesso',
      })
    } catch (error) {
      return response.status(500).json({
        error: 'Erro ao atualizar registros',
        details: error.message,
      })
    }
  }

  async delete(request, response) {
    const { id } = request.params

    try {
      const associationData = await AssociationDataRepository.findById(id)

      if (!associationData) {
        return response.status(404).json({
          message: 'Associação não encontrada.',
        })
      }

      await AssociationDataRepository.delete(id)

      return response.status(200).json({
        message: 'Associação deletada com sucesso.',
      })
    } catch (error) {
      return response.status(500).json({
        message: 'Erro ao deletar associação.',
        error: error.message,
      })
    }
  }
}

export default new AssociationDataController()
