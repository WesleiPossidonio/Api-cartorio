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
  async store(request, response) {
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
      informacao_divergente: Yup.string().required(),
      requisitos_criacao_de_estatuto: Yup.string().required(),
      requisitos_de_estatutos_fundadores: Yup.string().required(),
      estado_do_requerimento: Yup.string().required(),
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
      informacao_divergente,
      requisitos_de_estatutos_fundadores,
      requisitos_criacao_de_estatuto,
      estado_do_requerimento,
    })

    return response.status(201).json({
      id: requeriment.id,
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
    })
  }

  async update(request, response) {
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
      documentacao_de_identificacao: Yup.string().optional(),
      campo_de_assinatura: Yup.string().optional(),
      retificacao_de_redacao: Yup.string().optional(),
      informacao_divergente: Yup.string().optional(),
      requisitos_criacao_de_estatuto: Yup.string().optional(),
      requisitos_de_estatutos_fundadores: Yup.string().optional(),
      estado_do_requerimento: Yup.string().optional(),
    })

    try {
      const sanitizedData = sanitizeInput(request.body)
      await schema.validateSync(sanitizedData, { abortEarly: false })
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
    } = sanitizeInput(request.body)

    await Requeriment.update(
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
        preechimento_completo,
        oab,
        documentacao_de_identificacao,
        campo_de_assinatura,
        retificacao_de_redacao,
        informacao_divergente,
        requisitos_de_estatutos_fundadores,
        requisitos_criacao_de_estatuto,
        estado_do_requerimento,
      },
      { where: { id } }
    )

    return response.status(201).json({
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
    })
  }
}

export default new RequerimentController()
