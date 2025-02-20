import * as Yup from 'yup'
import validator from 'validator'
import Requeriment from '../models/Requeriment'

// Função de sanitização reutilizável
const sanitizeInput = (data) => {
  const sanitizedData = {}
  Object.keys(data).forEach((key) => {
    sanitizedData[key] =
      typeof data[key] === 'string' ? validator.escape(data[key]) : data[key]
  })
  return sanitizedData
}

class RequerimentController {
  async store (request, response) {
    const schema = Yup.object().shape({
      exigencias_id: Yup.number().required(),
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
      informacao_divergente: Yup.object().shape({
        info: Yup.string().required(),
        state: Yup.string().required(),
      }),
      requisitos_criacao_de_estatuto: Yup.string().required(),
      requisitos_de_estatutos_fundadores: Yup.string().required(),
      estado_do_requerimento: Yup.string().required(),
      requerimento_eletronico_rcpj: Yup.string().required(),
      observations_declaracao_sindical: Yup.string().optional(),
      observations_lista_e_edital: Yup.string().optional(),
      observations_assinatura_do_advogado: Yup.string().optional(),
      observations_declaracao_criminal: Yup.string().optional(),
      observations_declaracao_de_desimpedimento: Yup.string().optional(),
      observations_livro_rasao: Yup.string().optional(),
      observations_requisitos_estatuto: Yup.string().optional(),
      observations_ppe: Yup.string().optional(),
      observations_requisitos_criacao_de_estatuto: Yup.string().optional(),
      observations_dissolucao_ou_exticao: Yup.string().optional(),
      observations_fundacoes: Yup.string().optional(),
      observations_reconhecimento_de_firma: Yup.string().optional(),
      observations_oab: Yup.string().optional(),
      observations_documentacao_de_identificacao: Yup.string().optional(),
      observations_requisitos_de_estatutos_fundadores: Yup.string().optional(),
      observations_campo_de_assinatura: Yup.string().optional(),
      observations_retificacao_de_redacao: Yup.string().optional(),
      observations_requerimento_eletronico_rcpj: Yup.string().optional(),
    })

    try {
      const sanitizedData = sanitizeInput(request.body)
      await schema.validateSync(sanitizedData, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const {
      exigencias_id,
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
      requisitos_de_estatutos_fundadores,
      requisitos_criacao_de_estatuto,
      estado_do_requerimento,
      requerimento_eletronico_rcpj,
      observations_lista_e_edital,
      observations_assinatura_do_advogado,
      observations_declaracao_criminal,
      observations_declaracao_de_desimpedimento,
      observations_livro_rasao,
      observations_requisitos_estatuto,
      observations_ppe,
      observations_requisitos_criacao_de_estatuto,
      observations_dissolucao_ou_exticao,
      observations_fundacoes,
      observations_reconhecimento_de_firma,
      observations_oab,
      observations_documentacao_de_identificacao,
      observations_requisitos_de_estatutos_fundadores,
      observations_campo_de_assinatura,
      observations_retificacao_de_redacao,
      observations_requerimento_eletronico_rcpj,
    } = sanitizeInput(request.body)

    const requeriment = await Requeriment.create({
      exigencias_id,
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
      requerimento_eletronico_rcpj,
      informacao_divergente,
      requisitos_de_estatutos_fundadores,
      requisitos_criacao_de_estatuto,
      estado_do_requerimento,
      observations_lista_e_edital,
      observations_assinatura_do_advogado,
      observations_declaracao_criminal,
      observations_declaracao_de_desimpedimento,
      observations_livro_rasao,
      observations_requisitos_estatuto,
      observations_ppe,
      observations_requisitos_criacao_de_estatuto,
      observations_dissolucao_ou_exticao,
      observations_fundacoes,
      observations_reconhecimento_de_firma,
      observations_oab,
      observations_documentacao_de_identificacao,
      observations_requisitos_de_estatutos_fundadores,
      observations_campo_de_assinatura,
      observations_retificacao_de_redacao,
      observations_requerimento_eletronico_rcpj
    })

    return response.status(201).json(requeriment)
  }

  async update (request, response) {
    const schema = Yup.object().shape({
      exigencias_id: Yup.number().required(),
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
      requerimento_eletronico_rcpj: Yup.string().optional(),
      documentacao_de_identificacao: Yup.string().optional(),
      campo_de_assinatura: Yup.string().optional(),
      retificacao_de_redacao: Yup.string().optional(),
      informacao_divergente: Yup.object().shape({
        info: Yup.string().required(),
        state: Yup.string().required(),
      }),
      requisitos_criacao_de_estatuto: Yup.string().optional(),
      requisitos_de_estatutos_fundadores: Yup.string().optional(),
      estado_do_requerimento: Yup.string().optional(),
      observations_lista_e_edital: Yup.string().optional(),
      observations_assinatura_do_advogado: Yup.string().optional(),
      observations_declaracao_criminal: Yup.string().optional(),
      observations_declaracao_de_desimpedimento: Yup.string().optional(),
      observations_livro_rasao: Yup.string().optional(),
      observations_requisitos_estatuto: Yup.string().optional(),
      observations_ppe: Yup.string().optional(),
      observations_requisitos_criacao_de_estatuto: Yup.string().optional(),
      observations_dissolucao_ou_exticao: Yup.string().optional(),
      observations_fundacoes: Yup.string().optional(),
      observations_reconhecimento_de_firma: Yup.string().optional(),
      observations_oab: Yup.string().optional(),
      observations_documentacao_de_identificacao: Yup.string().optional(),
      observations_requisitos_de_estatutos_fundadores: Yup.string().optional(),
      observations_campo_de_assinatura: Yup.string().optional(),
      observations_retificacao_de_redacao: Yup.string().optional(),
      observations_requerimento_eletronico_rcpj: Yup.string().optional(),
    })

    try {
      const sanitizedData = sanitizeInput(request.body)
      await schema.validateSync(sanitizedData, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { id } = request.params

    const userExists = await Requeriment.findByPk({
      where: { id },
    })

    if (!userExists) {
      return response.status(400).json({ error: 'User not found' })
    }

    const {
      exigencias_id,
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
      requisitos_de_estatutos_fundadores,
      requisitos_criacao_de_estatuto,
      estado_do_requerimento,
      requerimento_eletronico_rcpj,
      observations_lista_e_edital,
      observations_assinatura_do_advogado,
      observations_declaracao_criminal,
      observations_declaracao_de_desimpedimento,
      observations_livro_rasao,
      observations_requisitos_estatuto,
      observations_ppe,
      observations_requisitos_criacao_de_estatuto,
      observations_dissolucao_ou_exticao,
      observations_fundacoes,
      observations_reconhecimento_de_firma,
      observations_oab,
      observations_documentacao_de_identificacao,
      observations_requisitos_de_estatutos_fundadores,
      observations_campo_de_assinatura,
      observations_retificacao_de_redacao,
      observations_requerimento_eletronico_rcpj
    } = sanitizeInput(request.body)

    const updateRequeriment = await Requeriment.update(
      {
        exigencias_id,
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
        requerimento_eletronico_rcpj,
        preechimento_completo,
        oab,
        documentacao_de_identificacao,
        campo_de_assinatura,
        retificacao_de_redacao,
        informacao_divergente,
        requisitos_de_estatutos_fundadores,
        requisitos_criacao_de_estatuto,
        estado_do_requerimento,
        observations_lista_e_edital,
        observations_assinatura_do_advogado,
        observations_declaracao_criminal,
        observations_declaracao_de_desimpedimento,
        observations_livro_rasao,
        observations_requisitos_estatuto,
        observations_ppe,
        observations_requisitos_criacao_de_estatuto,
        observations_dissolucao_ou_exticao,
        observations_fundacoes,
        observations_reconhecimento_de_firma,
        observations_oab,
        observations_documentacao_de_identificacao,
        observations_requisitos_de_estatutos_fundadores,
        observations_campo_de_assinatura,
        observations_retificacao_de_redacao,
        observations_requerimento_eletronico_rcpj
      },
      { where: { id } },
    )

    return response.status(201).json(updateRequeriment)
  }
}

export default new RequerimentController()
