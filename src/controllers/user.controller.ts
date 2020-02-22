import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// User Model
import { User, createUserWithEmailAndPassword, findByEmail } from '../models/user.model';

// Schema User
import { MobileNumberSchema } from '../utils/user.schema';

// Password utility
import { hashPassword, hashCompare } from '../utils/hashers';

// Config
import config from '../config';

// Twilio
import { service as VerifyService, services as VerifyServices } from '../twilio/verify';

export const SignIn = async (req: Request, res: Response, next: NextFunction) => {
  const { value, error } = MobileNumberSchema.validate(req.body);
  if (error) {
    return res.status(400).json(error);
  }
};

export const SignInWithSMS = () => {};

export const SignInWithWhatsApp = () => {};

export const SignUp = async (req: Request, res: Response, next: NextFunction) => {
  // Schema Result validate
  const { value, error } = { value: req.body, error: null };

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

  let password: string;
  try {
    password = await hashPassword(value.password);
  } catch (err) {
    return next(err);
  }

  try {
    await createUserWithEmailAndPassword({ ...value, password });
    return res.status(201).end();
  } catch (err) {
    return next(err);
  }
};

export const SignInWithEmailAndPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Schema Result validate
  const { value, error } = { value: req.body, error: null };

  if (error) {
    return res.status(400).json(error);
  }

  // Verificar que el correo ingresado pertenezca a un usuario.
  let user: User;
  try {
    user = await findByEmail(value.email);
    if (!user) {
      return res
        .status(400)
        .json(`Usuario con el correo electrónico ${value.email} no existe`);
    }
  } catch (err) {
    return next(err);
  }

  // Check Password
  try {
    if (!(await hashCompare(value.password, user.password))) {
      return res.status(401).json('Correo electrónico o contraseña incorrectos');
    }
  } catch (err) {
    return next(err);
  }

  // jwt
  const token = jwt.sign({ data: 'foobar', iat: 1516239022 }, config.SECRETKEY, {
    subject: '1234567890',
  });
  return res.status(200).json(token);
};

export const twilio = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await services({ limit: 20 });
    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(400).json('not found');
    }
  } catch (err) {
    next(err);
  }
};
