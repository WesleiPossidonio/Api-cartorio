import * as Yup from 'yup'

import RequerimentNotListed from '../models/RequerimentNotListed'

class RequerimentNotListedController {
  async store(request, response) {
    const schema = Yup.object().shape({
      primeira_exigencia: Yup.string(),
      estado_da_primeira_exigencia: Yup.string(),
      segunda_exigencia: Yup.string(),
      estado_da_segunda_exigencia: Yup.string(),
      terceira_exigencia: Yup.string(),
      estado_da_terceira_exigencia: Yup.string().email(),
      quarta_exigencia: Yup.string(),
      estado_da_quarta_exigencia: Yup.string(),
      quinta_exigencia: Yup.string(),
      estado_da_quinta_exigencia: Yup.string(),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const {
      primeira_exigencia,
      estado_da_primeira_exigencia,
      segunda_exigencia,
      estado_da_segunda_exigencia,
      terceira_exigencia,
      estado_da_terceira_exigencia,
      quarta_exigencia,
      estado_da_quarta_exigencia,
      quinta_exigencia,
      estado_da_quinta_exigencia,
    } = request.body

    const requeriment = await RequerimentNotListed.create({})

    return response.status(201).json({
      id: requeriment.id,
      primeira_exigencia,
      estado_da_primeira_exigencia,
      segunda_exigencia,
      estado_da_segunda_exigencia,
      terceira_exigencia,
      estado_da_terceira_exigencia,
      quarta_exigencia,
      estado_da_quarta_exigencia,
      quinta_exigencia,
      estado_da_quinta_exigencia,
    })
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      primeira_exigencia: Yup.string(),
      estado_da_primeira_exigencia: Yup.string(),
      segunda_exigencia: Yup.string(),
      estado_da_segunda_exigencia: Yup.string(),
      terceira_exigencia: Yup.string(),
      estado_da_terceira_exigencia: Yup.string().email(),
      quarta_exigencia: Yup.string(),
      estado_da_quarta_exigencia: Yup.string(),
      quinta_exigencia: Yup.string(),
      estado_da_quinta_exigencia: Yup.string(),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { id } = request.params

    const userExists = await RequerimentNotListed.findOne({
      where: { id },
    })

    if (!userExists) {
      return response.status(400).json({ error: 'User not found' })
    }

    const {
      primeira_exigencia,
      estado_da_primeira_exigencia,
      segunda_exigencia,
      estado_da_segunda_exigencia,
      terceira_exigencia,
      estado_da_terceira_exigencia,
      quarta_exigencia,
      estado_da_quarta_exigencia,
      quinta_exigencia,
      estado_da_quinta_exigencia,
    } = request.body

    await RequerimentNotListed.update(
      {
        primeira_exigencia,
        estado_da_primeira_exigencia,
        segunda_exigencia,
        estado_da_segunda_exigencia,
        terceira_exigencia,
        estado_da_terceira_exigencia,
        quarta_exigencia,
        estado_da_quarta_exigencia,
        quinta_exigencia,
        estado_da_quinta_exigencia,
      },
      { where: { id } }
    )

    return response.json({ message: 'status was update sucessfully' })
  }
}

export default new RequerimentNotListedController()
