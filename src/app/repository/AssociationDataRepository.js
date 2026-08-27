import { Op, Sequelize } from 'sequelize'

import AssociationData from '../models/AssociationData.js'
import Requeriment from '../models/Requeriment.js'

const requerimentAttributes = [
  'id',
  'documento_inelegivel',
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
  'requerimento_eletronico_rcpj',
]

const searchCondition = (search) =>
  Sequelize.where(
    Sequelize.literal(`
      to_tsvector(
        'portuguese',
        coalesce("AssociationData"."nome_da_instituicao", '') || ' ' ||
        coalesce("AssociationData"."numero_do_protocolo"::text, '') || ' ' ||
        coalesce("AssociationData"."nome_do_representante", '')
      )
    `),
    '@@',
    Sequelize.fn('plainto_tsquery', 'portuguese', search),
  )

class AssociationDataRepository {
  async create(data) {
    const associationData = await AssociationData.create(data)
    return associationData
  }

  async update(id, data) {
    const [updatedRowsCount] = await AssociationData.update(data, {
      where: { id },
    })

    return updatedRowsCount
  }

  async findById(id) {
    return await AssociationData.findByPk(id, {
      include: [
        {
          model: Requeriment,
          as: 'exigencia',
          attributes: requerimentAttributes,
        },
      ],
    })
  }

  async findLastProtocolNumberByYear(year) {
    const startProtocol = year === 2026 ? 2026236 : year * 1000 + 1

    const endProtocol = (year + 1) * 1000

    const associationData = await AssociationData.findOne({
      attributes: ['numero_do_protocolo'],

      where: {
        numero_do_protocolo: {
          [Sequelize.Op.gte]: startProtocol,
          [Sequelize.Op.lt]: endProtocol,
        },
      },

      order: [['numero_do_protocolo', 'DESC']],
    })

    return associationData?.numero_do_protocolo ?? null
  }

  async findPendingWithoutRequirement(filters) {
    const { page = 1, limit = 10 } = filters

    const offset = (page - 1) * limit

    const { rows, count } = await AssociationData.findAndCountAll({
      where: {
        status_association: 'Pendente',

        [Op.and]: [
          Sequelize.literal(`
              NOT EXISTS (
                SELECT 1
                FROM requirement AS r
                WHERE r.exigencias_id =
                  "AssociationData".id
              )
            `),
        ],
      },

      order: [['createdAt', 'DESC']],

      limit,
      offset,

      distinct: true,
    })

    return {
      associationDataList: rows,

      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit),
      },
    }
  }

  async findPendingWithoutRequirementSearch(filters) {
    const { search, page = 1, limit = 10 } = filters

    const offset = (page - 1) * limit

    const { rows, count } = await AssociationData.findAndCountAll({
      where: {
        status_association: 'Pendente',

        [Op.and]: [
          searchCondition(search),

          Sequelize.literal(`
              NOT EXISTS (
                SELECT 1
                FROM requirement AS r
                WHERE r.exigencias_id =
                  "AssociationData".id
              )
            `),
        ],
      },

      order: [['createdAt', 'DESC']],
      limit,
      offset,
      distinct: true,
    })

    return {
      associationDataList: rows,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit),
      },
    }
  }

  async findPendingRequirements(filters) {
    const { page = 1, limit = 10 } = filters

    const offset = (page - 1) * limit

    const { rows, count } = await AssociationData.findAndCountAll({
      where: {
        status_association: 'Concluído',
      },

      include: [
        {
          model: Requeriment,
          as: 'exigencia',
          required: true,
          where: {
            estado_do_requerimento: 'Pendente',
          },
          attributes: requerimentAttributes,
        },
      ],

      order: [['createdAt', 'DESC']],

      limit,
      offset,

      distinct: true,
    })

    return {
      associationDataList: rows,

      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit),
      },
    }
  }

  async findPendingRequirementsSearch(filters) {
    const { search, page = 1, limit = 10 } = filters
    const offset = (page - 1) * limit
    const { rows, count } = await AssociationData.findAndCountAll({
      where: {
        status_association: 'Concluído',

        [Op.and]: [searchCondition(search)],
      },

      include: [
        {
          model: Requeriment,
          as: 'exigencia',
          required: true,
          where: {
            estado_do_requerimento: 'Pendente',
          },
          attributes: requerimentAttributes,
        },
      ],

      order: [['createdAt', 'DESC']],
      limit,
      offset,
      distinct: true,
    })

    return {
      associationDataList: rows,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit),
      },
    }
  }

  async findCompletedAssociations(filters) {
    const { page = 1, limit = 10 } = filters

    const offset = (page - 1) * limit

    const { rows, count } = await AssociationData.findAndCountAll({
      where: {
        [Op.or]: [
          {
            possui_exigencias: false,
          },
          {
            possui_exigencias: true,
            '$exigencia.estado_do_requerimento$': 'Concluído',
          },
        ],
      },

      include: [
        {
          model: Requeriment,
          as: 'exigencia',
          required: false,
          attributes: requerimentAttributes,
        },
      ],

      order: [['createdAt', 'DESC']],

      limit,
      offset,

      distinct: true,
    })

    return {
      associationDataList: rows,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit),
      },
    }
  }

  async findCompletedAssociationsSearch(filters) {
    const { search, page = 1, limit = 10 } = filters
    const offset = (page - 1) * limit
    const { rows, count } = await AssociationData.findAndCountAll({
      where: {
        status_association: 'Concluído',

        [Op.and]: [searchCondition(search)],
      },

      include: [
        {
          model: Requeriment,
          as: 'exigencia',
          required: true,
          where: {
            estado_do_requerimento: 'Concluído',
          },
          attributes: requerimentAttributes,
        },
      ],

      order: [['createdAt', 'DESC']],
      limit,
      offset,
      distinct: true,
    })

    return {
      associationDataList: rows,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit),
      },
    }
  }

  async findAllAssociationData() {
    const associationDataList = await AssociationData.findAll({
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Requeriment,
          as: 'exigencia',
          attributes: requerimentAttributes,
        },
      ],
    })

    return associationDataList
  }

  async findAllAssociationSearch(filters) {
    const { search, page = 1, limit = 10 } = filters
    const offset = (page - 1) * limit

    const { rows: associations, count: total } =
      await AssociationData.findAndCountAll({
        where: searchCondition(search),

        include: [
          {
            model: Requeriment,

            as: 'exigencia',

            attributes: requerimentAttributes,
          },
        ],

        order: [['createdAt', 'DESC']],

        limit,
        offset,

        distinct: true,
      })

    return {
      associations,

      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    }
  }

  async delete(id) {
    const deletedRowsCount = await AssociationData.destroy({
      where: { id },
    })

    return deletedRowsCount
  }
}

export default new AssociationDataRepository()
