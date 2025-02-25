import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'

export default (request, response, next) => {
  const authToken = request.cookies['token']
  console.log(authToken)  // Nome do cookie que armazena o token

  if (!authToken) {
    return response.status(401).json({ error: 'Token not provided' })
  }

  try {
    const decoded = jwt.verify(authToken, authConfig.secret)
    request.userId = decoded.id
    request.userName = decoded.name
    return next()
  } catch {
    return response.status(401).json({ error: 'Token is invalid' })
  }
}