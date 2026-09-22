import * as Yup from 'yup'

import UnlistedRequerimentsService from '../service/UnlistedRequerimentsService'

class UnlistedRequerimentsController {
  async store(request, response) {
    const schema = Yup.object({
      requirement_id: Yup.number().integer().required(),
      name: Yup.string().trim().required(),
      status: Yup.string().oneOf(['Pendente', 'Concluído']).required(),
      observacao: Yup.string().nullable(),
    }).noUnknown()

    try {
      const validatedData = await schema.validate(request.body, {
        abortEarly: false,
        stripUnknown: true,
      })

      const unlistedRequirement =
        await UnlistedRequerimentsService.createOne(validatedData)

      return response.status(201).json({
        message: 'Unlisted requirement created successfully',
        data: unlistedRequirement,
      })
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return response.status(400).json({
          error: 'Validation error',
          details: error.errors,
        })
      }

      return response.status(400).json({
        error: error.message,
      })
    }
  }

  async delete(request, response) {
    const { id } = request.params

    try {
      await UnlistedRequerimentsService.deleteUnlistedRequirement(id)

      return response.status(200).json({
        message: 'Unlisted requirement deleted successfully',
      })
    } catch (error) {
      return response.status(400).json({
        error: error.message,
      })
    }
  }

  async update(request, response) {
    const schema = Yup.array()
      .of(
        Yup.object({
          id: Yup.number().integer().required(),
          name: Yup.string().required(),
          status: Yup.string().oneOf(['Pendente', 'Concluído']).required(),
          observacao: Yup.string().nullable(),
        }).noUnknown(),
      )
      .required()

    try {
      const { data } = request.body

      const validatedData = await schema.validate(data, {
        abortEarly: false,
        stripUnknown: true,
      })

      await UnlistedRequerimentsService.updateUnlistedRequirement(validatedData)

      return response.status(200).json({
        message: 'Unlisted requirements updated successfully',
      })
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return response.status(400).json({
          error: 'Validation error',
          details: error.errors,
        })
      }

      return response.status(400).json({
        error: error.message,
      })
    }
  }

  async updateById(request, response) {
    const schema = Yup.object({
      observacao: Yup.string().nullable(),
      name: Yup.string().nullable(),
      status: Yup.string().oneOf(['Pendente', 'Concluído']),
    })
      .noUnknown()
      .test(
        'at-least-one-field',
        'At least one field must be provided for update',
        (value) => Object.keys(value).length > 0,
      )

    const { id } = request.params

    try {
      const validatedData = await schema.validate(request.body, {
        abortEarly: false,
        stripUnknown: true,
      })

      const validatedId = await Yup.number()
        .integer()
        .positive()
        .required()
        .validate(id)

      const updatedRequirement = await UnlistedRequerimentsService.updateById(
        validatedId,
        validatedData,
      )

      return response.status(200).json({
        message: 'Unlisted requirement updated successfully',
        data: updatedRequirement,
      })
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return response.status(400).json({
          error: 'Validation error',
          details: error.errors,
        })
      }

      return response.status(400).json({
        error: error.message,
      })
    }
  }
}

export default new UnlistedRequerimentsController()
