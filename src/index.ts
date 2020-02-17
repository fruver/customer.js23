import { MongoClient } from 'mongodb';

import server from './server';
import config from './config';
import { injectDB as UserModel } from './models/user.model';

MongoClient.connect(
  config.DBURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) {
      console.log('mongodb:connect:fail');
      process.exit(1);
    } else {
      console.log('mongodb:connect:succesful');
      // DB instance
      const db = client.db(config.DBNAME);
      // InjectDB to dao models.
      try {
        UserModel(db);
      } catch (err) {
        console.log(`mongodb:injectDB:${err.message}`);
        process.exit(1);
      }
      // Configurar servidor de express
      server.listen(config.PORT, () => {
        console.log('expressjs:listen:succesful');
      });
    }
  },
);
