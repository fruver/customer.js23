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

export const createUserWithEmailAndPassword = (userInfo: User) => {
  const {
    firstName,
    lastName,
    email,
    password,
    isActive = false,
    isStaff = false,
  } = userInfo;
  return new Promise<boolean>((resolve, reject) => {
    users.insertOne(
      { firstName, lastName, email, password, isActive, isStaff },
      { w: 'majority' },
      (error, result) => {
        if (error) return reject(error);
        const insertedCount = result.insertedCount;
        return resolve(insertedCount == 1 ? true : false);
      },
    );
  });
};

export const findByEmail = (email: string) => {
  return new Promise<User>((resolve, reject) => {
    users.findOne({ email }, (error, result) => {
      if (error) return reject(error);
      return resolve(result);
    });
  });
};
