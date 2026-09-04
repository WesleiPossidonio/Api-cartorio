import mjml2html from 'mjml'
import nodemailer from 'nodemailer'
import * as Yup from 'yup'

const transporter = nodemailer.createTransport({
  service: 'gmail',

  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL,
    pass: process.env.PASSWORD_EMAIL,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    accessToken: process.env.ACCESS_TOKEN,
  },
})

export const sendMailRequeriments = async (request, response) => {
  const schema = Yup.object().shape({
    nome_da_instituicao: Yup.string().required(),
    numero_do_protocolo: Yup.string().required(),
    cnpj_cpf: Yup.string().required(),
    nome_do_representante: Yup.string().required(),
    email_do_representante: Yup.string().email(),
    itens_da_lista_pendetes: Yup.object().required(),
    data_da_recepcao: Yup.string().required(),
    telefone_contato: Yup.string().required(),
    name: Yup.string().required(),
    registration: Yup.string().required(),
    sobre_exigencia: Yup.string().required(),
  })

  try {
    await schema.validateSync(request.body, {
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
    itens_da_lista_pendetes,
    data_da_recepcao,
    telefone_contato,
    name,
    registration,
    sobre_exigencia,
  } = request.body

  console.log('Exigências recebidas:', itens_da_lista_pendetes)

  const renderObservation = (observation) => {
    if (!observation || observation === 'Sem observações') {
      return ''
    }

    return `
      <br/>
      <strong>Obs:</strong> ${observation}
    `
  }

  const requirementDescriptions = {
    lista_e_edital: 'Apresentar lista de presença e edital; (CNCGJ Art. 951)',

    declaracao_sindical:
      'Apresentar declaração emitida pelo Ministério do Trabalho referente a unicidade sindical e da base territorial (CNCGJ Art. 935 § 4º)',

    assinatura_do_advogado:
      'Colher assinatura do advogado no ato apresentado para registro; (Lei 8.906 Art. 1º §2º / CNCGJ Artigo 944 § 3º)',

    declaracao_criminal:
      'Apresentar declaração de desimpedimento e/ou certidão criminal; (CNCGJ Art. 932 § 1º)',

    requisitos_estatuto:
      'Apresentar cópia do estatuto registrado no Distrito Federal (para diretórios de partidos políticos); (CNCGJ Art. 945)',

    declaracao_de_desimpedimento:
      'Apresentar declaração de desimpedimento; (contratos e averbações de sociedade simples, ME, EPP); (CNCGJ Art. 938)',

    livro_rasao:
      'Apresentar livro razão ou contábil anteriormente registrado; (CNCGJ Art. 960 § 1º)',

    ppe: 'Apresentar declaração de pessoa politicamente exposta (PPE); (Provimento CNJ 88/2019)',

    dissolucao_ou_exticao:
      'No caso de dissolução ou extinção apresentar o documento; (liquidação, divisão de cotas de sócios, inexistência de ativo e passivo, guarda dos livros etc.); (CNCGJ Art. 953)',

    fundacoes:
      'Nos atos referentes a fundações, exigir-se-á aprovação prévia do Ministério Público; (CNCGJ Art. 941)',

    reconhecimento_de_firma:
      'Apresentar reconhecimento de firma no requerimento do DBE',

    oab: 'Apresentar cópia da OAB do representante jurídico do ato apresentado',

    documentacao_de_identificacao:
      'Apresentar cópia simples do documento de identificação',

    campo_de_assinatura: 'Preencher todos os campos de assinatura',

    retificacao_de_redacao: 'Retificar redação do documento apresentado',

    informacao_divergente: 'Informações adicionais',

    requisitos_de_estatutos_fundadores:
      'Apresentar os requisitos obrigatórios no Estatuto: relação de documentos de fundadores; (CNCGJ Art. 945 / Lei 6.015 Art. 120 / Lei 10.406 Art. 46)',

    requisitos_criacao_de_estatuto:
      'Apresentar os requisitos obrigatórios para criação do estatuto; (Lei 10.406/2002 Art. 54)',

    requerimento_eletronico_rcpj: 'Apresentar o requerimento eletrônico RCPJ',
  }

  const listedRequirementsHtml = Object.entries(requirementDescriptions)
    .filter(([key]) => {
      return itens_da_lista_pendetes[key] === 'Pendente'
    })
    .map(([key, description]) => {
      const observationKey = `observations_${key}`

      const observation = itens_da_lista_pendetes[observationKey]

      return `
        <p style="margin-bottom: 10px;">
          ${description}
          ${renderObservation(observation)}
        </p>
      `
    })
    .join('')

  let additionalInformationHtml = ''

  const additionalInformation = itens_da_lista_pendetes.informacao_divergente

  if (
    additionalInformation &&
    typeof additionalInformation === 'object' &&
    additionalInformation.info
  ) {
    additionalInformationHtml = `
      <p style="margin-bottom: 10px;">
        <strong>Informações adicionais:</strong>
        <br/>
        ${additionalInformation.info}
      </p>
    `
  }

  const unlistedRequirementsHtml = Array.isArray(
    itens_da_lista_pendetes.unlisted_requirements,
  )
    ? itens_da_lista_pendetes.unlisted_requirements
        .filter((requirement) => requirement.status === 'Pendente')
        .map(
          (requirement) => `
            <p style="margin-bottom: 10px;">
              <strong>${requirement.name}</strong>
              ${renderObservation(requirement.observacao)}
            </p>
          `,
        )
        .join('')
    : ''

  const hasPendingRequirements =
    Object.keys(requirementDescriptions).some(
      (key) => itens_da_lista_pendetes[key] === 'Pendente',
    ) ||
    (Array.isArray(itens_da_lista_pendetes.unlisted_requirements) &&
      itens_da_lista_pendetes.unlisted_requirements.some(
        (requirement) => requirement.status === 'Pendente',
      ))

  const mjmlCode = `
    <mjml version="3.3.3">

      <mj-head>
        <mj-style>
          .full-width-image img {
            width: 100% !important;
            height: auto !important;
          }
        </mj-style>
      </mj-head>

      <mj-body
        background-color="#F4F4F4"
        color="#55575d"
        font-family="Arial, sans-serif"
      >

        <!-- Cabeçalho -->

        <mj-section
          background-color="#f2f2f2"
          padding="0"
          text-align="center"
        >
          <mj-column padding="0">

            <mj-image
              src="https://i.imgur.com/BReyDw0l.jpg"
              fluid-on-mobile="true"
              padding="0"
              css-class="full-width-image"
            />

          </mj-column>
        </mj-section>

        <!-- Informações do protocolo -->

        <mj-section
          background-color="#ffffff"
          padding="20px 0"
          text-align="center"
        >

          <mj-column>

            <mj-text>

              <p>
                <strong>Nº do Exame:</strong>
                ${numero_do_protocolo}
              </p>

              <p>
                <strong>Data da Recepção:</strong>
                ${data_da_recepcao}
              </p>

            </mj-text>

            <!-- Saudação -->

            <mj-text line-height="1.6">

              <p>
                <strong>
                  Prezado ${nome_do_representante},
                </strong>
                <br />

                Espero que esteja bem. Entramos em contato
                para fornecer orientações importantes sobre
                os documentos necessários para a análise do
                seu processo de ${sobre_exigencia}.
              </p>

            </mj-text>

            <!-- Informações da Instituição -->

            <mj-text>

              <h3>Sobre a Instituição</h3>

              <p>
                <strong>Nome da Instituição:</strong>
                ${nome_da_instituicao}
              </p>

              <p>
                <strong>CNPJ ou CPF:</strong>
                ${cnpj_cpf}
              </p>

              <p>
                <strong>Nome do Representante:</strong>
                ${nome_do_representante}
              </p>

              <p>
                <strong>Email do Representante:</strong>
                ${email_do_representante}
              </p>

              <p>
                <strong>Telefone do Representante:</strong>
                ${telefone_contato}
              </p>

            </mj-text>

            <!-- Lista de pendências -->

            <mj-text
              line-height="1.8"
              color="#000"
            >

              <h3>
                ${
                  hasPendingRequirements
                    ? 'Listas Pendentes'
                    : 'Lista de Exigências Concluída com Sucesso!!!'
                }
              </h3>

              <!-- Exigências listadas -->

              ${listedRequirementsHtml}

              <!-- Informações adicionais -->

              ${additionalInformationHtml}

              <!-- Exigências não listadas -->

              ${
                unlistedRequirementsHtml
                  ? `
                    ${unlistedRequirementsHtml}
                  `
                  : ''
              }

            </mj-text>

            <!-- Funcionário responsável -->

            <mj-text>

              <h3>
                Funcionário Responsável pela Análise:
              </h3>

              <p>
                <strong>Nome:</strong>
                ${name}
              </p>

              <p>
                <strong>Matrícula:</strong>
                ${registration}
              </p>

            </mj-text>

            <!-- Prazos -->

            <mj-text
              color="#000"
              line-height="1.8"
            >

              <h3>Prazos Importantes:</h3>

              <p>
                <strong>
                  - Prazo para análise: 15 dias
                </strong>
              </p>

              <p>
                <strong>
                  - Cumprimento da exigência: 30 dias
                </strong>
              </p>

              <p>
                <strong>
                  - Prazo para registro: 30 dias após
                  a satisfação das exigências
                </strong>
              </p>

            </mj-text>

            <!-- WhatsApp -->

            <mj-text
              color="#000"
              line-height="1.8"
            >

              <strong>
                Se surgirem dúvidas ou se precisar de
                mais informações, por favor, não hesite
                em nos contatar via WhatsApp.
              </strong>

            </mj-text>

            <mj-button
              background-color="#25D366"
              href="https://wa.me/5522999796222"
              padding="20px"
            >
              Enviar Mensagem
            </mj-button>

          </mj-column>

        </mj-section>

        <!-- Informações de contato -->

        <mj-section
          background-color="#d1d1d1"
          padding="20px 0"
          text-align="center"
        >

          <mj-column>

            <mj-text
              color="#000"
              font-size="13px"
              line-height="22px"
            >

              <p>
                <strong>
                  Rua Pereira de Souza, nº 104 -
                  Centro, Macaé, RJ CEP: 27.913-110
                </strong>
              </p>

              <p>
                <strong>
                  Tel: (22) 2106-1902
                  WhatsApp: (22) 99979.6222
                </strong>
              </p>

              <p>
                <strong>
                  E-mail: rtd-pj@macae1oficio.com.br
                </strong>
              </p>

            </mj-text>

          </mj-column>

        </mj-section>

        <!-- Rodapé -->

        <mj-section
          padding="20px 0"
          text-align="center"
        >

          <mj-column>

            <mj-text
              line-height="1.8"
              color="#55575d"
              font-size="11px"
              padding="0px 20px"
            />

          </mj-column>

        </mj-section>

      </mj-body>

    </mjml>
  `

  let html

  try {
    const { html: convertedHtml } = mjml2html(mjmlCode)

    html = convertedHtml
  } catch (error) {
    console.error('Erro ao converter o MJML em HTML:', error)

    return response.status(500).json({
      error: 'Erro interno do servidor',
    })
  }

  const mailOptions = {
    from: process.env.EMAIL,
    to: email_do_representante,
    subject: `Exigência 1º Ofício ${numero_do_protocolo}-${nome_do_representante}`,
    html,
  }

  try {
    await transporter.sendMail(mailOptions)

    return response.status(201).json('Email enviado com sucesso!')
  } catch (error) {
    console.error('Erro ao enviar o email:', error)

    return response.status(500).json({
      error: 'Erro ao enviar o email',
    })
  }
}
