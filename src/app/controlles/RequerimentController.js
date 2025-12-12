import * as Yup from 'yup'
import validator from 'validator'
import Requeriment from '../models/Requeriment'
import Association from '../models/AssociationData'

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
        info: Yup.string().nullable().notRequired(),
        state: Yup.string().nullable().notRequired(),
      }),
      requisitos_criacao_de_estatuto: Yup.string().required(),
      requisitos_de_estatutos_fundadores: Yup.string().required(),
      estado_do_requerimento: Yup.string().required(),
      requerimento_eletronico_rcpj: Yup.string().required(),
      observations_declaracao_sindical: Yup.string().nullable().notRequired(),
      observations_lista_e_edital: Yup.string().nullable().notRequired(),
      observations_assinatura_do_advogado: Yup.string().nullable().notRequired(),
      observations_declaracao_criminal: Yup.string().nullable().notRequired(),
      observations_declaracao_de_desimpedimento: Yup.string().nullable().notRequired(),
      observations_livro_rasao: Yup.string().nullable().notRequired(),
      observations_requisitos_estatuto: Yup.string().nullable().notRequired(),
      observations_ppe: Yup.string().nullable().notRequired(),
      observations_requisitos_criacao_de_estatuto: Yup.string().nullable().notRequired(),
      observations_dissolucao_ou_exticao: Yup.string().nullable().notRequired(),
      observations_fundacoes: Yup.string().nullable().notRequired(),
      observations_reconhecimento_de_firma: Yup.string().nullable().notRequired(),
      observations_oab: Yup.string().nullable().notRequired(),
      observations_documentacao_de_identificacao: Yup.string().nullable().notRequired(),
      observations_requisitos_de_estatutos_fundadores: Yup.string().nullable().notRequired(),
      observations_campo_de_assinatura: Yup.string().nullable().notRequired(),
      observations_retificacao_de_redacao: Yup.string().nullable().notRequired(),
      observations_requerimento_eletronico_rcpj: Yup.string().nullable().notRequired(),
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
      declaracao_sindical: Yup.string().nullable(),
      lista_e_edital: Yup.string().nullable(),
      assinatura_do_advogado: Yup.string().nullable(),
      declaracao_criminal: Yup.string().nullable(),
      declaracao_de_desimpedimento: Yup.string().nullable(),
      livro_rasao: Yup.string().nullable(),
      ppe: Yup.string().nullable(),
      requisitos_estatuto: Yup.string().nullable(),
      dissolucao_ou_exticao: Yup.string().nullable(),
      fundacoes: Yup.string().nullable(),
      reconhecimento_de_firma: Yup.string().nullable(),
      preechimento_completo: Yup.string().nullable(),
      oab: Yup.string().nullable(),
      requerimento_eletronico_rcpj: Yup.string().nullable(),
      documentacao_de_identificacao: Yup.string().nullable(),
      campo_de_assinatura: Yup.string().nullable(),
      retificacao_de_redacao: Yup.string().nullable(),
      informacao_divergente: Yup.object().shape({
        info: Yup.string().nullable(),
        state: Yup.string().nullable(),
      }),
      requisitos_criacao_de_estatuto: Yup.string().nullable(),
      requisitos_de_estatutos_fundadores: Yup.string().nullable(),
      estado_do_requerimento: Yup.string().nullable(),
      observations_lista_e_edital: Yup.string().nullable(),
      observations_assinatura_do_advogado: Yup.string().nullable(),
      observations_declaracao_criminal: Yup.string().nullable(),
      observations_declaracao_de_desimpedimento: Yup.string().nullable(),
      observations_livro_rasao: Yup.string().nullable(),
      observations_requisitos_estatuto: Yup.string().nullable(),
      observations_ppe: Yup.string().nullable(),
      observations_requisitos_criacao_de_estatuto: Yup.string().nullable(),
      observations_dissolucao_ou_exticao: Yup.string().nullable(),
      observations_fundacoes: Yup.string().nullable(),
      observations_reconhecimento_de_firma: Yup.string().nullable(),
      observations_oab: Yup.string().nullable(),
      observations_documentacao_de_identificacao: Yup.string().nullable(),
      observations_requisitos_de_estatutos_fundadores: Yup.string().nullable(),
      observations_campo_de_assinatura: Yup.string().nullable(),
      observations_retificacao_de_redacao: Yup.string().nullable(),
      observations_requerimento_eletronico_rcpj: Yup.string().nullable(),
    })

    try {
      const sanitizedData = sanitizeInput(request.body)
      await schema.validate(sanitizedData, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { id } = request.params

    const requirementExists = await Requeriment.findOne({ where: { id } })

    if (!requirementExists) {
      return response.status(400).json({ error: 'Requirement not found' })
    }

    const data = sanitizeInput(request.body)

    // Atualiza associação se concluído
    if (data.estado_do_requerimento === 'concluído') {
      const associationExists = await Association.findOne({
        where: { exigencias_id: data.exigencias_id },
      })

      if (!associationExists) {
        return response.status(400).json({ error: 'Association update not found' })
      }

      await associationExists.update({
        status_association: "concluído",
      })
    }

    await Requeriment.update(data, { where: { id } })

    const updated = await Requeriment.findOne({ where: { id } })

    return response.status(200).json(updated)
  }

}

export default new RequerimentController()
