import * as Yup from 'yup'
import User from '../models/User'
import mjml2html from 'mjml'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD_EMAIL,
  },
})

class ConfirmEmail {
  async store(request, response) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
    })

    const emailOrPasswordIncorrect = () => {
      return response.status(400).json({ error: 'Email incorrect' })
    }

    if (!(await schema.isValid(request.body))) {
      return emailOrPasswordIncorrect()
    }

    const { email } = request.body

    const user = await User.findOne({
      where: { email },
    })

    if (!user) {
      return emailOrPasswordIncorrect()
    }

    const verificationNumber = Math.floor(Math.random() * 40001) + 10000

    await user.update({ update_number: verificationNumber })

    const mjmlCode = `
      <mjml version="3.3.3">
        <mj-body background-color="#F4F4F4" color="#55575d" font-family="Arial, sans-serif">
          <mj-section background-color="#d1d1d1" background-repeat="repeat" padding="20px" display="flex" align-items="center">
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

          <mj-section background-color="#fff" background-repeat="repeat" background-size="auto" padding="0px 0px 20px 0px" align-items="center" text-align="center" vertical-align="top">
            <mj-column>
              <mj-text>
                  <h1 color="#000" margin-bottom="1rem" class="Title-list">Atualização de Senha</h1>
                  <h2 color="#000" margin-bottom="1rem" class="Title-list">Numero de Verificação: ${verificationNumber}</h2>
                  <h3 color="#000" >Clique no botão para atualizar a sua senha</h3>
              </mj-text>
              <mj-button background-color="#006EAF" 
                href="https://project-cartorio.vercel.app/Atualizar-Senha" padding="20px"> 
                Clique Aqui! 
              </mj-button>
            </mj-column>
          </mj-section>

          <mj-section background-color="#55575d" background-repeat="repeat" padding="20px 0" text-align="center" vertical-align="top">
              <mj-column>
                  <mj-text align="center" color="#000" font-family="Arial, sans-serif" font-size="13px" line-height="22px">
                      <p color="#000"><strong>Rua Pereira de Souza, nº 104 - Centro, Macaé, RJ CEP:27.913-110</strong></p>
                      <p color="#000"><strong>Tel: (22) 2106-1902  WhatsApp: (22) 99979.6222</strong></p>
                      <p color="#000"><strong>E-mail: rtd-pj@macae1oficio.com.br</p>
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
      return response.status(500).json({ error: 'Internal server error' })
    }

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Atualização de Senha',
      html,
    }

    try {
      await transporter.sendMail(mailOptions)
      return response.status(200).json({ message: 'Email sent successfully' })
    } catch (error) {
      console.error('Erro ao enviar o email:', error)
      return response.status(500).json({ error: 'Error sending email' })
    }
  }
}

export default new ConfirmEmail()
