import * as Yup from 'yup'

import Requeriment from '../models/Requeriment'

class RequerimentController {
  async store(request, response) {
    const schema = Yup.object().shape({
      nome_da_instituicao: Yup.string().required(),
      numero_do_protocolo: Yup.string().required(),
      cnpj: Yup.string().required(),
      nome_do_representante: Yup.string().required(),
      email_do_representante: Yup.string().email().required(),
      telefone_contato: Yup.string().required(),
      declaracao_sindical: Yup.string().required(),
      lista_e_edital: Yup.string().required(),
      assinatura_do_advogado: Yup.string().required(),
      declaracao_criminal: Yup.string().required(),
      declaracao_de_desimpedimento: Yup.string().required(),
      livro_rasao: Yup.string().required(),
      ppe: Yup.string().required(),
      requisitos_estatuto: Yup.string().required(),
      dissolucao_ou_exticao: Yup.string().required(),
      fundacoes: Yup.string().required(),
      reconhecimento_de_firma: Yup.string().required(),
      preechimento_completo: Yup.string().required(),
      oab: Yup.string().required(),
      documentacao_de_identificacao: Yup.string().required(),
      campo_de_assinatura: Yup.string().required(),
      retificacao_de_redacao: Yup.string().required(),
      informacao_divergente: Yup.string().required(),
      quais_informacoes_divergentes: Yup.string(),
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
      quais_informacoes_divergentes,
    } = request.body

    const dataRequerimentProtocolNumber = await Requeriment.findOne({
      where: { numero_do_protocolo },
    })

    const dataRequerimentNumberCnpj = await Requeriment.findOne({
      where: { cnpj },
    })

    const dataRequerimentInstitutionName = await Requeriment.findOne({
      where: { numero_do_protocolo },
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
      quais_informacoes_divergentes,
    })

    return response.status(201).json({
      id: requeriment.id,
      nome_da_instituicao,
      numero_do_protocolo,
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
      quais_informacoes_divergentes,
    })
  }

  async index(request, response) {
    try {
      const requirements = await Requeriment.findAll()
      response.status(200).json(requirements)
    } catch (error) {
      console.log(error)
      response.status(500).send('Internal server error')
    }
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      nome_da_instituicao: Yup.string(),
      numero_do_protocolo: Yup.string(),
      cnpj: Yup.string(),
      nome_do_representante: Yup.string(),
      email_do_representante: Yup.string().email(),
      telefone_contato: Yup.string(),
      declaracao_sindical: Yup.string(),
      lista_e_edital: Yup.string(),
      assinatura_do_advogado: Yup.string(),
      declaracao_criminal: Yup.string(),
      declaracao_de_desimpedimento: Yup.string(),
      livro_rasao: Yup.string(),
      ppe: Yup.string(),
      requisitos_estatuto: Yup.string(),
      dissolucao_ou_exticao: Yup.string(),
      fundacoes: Yup.string(),
      reconhecimento_de_firma: Yup.string(),
      preechimento_completo: Yup.string(),
      oab: Yup.string(),
      documentacao_de_identificacao: Yup.string(),
      campo_de_assinatura: Yup.string(),
      retificacao_de_redacao: Yup.string(),
      informacao_divergente: Yup.string(),
      quais_informacoes_divergentes: Yup.string(),
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
      quais_informacoes_divergentes,
    } = request.body

    await Requeriment.update(
      {
        nome_da_instituicao,
        numero_do_protocolo,
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
        quais_informacoes_divergentes,
      },
      { where: { id } }
    )

    return response.json({ message: 'status was update sucessfully' })
  }
}

export default new RequerimentController()
