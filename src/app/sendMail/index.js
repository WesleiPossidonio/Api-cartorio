import mjml2html from 'mjml'
import nodemailer from 'nodemailer'
import * as Yup from 'yup'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'QAuth2',
    user: process.env.EMAIL,
    pass: process.env.PASSWORD_EMAIL,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
})

export const sendMail = async (request, response) => {
  const schema = Yup.object().shape({
    nome_da_instituicao: Yup.string().required(),
    numero_do_protocolo: Yup.string().required(),
    cnpj: Yup.string().required(),
    nome_do_representante: Yup.string().required(),
    email_do_representante: Yup.string().email(),
    itens_da_lista_pendetes: Yup.object().required(),
    Data_da_Recepcao: Yup.string().required(),
    telefone_contato: Yup.string().required(),
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
    itens_da_lista_pendetes,
    Data_da_Recepcao,
    telefone_contato,
  } = request.body

  const mjmlCode = `
  <mjml version="3.3.3">
  <mj-body background-color="#F4F4F4" color="#55575d" font-family="Arial, sans-serif">
    <mj-section background-color="#006EAF" background-repeat="repeat" padding="20px 0" text-align="center" vertical-align="top">
      <mj-column>
        <mj-image align="center" padding="10px 25px" src="https://imgbly.com/ib/OBPEpkQbUD.png" width="128px"></mj-image>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" background-repeat="repeat" padding="20px 0" text-align="center" vertical-align="top">
        <mj-column>
            <mj-text>
            <h3 color="#000"><strong>Data da Análise:</strong> 07/12/2022</h3>
            </mj-text>

            <mj-text color="#000">
                <h2 class="Title-list">Dados Da Empresa</h2>
                <h3>Nº do Exame: ${numero_do_protocolo}</h3>
                <4>Data da Recepção: ${Data_da_Recepcao}</4>
                <p color="#000"><strong>Nome da Instituição:</strong> ${nome_da_instituicao}</p>
                <p color="#000"><strong>Cnpj:</strong> ${cnpj}</p>
                <p color="#000"><strong>Nome do Representante:</strong> ${nome_do_representante}</p>
                <p color="#000"><strong>E-mail: </strong> ${email_do_representante}</p>
                <p color="#000"><strong>Contato do Solicitante: </strong> ${telefone_contato}</p>
                <p color="#000"><strong>Telefone de contato: </strong> {</p>
            </mj-text>
        </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" background-repeat="repeat" background-size="auto" padding="0px 0px 20px 0px" text-align="center" vertical-align="top">
      <mj-column>
            <mj-text>
                <h2 margin-botton="1rem" class="Title-list">Lista de Exigência</h2>
                <h3>Lista de Exigências Pendentes:</h3>
                
               ${
                 itens_da_lista_pendetes.lista_e_edital &&
                 `<p margin-bottom="10px">Apresentar lista de presença e edital; (CNCGJ Art. 951)</p>`
               }
               ${
                 itens_da_lista_pendetes.declaracao_sindical &&
                 `<p margin-bottom="10px">Apresentar declaração emitida pelo Ministério do Trabalho
                 referente a unicidade sindical e da base territorial; (CNCGJ Art. 935 § 4º)</p>`
               }
               ${
                 itens_da_lista_pendetes.assinatura_do_advogado &&
                 `<p margin-bottom="10px">Colheu assinatura do advogado no ato apresentado para registro; (Lei 8.906 Art. 1º §2º / CNCGJ Artigo 944 § 3º)</p>`
               }
               ${
                 itens_da_lista_pendetes.declaracao_criminal &&
                 `<p margin-bottom="10px">Apresentar declaração de desimpedimento e/ou certidão
                 criminal; (CNCGJ Art. 932 § 1º)  </p>`
               }
               ${
                 itens_da_lista_pendetes.requisitos_estatuto &&
                 `<p margin-bottom="10px"> Apresentar cópia do estatuto registrado no Distrito Federal (Obs:para diretórios de partidos políticos); (CNCGJ Art.
                  945)</p>`
               }
               ${
                 itens_da_lista_pendetes.declaracao_de_desimpedimento &&
                 `<p margin-bottom="10px"> Apresentar declaração de  (contratos e averbações de sociedade simples, ME, EPP);
                 (CNCGJ Art. 938)</p>`
               }
               ${
                 itens_da_lista_pendetes.dissolucao_ou_exticao &&
                 `<p margin-bottom="10px">No caso de dissolução ou extinção deverá conter no documento: (liquidação, divisão de cotas de sócios, inexistência de ativo e passivo, guarda dos livros etc.) (CNCGJ Art. 953)</p>`
               }
               ${
                 itens_da_lista_pendetes.requisitos_criacao_de_estatuto &&
                 `<p margin-bottom="10px">Apresentar os requisitos obrigatórios no Estatuto: relação de
                 documentos de fundadores; ( CNCGJ Art. 945 / Lei 6.015 no Art. 120 / Lei 10.406 Art.
                 46)</p>`
               }
               ${
                 itens_da_lista_pendetes.requisitos_de_estatutos_fundadores &&
                 `<p margin-bottom="10px"> Apresentar os requisitos obrigatórios no Estatuto: relação de
                 documentos de fundadores;</p>`
               }
               ${
                 itens_da_lista_pendetes.ppe &&
                 `<p margin-bottom="10px">Apresentar declaração de pessoa politicamente exposta (PPE)</p>`
               }
              ${
                itens_da_lista_pendetes.dissolucao_ou_exticao &&
                `<p margin-bottom="10px">No caso de dissolução ou extinção apresentar o documento:</p>`
              }
              ${
                itens_da_lista_pendetes.fundacoes &&
                `<p margin-bottom="10px">Nos atos referentes a fundações, exigir-se-á aprovação prévia
                do Ministério Público; (CNCGJ Art. 941)</p>`
              }
              ${
                itens_da_lista_pendetes.reconhecimento_de_firma &&
                `<p margin-bottom="10px">Apresentar reconhecimento de firme no requerimento do DBE</p>`
              }
              ${
                itens_da_lista_pendetes.preechimento_completo &&
                `<p margin-bottom="10px">Preencher todos os campos do
                formulário/requerimento</p>`
              }
              ${
                itens_da_lista_pendetes.oab &&
                `<p margin-bottom="10px">Apresentar cópia da OAB do representante jurídico do ato
                apresentado</p>`
              }
              ${
                itens_da_lista_pendetes.documentacao_de_identificacao &&
                `<p margin-bottom="10px">Apresentar cópia simples do documento de identificação</p>`
              }
            </mj-text>

            <mj-text>
                 <h4><strong>Funcionário responsável pela análise:</strong> CARLA DE ALMEIDA Matricula: 00/000</h4>
            </mj-text>
        </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" background-repeat="repeat" background-size="auto" padding="0px 0px 20px 0px" text-align="center" vertical-align="top">
        <mj-column>
            <mj-text color="#000">
                <h2 class="Title-list">Informações importantes: </h2>
                <p color="#000"><strong>- Prazo para análise 15 dias</strong></p>
                <p color="#000"><strong>- Cumprimento da exigencia 30 dias.</strong></p>
                <p color="#000"><strong>- Prazo para registro 30 dias satifesta as exigencias necessárias</p>
            </mj-text>

            <mj-text color="#000">
                <h3 color="#000">Duvidas? Entre em contato conosco no Whatsapp!</h3>
            </mj-text>
            <mj-button background-color="#25D366" href="https://wa.me/5522999796222" paddimg="20px"> Enviar Menssagem </mj-button>

        </mj-column>
    </mj-section>

    <mj-section background-color="#006EAF" background-repeat="repeat" padding="20px 0" text-align="center" vertical-align="top">
        <mj-column>
            <mj-text align="center" color="#ffffff" font-family="Arial, sans-serif" font-size="13px" line-height="22px">
                <p color="#FFF"><strong>Rua Pereira de Souza, nº 104 - Centro, Macaé, RJ CEP:27.913-110</strong></p>
                <p color="#FFF"><strong>Tel: (22) 2106-1902  WhatsApp: (22) 99979.6222</strong></p>
                <p color="#FFF"><strong>E-mail: rtd-pj@macae1oficio.com.br</p>
            </mj-text>
        </mj-column>
    </mj-section>

    <mj-section background-repeat="repeat" background-size="auto" padding="20px 0px 20px 0px" text-align="center" vertical-align="top">
        <mj-column>
            <mj-text align="center" color="#55575d" font-family="Arial, sans-serif" font-size="11px" line-height="22px" padding="0px 20px"></mj-text>
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
    return response.status(500).json({ error: 'Erro interno do servidor' })
  }

  const mailOptions = {
    from: process.env.EMAIL,
    to: email_do_representante,
    subject: 'Lista de Exigências',
    html,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('Email enviado com sucesso!')
  } catch (error) {
    console.error('Erro ao enviar o email:', error)
  }

  return response.status(201).json({
    nome_da_instituicao,
    numero_do_protocolo,
    cnpj,
    nome_do_representante,
    email_do_representante,
    itens_da_lista_pendetes,
  })
}
