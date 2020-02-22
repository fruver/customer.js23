import bycrypt from 'bcryptjs';

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

export const hashCompare = async (password: string, hash: string) => {
  return new Promise<boolean>((resolve, reject) => {
    bycrypt.compare(password, hash, (err, success) => {
      if (err) return reject(err);
      return resolve(success);
    });
  });
};
