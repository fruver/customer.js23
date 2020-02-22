import dotenv from 'dotenv';

dotenv.config();

export default {
  ENV: process.env.NODE_ENV || 'dev',
  PORT: process.env.PORT || 3000,
  DBURI: process.env.DBURI,
  DBNAME: process.env.DBNAME,
  SECRETKEY: process.env.SECRETKEY,
  // Twilio
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
};
