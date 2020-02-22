import Joi from '@hapi/joi';

const _buildMessages = (field: string, label: string) => ({
  'string.empty': `Es necesario ingresar un valor para el campo ${label}`,
  // 'string.min': ``,
  'any.required': `${label} es un campo requerido`,
});

export const UserBaseSchema = Joi.object().keys({
  firstName: Joi.string()
    .label('Nombre(s)')
    .required()
    .messages(_buildMessages('firstName', 'Nombre(s)')),
  lastName: Joi.string()
    .label('Apellido(s)')
    .required()
    .messages(_buildMessages('lastName', 'Apellido(s)')),
  email: Joi.string()
    .label('Correo electrónico')
    .email()
    .required()
    .messages(_buildMessages('email', 'Correo electrónico')),
});

export const MobileNumberSchema = Joi.object().keys({
  code: Joi.number()
    .label('Código')
    .required()
    .min(3)
    .max(3)
    .messages(_buildMessages('code', 'Código')),
  number: Joi.number()
    .label('Numero')
    .required()
    .min(10)
    .max(10)
    .messages(_buildMessages('number', 'Numero')),
  isWsp: Joi.boolean()
    .label('WhatsApp')
    .required()
    .default(false),
});

export const UserWithMobilePhoneSchema = UserBaseSchema.concat(MobileNumberSchema);
