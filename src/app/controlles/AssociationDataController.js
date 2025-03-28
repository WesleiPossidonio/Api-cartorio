import * as Yup from 'yup'
import validator from 'validator'
import AssociationData from '../models/AssociationData'
import Requeriment from '../models/Requeriment'

// Função de sanitização reutilizável
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
  async store (request, response) {
    const schema = Yup.object().shape({
      nome_da_instituicao: Yup.string().required(),
      numero_do_protocolo: Yup.number().required(),
      cnpj_cpf: Yup.string().required(),
      nome_do_representante: Yup.string().required(),
      email_do_representante: Yup.string().email().required(),
      telefone_contato: Yup.string().required(),
      sobre_exigencia: Yup.string().required(),
      status_association: Yup.string().optional(),
    })

    // Sanitização dos dados de entrada
    const sanitizedData = sanitizeInput(request.body)

    try {
      await schema.validateSync(sanitizedData, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const {
      nome_da_instituicao,
      numero_do_protocolo,
      cnpj_cpf,
      nome_do_representante,
      email_do_representante,
      telefone_contato,
      sobre_exigencia,
      status_association
    } = sanitizedData

    try {
      const dataAssociationProtocolNumber = await AssociationData.findOne({
        where: { numero_do_protocolo },
      })

      if (dataAssociationProtocolNumber) {
        return response
          .status(409)
          .json({ error: 'this number protocol already exists' })
      }

      const association = await AssociationData.create({
        nome_da_instituicao,
        numero_do_protocolo,
        cnpj_cpf,
        nome_do_representante,
        email_do_representante,
        telefone_contato,
        sobre_exigencia,
        status_association
      })

      return response.status(201).json(association)
    } catch (error) {
      return response.status(500).json({ error: 'Internal server error', errorValue: error.value })
    }
  }

  async index (request, response) {
    try {
      const associations = await AssociationData.findAll({
        order: [['createdAt', 'ASC']],
        include: [
          {
            model: Requeriment,
            as: 'exigencias',
            attributes: [
              'id',
              'declaracao_sindical',
              'lista_e_edital',
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
              'informacao_divergente',
              'requisitos_de_estatutos_fundadores',
              'requisitos_criacao_de_estatuto',
              'estado_do_requerimento',
              'observations_lista_e_edital',
              'observations_assinatura_do_advogado',
              'observations_declaracao_criminal',
              'observations_declaracao_de_desimpedimento',
              'observations_livro_rasao',
              'observations_requisitos_estatuto',
              'observations_ppe',
              'observations_requisitos_criacao_de_estatuto',
              'observations_dissolucao_ou_exticao',
              'observations_fundacoes',
              'observations_reconhecimento_de_firma',
              'observations_oab',
              'observations_documentacao_de_identificacao',
              'observations_requisitos_de_estatutos_fundadores',
              'observations_campo_de_assinatura',
              'observations_retificacao_de_redacao',
              'observations_declaracao_sindical',
            ],
          },
        ],
      })

      response.status(200).json(associations)
    } catch (error) {
      console.log(error)
      response.status(500).send('Internal server error')
    }
  }

  async update (request, response) {
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

    // Sanitização dos dados de entrada
    const sanitizedData = sanitizeInput(request.body)

    try {
      await schema.validateSync(sanitizedData, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { id } = request.params

    const userExists = await AssociationData.findOne({
      where: { id },
    })

    if (!userExists) {
      return response.status(400).json({ error: 'User not found' })
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

    if (status_association !== 'Concluido') console.log("errorrr", status_association)

    await AssociationData.update(
      {
        nome_da_instituicao,
        numero_do_protocolo,
        sobre_exigencia,
        cnpj_cpf,
        status_association,
        nome_do_representante,
        email_do_representante,
        telefone_contato,
      },
      { where: { id } },
    )

    return response.status(201).json({
      nome_da_instituicao,
      numero_do_protocolo,
      cnpj_cpf,
      nome_do_representante,
      email_do_representante,
      telefone_contato,
      sobre_exigencia,
      status_association,
    })
  }
}

export default new AssociationDataController()
