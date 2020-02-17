// import jwt from 'jsonwebtoken';
import validator from 'validator';
import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';

import {
  createUserWithEmailAndPassword,
  findByEmail,
} from '../models/user.model';

import { CreateUserWithEmailAndPasswordSchema } from '../utils/schemas';

import { hashPassword } from '../utils/hashers';

export const SignUpWithEmailAndPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Schema Result validate
  const { value, error } = CreateUserWithEmailAndPasswordSchema.validate(
    req.body,
  );

  console.log(`value: ${value}`);
  console.log(`error: ${error}`);

  // Extract required fields
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || validator.isEmpty(firstName.toString())) {
    return res.status(400).json('Nombre(s) es un campo requerido');
  }

  if (!lastName || validator.isEmpty(lastName.toString())) {
    return res.status(400).json('Apellido(s) es un campo requerido');
  }

  if (!email || validator.isEmail(email.toString)) {
    return res.status(400).json('Ingresa un correo electrónico valido');
  }

  if (!password || !validator.isLength(password.toString(), { min: 8 })) {
    return res.status(400).json('Ingresa una contraseña valida');
  }

  try {
    const result = await findByEmail(email);
    if (result) {
      return res
        .status(400)
        .json(`Un usuario con el correo electrónico ${result.email} ya existe`);
    }
  } catch (err) {
    next(err);
  }

  try {
    const _password = await hashPassword(password);
    const result = await createUserWithEmailAndPassword(
      firstName,
      lastName,
      email,
      _password,
    );
    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};
