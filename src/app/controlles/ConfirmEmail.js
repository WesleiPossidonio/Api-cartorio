import * as Yup from 'yup'
import User from '../models/User'
import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'
import mjml2html from 'mjml'
import nodemailer from 'nodemailer'

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

class ConfirmEmail {
  async store(request, response) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
    })

    const emailOrPasswordIncorrect = () => {
      return response
        .status(400)
        .json({ error: 'Make sure your password or email are correct' })
    }

    if (!(await schema.isValid(request.body))) {
      return emailOrPasswordIncorrect()
    }

    const { email } = request.body

    const users = await User.findOne({
      where: { email },
    })

    if (!users) {
      return emailOrPasswordIncorrect()
    }

    const mjmlCode = `
    <mjml version="3.3.3">
    <mj-body background-color="#F4F4F4" color="#55575d" font-family="Arial, sans-serif">
      <mj-section background-color="#006EAF" background-repeat="repeat" padding="20px 0" text-align="center" vertical-align="top">
        <mj-column>
          <mj-image align="center" padding="10px 25px" src="https://imgbly.com/ib/OBPEpkQbUD.png" width="128px"></mj-image>
        </mj-column>
      </mj-section>
  
      <mj-section background-color="#ffffff" background-repeat="repeat" background-size="auto" padding="0px 0px 20px 0px" text-align="center" vertical-align="top">
        <mj-column>
              <mj-text>
                  <h2 margin-botton="1rem" class="Title-list">Atualização de Senha</h2>
                  <h3>Clique no botão para atualizar a sua senha</h3>
              </mj-text>

              <mj-button background-color="#006EAF" href="https://project-cartorio-swhs.vercel.app/atualizar-lista" paddimg="20px"> Clique Aqui! </mj-button>
  
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
      to: email,
      subject: 'Atualização de Senha',
      html,
    }

    try {
      await transporter.sendMail(mailOptions)
      console.log('Email enviado com sucesso!')
    } catch (error) {
      console.error('Erro ao enviar o email:', error)
    }

    return response.json({
      id: users.id,
      token: jwt.sign({ id: users.id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    })
  }
}

export default new ConfirmEmail()
