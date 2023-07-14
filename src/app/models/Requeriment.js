import Sequelize, { Model } from 'sequelize'

class Requeriment extends Model {
  static init(sequelize) {
    super.init(
      {
        numero_do_protocolo: Sequelize.STRING,
        nome_da_instituicao: Sequelize.STRING,
        estado_do_requerimento: Sequelize.STRING,
        cnpj: Sequelize.STRING,
        nome_do_representante: Sequelize.STRING,
        email_do_representante: Sequelize.STRING,
        telefone_contato: Sequelize.STRING,
        declaracao_sindical: Sequelize.STRING,
        lista_e_edital: Sequelize.STRING,
        assinatura_do_advogado: Sequelize.STRING,
        declaracao_criminal: Sequelize.STRING,
        declaracao_de_desimpedimento: Sequelize.STRING,
        livro_rasao: Sequelize.STRING,
        requisitos_estatuto: Sequelize.STRING,
        ppe: Sequelize.STRING,
        dissolucao_ou_exticao: Sequelize.STRING,
        fundacoes: Sequelize.STRING,
        reconhecimento_de_firma: Sequelize.STRING,
        preechimento_completo: Sequelize.STRING,
        oab: Sequelize.STRING,
        documentacao_de_identificacao: Sequelize.STRING,
        campo_de_assinatura: Sequelize.STRING,
        retificacao_de_redacao: Sequelize.STRING,
        informacao_divergente: Sequelize.STRING,
        quais_informacoes_divergentes: Sequelize.STRING,
        requisitos_criacao_de_estatuto: Sequelize.STRING,
        requisitos_de_estatutos_fundadores: Sequelize.STRING,
        data_da_recepcao: Sequelize.STRING,
        data_atualizacao: Sequelize.STRING,
      },
      {
        sequelize,
      }
    )
    return this
  }

  static associate(models) {
    this.hasOne(models.RequerimentNotListed, {
      foreignKey: 'exigencias_nao_listadas_id',
      as: 'exigencias_nao_listadas',
    })
  }
}

export default Requeriment
