// import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import { createUserWithEmailAndPassword, findByEmail } from '../models/user.model';
import { CreateUserWithEmailAndPasswordSchema } from '../utils/user.schema';
import { hashPassword } from '../utils/hashers';

export const SignUpWithEmailAndPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Schema Result validate
  const { value, error } = CreateUserWithEmailAndPasswordSchema.validate(req.body);

  if (error) {
    return res.status(400).json(error);
  }

  try {
    const result = await findByEmail(value.email);
    if (result) {
      return res
        .status(400)
        .json(`Un usuario con el correo electrónico ${value.email} ya existe`);
    }
  } catch (err) {
    return next(err);
  }

  // Create Password Hash With Bycriptjs
  let _password: string;
  try {
    _password = await hashPassword(value.password);
  } catch (err) {
    return next(err);
  }

  try {
    await createUserWithEmailAndPassword({ ...value, password: _password });
    return res.status(201).end();
  } catch (err) {
    return next(err);
  }
};
