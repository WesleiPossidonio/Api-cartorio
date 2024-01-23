import * as Yup from 'yup'

import Requeriment from '../models/Requeriment'
import RequerimentNotListed from '../models/RequerimentNotListed'

class RequerimentController {
  async store(request, response) {
    const schema = Yup.object().shape({
      nome_da_instituicao: Yup.string().required(),
      numero_do_protocolo: Yup.string().required(),
      estado_do_requerimento: Yup.string().optional(),
      cnpj: Yup.string().required(),
      nome_do_representante: Yup.string().required(),
      email_do_representante: Yup.string().email().required(),
      telefone_contato: Yup.string().required(),
      declaracao_sindical: Yup.string().optional(),
      lista_e_edital: Yup.string().optional(),
      assinatura_do_advogado: Yup.string().optional(),
      declaracao_criminal: Yup.string().optional(),
      declaracao_de_desimpedimento: Yup.string().optional(),
      livro_rasao: Yup.string().optional(),
      ppe: Yup.string().optional(),
      requisitos_estatuto: Yup.string().optional(),
      dissolucao_ou_exticao: Yup.string().optional(),
      fundacoes: Yup.string().optional(),
      reconhecimento_de_firma: Yup.string().optional(),
      preechimento_completo: Yup.string().optional(),
      oab: Yup.string().optional(),
      documentacao_de_identificacao: Yup.string().optional(),
      campo_de_assinatura: Yup.string().optional(),
      retificacao_de_redacao: Yup.string().optional(),
      informacao_divergente: Yup.string().optional(),
      requisitos_criacao_de_estatuto: Yup.string().optional(),
      requisitos_de_estatutos_fundadores: Yup.string().optional(),
      data_da_recepcao: Yup.string().optional(),
      existe_exigencias_nao_listadas: Yup.string().optional(),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const {
      nome_da_instituicao,
      numero_do_protocolo,
      estado_do_requerimento,
      cnpj,
      nome_do_representante,
      email_do_representante,
      telefone_contato,
      declaracao_sindical,
      lista_e_edital,
      assinatura_do_advogado,
      declaracao_criminal,
      declaracao_de_desimpedimento,
      livro_rasao,
      ppe,
      requisitos_estatuto,
      dissolucao_ou_exticao,
      fundacoes,
      reconhecimento_de_firma,
      preechimento_completo,
      oab,
      documentacao_de_identificacao,
      campo_de_assinatura,
      retificacao_de_redacao,
      informacao_divergente,
      data_da_recepcao,
      requisitos_de_estatutos_fundadores,
      requisitos_criacao_de_estatuto,
      existe_exigencias_nao_listadas,
    } = request.body

    const dataRequerimentProtocolNumber = await Requeriment.findOne({
      where: { numero_do_protocolo },
    })

    const dataRequerimentNumberCnpj = await Requeriment.findOne({
      where: { cnpj },
    })

    const dataRequerimentInstitutionName = await Requeriment.findOne({
      where: { nome_da_instituicao },
    })

    const oneOfDateVerification =
      dataRequerimentProtocolNumber ||
      dataRequerimentNumberCnpj ||
      dataRequerimentInstitutionName

    const dateVerificayionAll =
      dataRequerimentProtocolNumber &&
      dataRequerimentNumberCnpj &&
      dataRequerimentInstitutionName

    if (oneOfDateVerification || dateVerificayionAll) {
      return response
        .status(409)
        .json({ error: 'this requirement already exists' })
    }

    const requeriment = await Requeriment.create({
      nome_da_instituicao,
      numero_do_protocolo,
      estado_do_requerimento,
      cnpj,
      nome_do_representante,
      email_do_representante,
      telefone_contato,
      declaracao_sindical,
      lista_e_edital,
      assinatura_do_advogado,
      declaracao_criminal,
      declaracao_de_desimpedimento,
      livro_rasao,
      ppe,
      requisitos_estatuto,
      dissolucao_ou_exticao,
      fundacoes,
      reconhecimento_de_firma,
      preechimento_completo,
      oab,
      documentacao_de_identificacao,
      campo_de_assinatura,
      retificacao_de_redacao,
      informacao_divergente,
      data_da_recepcao,
      requisitos_de_estatutos_fundadores,
      requisitos_criacao_de_estatuto,
      existe_exigencias_nao_listadas,
    })

    return response.status(201).json({
      id: requeriment.id,
      nome_da_instituicao,
      numero_do_protocolo,
      estado_do_requerimento,
      cnpj,
      nome_do_representante,
      email_do_representante,
      telefone_contato,
      declaracao_sindical,
      lista_e_edital,
      assinatura_do_advogado,
      declaracao_criminal,
      declaracao_de_desimpedimento,
      livro_rasao,
      ppe,
      requisitos_estatuto,
      dissolucao_ou_exticao,
      fundacoes,
      reconhecimento_de_firma,
      preechimento_completo,
      oab,
      documentacao_de_identificacao,
      campo_de_assinatura,
      retificacao_de_redacao,
      informacao_divergente,
      data_da_recepcao,
      requisitos_de_estatutos_fundadores,
      requisitos_criacao_de_estatuto,
    })
  }

  async index(request, response) {
    try {
      const requirements = await Requeriment.findAll({
        include: [
          {
            model: RequerimentNotListed,
            as: 'exigencias_nao_listadas',
            attributes: [
              'id',
              'primeira_exigencia',
              'estado_da_primeira_exigencia',
              'segunda_exigencia',
              'estado_da_segunda_exigencia',
              'terceira_exigencia',
              'estado_da_terceira_exigencia',
              'quarta_exigencia',
              'estado_da_quarta_exigencia',
              'quinta_exigencia',
              'estado_da_quinta_exigencia',
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
      numero_do_protocolo: Yup.string().optional(),
      estado_do_requerimento: Yup.string().optional(),
      cnpj: Yup.string().optional(),
      nome_do_representante: Yup.string().optional(),
      email_do_representante: Yup.string().email().optional(),
      telefone_contato: Yup.string().optional(),
      declaracao_sindical: Yup.string().optional(),
      lista_e_edital: Yup.string().optional(),
      assinatura_do_advogado: Yup.string().optional(),
      declaracao_criminal: Yup.string().optional(),
      declaracao_de_desimpedimento: Yup.string().optional(),
      livro_rasao: Yup.string().optional(),
      ppe: Yup.string().optional(),
      requisitos_estatuto: Yup.string().optional(),
      dissolucao_ou_exticao: Yup.string().optional(),
      fundacoes: Yup.string().optional(),
      reconhecimento_de_firma: Yup.string().optional(),
      preechimento_completo: Yup.string().optional(),
      oab: Yup.string().optional(),
      documentacao_de_identificacao: Yup.string().optional(),
      campo_de_assinatura: Yup.string().optional(),
      retificacao_de_redacao: Yup.string().optional(),
      informacao_divergente: Yup.string().optional(),
      requisitos_criacao_de_estatuto: Yup.string().optional(),
      requisitos_de_estatutos_fundadores: Yup.string().optional(),
      data_da_recepcao: Yup.string().optional(),
      data_atualizacao: Yup.string().optional(),
      existe_exigencias_nao_listadas: Yup.string().optional(),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { id } = request.params

    const userExists = await Requeriment.findOne({
      where: { id },
    })

    if (!userExists) {
      return response.status(400).json({ error: 'User not found' })
    }

    const {
      nome_da_instituicao,
      numero_do_protocolo,
      estado_do_requerimento,
      cnpj,
      nome_do_representante,
      email_do_representante,
      telefone_contato,
      declaracao_sindical,
      lista_e_edital,
      assinatura_do_advogado,
      declaracao_criminal,
      declaracao_de_desimpedimento,
      livro_rasao,
      ppe,
      requisitos_estatuto,
      dissolucao_ou_exticao,
      fundacoes,
      reconhecimento_de_firma,
      preechimento_completo,
      oab,
      documentacao_de_identificacao,
      campo_de_assinatura,
      retificacao_de_redacao,
      informacao_divergente,
      data_da_recepcao,
      requisitos_de_estatutos_fundadores,
      requisitos_criacao_de_estatuto,
      data_atualizacao,
      existe_exigencias_nao_listadas,
    } = request.body

    await Requeriment.update(
      {
        nome_da_instituicao,
        numero_do_protocolo,
        estado_do_requerimento,
        cnpj,
        nome_do_representante,
        email_do_representante,
        telefone_contato,
        declaracao_sindical,
        lista_e_edital,
        assinatura_do_advogado,
        declaracao_criminal,
        declaracao_de_desimpedimento,
        livro_rasao,
        ppe,
        requisitos_estatuto,
        dissolucao_ou_exticao,
        fundacoes,
        reconhecimento_de_firma,
        preechimento_completo,
        oab,
        documentacao_de_identificacao,
        campo_de_assinatura,
        retificacao_de_redacao,
        informacao_divergente,
        data_da_recepcao,
        requisitos_de_estatutos_fundadores,
        requisitos_criacao_de_estatuto,
        data_atualizacao,
        existe_exigencias_nao_listadas,
      },
      { where: { id } }
    )

    return response.json({ message: 'status was update sucessfully' })
  }
}

export default new RequerimentController()
