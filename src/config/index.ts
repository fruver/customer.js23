import dotenv from 'dotenv';

dotenv.config();

export default {
	ENV: process.env.NODE_ENV,
	PORT: process.env.PORT,
	DBURI: process.env.DBURI,
	DBNAME: process.env.DBNAME
};
