import { MongoError, Collection, Db } from 'mongodb';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isActive: boolean;
  isStaff: boolean;
  createdAt: Date;
  lastLogin: Date;
}

let users: Collection;

export const injectDB = (db: Db) => {
  if (users) return;
  try {
    users = db.collection('users');
  } catch (err) {
    throw new MongoError(err);
  }
};

export const createUserWithEmailAndPassword = (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
) => {
  return new Promise<User[]>((resolve, reject) => {
    users.insertOne(
      { firstName, lastName, email, password },
      { w: 'majority' },
      (error, result) => {
        if (error) reject(error);
        resolve(result.ops);
      },
    );
  });
};

export const findByEmail = (email: string) => {
  return new Promise<User>((resolve, reject) => {
    users.findOne({ email }, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};
