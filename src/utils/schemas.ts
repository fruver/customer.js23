import Joi from '@hapi/joi';

const _buildMessages = (field: string, label: string) => ({
  'string.empty': `Es necesario ingresar un valor para el campo ${label}`,
  'any.required': `${label} es un campo requerido`,
});

export const CreateUserSchema = Joi.object().keys({
  firstName: Joi.string()
    .label('Nombre(s)')
    .required()
    .messages(_buildMessages('firstName', 'Nombre(s)')),
  lastName: Joi.string()
    .label('Apellido(s)')
    .required()
    .messages(_buildMessages('lastName', 'Apellido(s)')),
});

// CreateUserWithEmailAndPassword
export const CreateUserWithEmailAndPasswordSchema = CreateUserSchema.append({
  email: Joi.string()
    .label('Correo electrónico')
    .email()
    .required()
    .messages(_buildMessages('email', 'Correo electrónico')),
  password: Joi.string()
    .label('Contraseña')
    .required()
    .messages(_buildMessages('password', 'Contraseña')),
});
