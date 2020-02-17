import bycrypt from 'bcryptjs';

// const checkPassword = () => {};

// const makePassword = () => {};

export const hashPassword = async (password: string) => {
  return await bycrypt.hash(password, 10);
};

export const comparePassword = async (
  rawPassword: string,
  password: string,
) => {
  return await bycrypt.compare(rawPassword, password);
};
