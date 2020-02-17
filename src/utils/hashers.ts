import bycrypt from 'bcryptjs';

// const checkPassword = () => {};

// const makePassword = () => {};

export const hashPassword = async (password: string) => {
  return new Promise<string>((resolve, reject) => {
    bycrypt.genSalt(10, (err, salt) => {
      if (err) return reject(err);
      bycrypt.hash(password, salt, (err, hash) => {
        if (err) return reject(err);
        return resolve(hash);
      });
    });
  });
};

export const comparePassword = async (rawPassword: string, password: string) => {
  return await bycrypt.compare(rawPassword, password);
};
