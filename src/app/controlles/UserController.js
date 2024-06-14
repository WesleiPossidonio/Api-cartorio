import { v4 } from 'uuid';
import validator from 'validator';
import User from '../models/User';
import * as Yup from 'yup';

// Função de sanitização reutilizável
const sanitizeInput = (data) => {
  const sanitizedData = {};
  Object.keys(data).forEach((key) => {
    sanitizedData[key] = typeof data[key] === 'string' ? validator.escape(data[key]) : data[key];
  });
  return sanitizedData;
};

class UserController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
      admin: Yup.boolean().required(),
      update_number: Yup.string().optional(),
      registration: Yup.string().required(),
    });

    const sanitizedBody = sanitizeInput(request.body);

    try {
      await schema.validateSync(sanitizedBody, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { name, email, password, admin, registration, update_number } = sanitizedBody;

    const emailUserExists = await User.findOne({
      where: { email },
    });

    const nameUserExists = await User.findOne({
      where: { name },
    });

    if (emailUserExists) {
      return response.status(409).json({ error: 'Email user already exists' });
    }

    if (nameUserExists) {
      return response.status(409).json({ error: 'Name user already exists' });
    }

    await User.create({
      id: v4(),
      name,
      email,
      password,
      admin,
      registration,
      update_number,
    });

    return response.status(201).json();
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      update_number: Yup.string().required(),
      password: Yup.string().required().min(6),
    });

    const sanitizedBody = sanitizeInput(request.body);

    try {
      await schema.validateSync(sanitizedBody, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { password, update_number } = sanitizedBody;

    const verificationNumber = await User.findOne({
      where: { update_number },
    });

    if (!verificationNumber) {
      return response.status(400).json({ error: 'Invalid update number' });
    }

    await User.update({ password }, { where: { update_number } });

    return response.status(200).json();
  }
}

export default new UserController();
