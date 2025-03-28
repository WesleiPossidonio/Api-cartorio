import * as Yup from 'yup'
import User from '../models/User'
import mjml2html from 'mjml'
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'

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

class ConfirmEmail {
  async store(request, response) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
    })

    // Validação dos dados de entrada diretamente
    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Email incorrect' })
    }

    const { email } = request.body

    const user = await User.findOne({
      where: { email: email.toLowerCase() },
    })

    if (!user) {
      return response.status(400).json({ error: 'Email incorrect' })
    }

    const verificationNumber = Math.floor(Math.random() * 40001) + 10000
    await user.update({ update_number: verificationNumber })

    const mjmlCode = `
      <mj-style>
        .full-width-image img {
        width: 100% !important;
        height: auto !important;
        }
      </mj-style>
      <mjml version="3.3.3">
        <mj-body background-color="#F4F4F4" color="#55575d" font-family="Arial, sans-serif">
          <mj-section background-color="#f2f2f2" padding="0" text-align="center">
            <mj-column padding="0">
              <mj-image src="https://i.imgur.com/BReyDw0l.jpg" fluid-on-mobile="true" padding="0" css-class="full-width-image"></mj-image>
            </mj-column>
          </mj-section>
          <mj-section background-color="#fff" padding="0px 0px 20px 0px" align-items="center" text-align="center">
            <mj-column>
              <mj-text>
                  <p color="#000" margin-bottom="1rem" class="Title-list">Atualização de Senha</p>
                  <h2 color="#000" margin-bottom="1rem" class="Title-list">Numero de Verificação: ${verificationNumber}</h2>
                  <p color="#000" >Clique no botão para atualizar a sua senha</p>
              </mj-text>
              <mj-button background-color="#006EAF" 
                href="https://sistema1oficio.vercel.app/Atualizar-Senha" padding="20px"> 
                Clique Aqui! 
              </mj-button>
            </mj-column>
          </mj-section>
          <mj-section background-color="#55575d" padding="20px 0" text-align="center">
              <mj-column>
                  <mj-text align="center" color="#000" font-size="13px" line-height="22px">
                      <p><strong>Rua Pereira de Souza, nº 104 - Centro, Macaé, RJ CEP:27.913-110</strong></p>
                      <p><strong>Tel: (22) 2106-1902  WhatsApp: (22) 99979.6222</strong></p>
                      <p><strong>E-mail: rtd-pj@macae1oficio.com.br</p>
                  </mj-text>
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
      return response.status(200).json({
        token: jwt.sign({ id: user.id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      })
    } catch (error) {
      console.error('Erro ao enviar o email:', error)
      return response.status(500).json({ error: 'Error sending email' })
    }
  }
}

export default new ConfirmEmail()
