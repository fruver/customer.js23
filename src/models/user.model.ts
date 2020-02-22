import { MongoError, Collection, Db } from 'mongodb';

export interface WhatsApp {
  code: number;
  phoneNumber: number;
  isActive: boolean;
  createdAt: Date;
}

export interface EmailAddress {
  email: string;
  isActive: boolean;
  createdAt: Date;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  whatsapp: WhatsApp;
  password: string;
  isActive: boolean;
  isAdmin: boolean;
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
    isAdmin = false,
  } = userInfo;
  return new Promise<boolean>((resolve, reject) => {
    users.insertOne(
      { firstName, lastName, email, password, isActive, isAdmin },
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
