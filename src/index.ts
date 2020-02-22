import { MongoClient } from 'mongodb';

import server from './server';
import config from './config';
import { injectDB as UserModel } from './models/user.model';
import { injectClient as TwilioVerify } from './twilio/verify';

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

      // Twilio Inject client
      try {
        TwilioVerify(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN);
      } catch (err) {
        console.log(`twilio:injectClient:${err.message}`);
        process.exit(1);
      }
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
