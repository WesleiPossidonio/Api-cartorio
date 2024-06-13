import * as Yup from 'yup'
import AssociationData from '../models/AssociationData.js'
import Requeriment from '../models/Requeriment.js'

class AssociationDataController {
  async store(request, response) {
    const schema = Yup.object().shape({
      nome_da_instituicao: Yup.string().required(),
      numero_do_protocolo: Yup.number().required(),
      cnpj: Yup.string().optional(),
      cpf: Yup.string().optional(),
      nome_do_representante: Yup.string().required(),
      email_do_representante: Yup.string().email().required(),
      telefone_contato: Yup.string().required(),
      sobre_exigencia: Yup.string().required(),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const {
      nome_da_instituicao,
      numero_do_protocolo,
      cnpj,
      nome_do_representante,
      email_do_representante,
      telefone_contato,
      sobre_exigencia,
      cpf,
    } = request.body

    const dataRequerimentProtocolNumber = await AssociationData.findOne({
      where: { numero_do_protocolo },
    })

    const oneOfDateVerification = dataRequerimentProtocolNumber

    if (oneOfDateVerification) {
      return response
        .status(409)
        .json({ error: 'this number protocol already exists' })
    }

    const requeriment = await AssociationData.create({
      nome_da_instituicao,
      numero_do_protocolo,
      cnpj,
      cpf,
      nome_do_representante,
      email_do_representante,
      telefone_contato,
      sobre_exigencia,
    })

    return response.status(201).json({
      id: requeriment.id,
      nome_da_instituicao,
      numero_do_protocolo,
      cnpj,
      nome_do_representante,
      email_do_representante,
      telefone_contato,
      sobre_exigencia,
      cpf,
    })
  }

  async index(request, response) {
    try {
      const requirements = await AssociationData.findAll({
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
            ],
          },
        ],
      })

      response.status(200).json(requirements)
    } catch (error) {
      console.log(error)
      response.status(500).send('Internal server error')
    }
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      nome_da_instituicao: Yup.string().optional(),
      numero_do_protocolo: Yup.number().optional(),
      cnpj: Yup.string().optional(),
      cpf: Yup.string().optional(),
      nome_do_representante: Yup.string().optional(),
      email_do_representante: Yup.string().email().optional(),
      telefone_contato: Yup.string().optional(),
      sobre_exigencia: Yup.string().optional(),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
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
      cnpj,
      nome_do_representante,
      email_do_representante,
      telefone_contato,
      sobre_exigencia,
      cpf,
    } = request.body

    await AssociationData.update(
      {
        nome_da_instituicao,
        numero_do_protocolo,
        sobre_exigencia,
        cnpj,
        nome_do_representante,
        email_do_representante,
        telefone_contato,
        cpf,
      },
      { where: { id } }
    )

    return response.status(201).json({
      nome_da_instituicao,
      numero_do_protocolo,
      cnpj,
      nome_do_representante,
      email_do_representante,
      telefone_contato,
      sobre_exigencia,
    })
  }
}

export default new AssociationDataController()
