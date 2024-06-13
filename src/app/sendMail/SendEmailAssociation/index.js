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

export const sendMailAssociation = async (request, response) => {
  const schema = Yup.object().shape({
    nome_da_instituicao: Yup.string().required(),
    numero_do_protocolo: Yup.string().required(),
    cnpj: Yup.string().required(),
    cof: Yup.string().required(),
    nome_do_representante: Yup.string().required(),
    email_do_representante: Yup.string().email(),
    data_da_recepcao: Yup.string().required(),
    telefone_contato: Yup.string().required(),
    name: Yup.string().required(),
    registration: Yup.string().required(),
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
    data_da_recepcao,
    telefone_contato,
    name,
    registration,
    sobre_exigencia,
    cpf,
  } = request.body

  const mjmlCode = `
  <mjml version="3.3.3">
  <mj-body background-color="#F4F4F4" color="#55575d" font-family="Arial, sans-serif">

    <mj-section background-color="#d1d1d1" background-repeat="repeat" padding="20px" display="flex" align-itens="center">
      <mj-column> 
          <mj-image src="https://imgbly.com/ib/gxPjbmr9kN.png" width="180px"></mj-image>
      </mj-column>
      <mj-column> 
        <mj-text line-height="1.6" margin-top="15px" font-size="14px">
          <h3>
            Cartório <br/> 1º Ofício de Justiça de Macaé
          </h3>
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" background-repeat="repeat" padding="20px 0" text-align="center" vertical-align="top">
      <mj-column>
        <mj-text>
          <p> <strong> Nº do Exame: </strong> ${numero_do_protocolo}</p>
          <p> <strong>Data da Recepção: </strong> ${data_da_recepcao}</p>
        </mj-text>

        <mj-text line-height="1.6">
          <p>
            <strong>Prezado ${nome_do_representante}</strong> <br/> 
            Espero que esteja bem. Entramos em contato para fornecer informações
            importantes sobre o inicio do seu processo de ${sobre_exigencia}.
          </p>
        </mj-text>

        <mj-text>
          <h3>Sobre a Instituição</h3>
          <p><strong> Nome da Instituição:</strong> ${nome_da_instituicao}</p>
                ${
                  cnpj !== 'Não Selecionado' ? (
                    <p>
                      <strong> CNPJ:</strong> ${cnpj}
                    </p>
                  ) : (
                    <p>
                      <strong> CPF:</strong> ${cpf}
                    </p>
                  )
                }
          
          <p><strong>Nome do Representante:</strong> ${nome_do_representante}</p>
          <p><strong>Email do Representante:</strong> ${email_do_representante}</p>
          <p><strong>Tel do Representante:</strong> ${telefone_contato}</p>
        </mj-text>

        <mj-text>
          <h3 margin-botton="1rem" class="Title-list">Funcionário Responsável pela Análise:</h3>
          <p>
            <strong>Nome:</strong> ${name}
          </p>
          <p>
            <strong>Matricula:</strong> ${registration}
          </p>
        </mj-text>

        <mj-text color="#000" line-height="1.8">
          <h3 class="Title-list">Prazos Importantes: </h3>
          <p color="#000"><strong>- Prazo para análise 15 dias</strong></p>
          <p color="#000"><strong>- Cumprimento da exigencia 30 dias.</strong></p>
          <p color="#000"><strong>- Prazo para registro 30 dias satifesta as exigencias necessárias</p>
        </mj-text>

        <mj-text color="#000" line-height="1.8">
          <strong color="#000">
            Se surgirem dúvidas ou se precisar de mais informações, por favor, não hesite em nos contatar via WhatsApp.
          </strong>
        </mj-text>
        <mj-button background-color="#25D366" href="https://wa.me/5522999796222" paddimg="20px"> Enviar Menssagem </mj-button>

      </mj-column>
    </mj-section>

    <mj-section background-color="#d1d1d1" background-repeat="repeat" padding="20px 0" text-align="center" vertical-align="top">
      <mj-column>
        <mj-text align="center" color="#000" font-family="Arial, sans-serif" font-size="13px" line-height="22px">
          <p color="#000"><strong>Rua Pereira de Souza, nº 104 - Centro, Macaé, RJ CEP:27.913-110</strong></p>
          <p color="#000"><strong>Tel: (22) 2106-1902  WhatsApp: (22) 99979.6222</strong></p>
          <p color="#000"><strong>E-mail: rtd-pj@macae1oficio.com.br</strong></p>
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-repeat="repeat" background-size="auto" padding="20px 0px 20px 0px" text-align="center" vertical-align="top">
      <mj-column>
        <mj-text line-height="1.8" align="center" color="#55575d" font-family="Arial, sans-serif" font-size="11px" line-height="22px" padding="0px 20px"></mj-text>
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
    subject: `Exigência 1º Ofício ${numero_do_protocolo}-${nome_do_representante}`,
    html,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('Email Enviado')
    return response.status(201)
  } catch (error) {
    console.error('Erro ao enviar o email:', error)
    return response.status(500).json({ error: 'Erro ao enviar o e-mail' })
  }
}
