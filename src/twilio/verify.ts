import twilio from 'twilio';
import * as TwilioClient from 'twilio/lib/rest/Twilio';
import {
  ServiceInstance,
  ServiceListInstanceOptions,
} from 'twilio/lib/rest/verify/v2/service';

import config from '../config';

class TwilioVerify {
  client: TwilioClient;

  constructor() {
    this.client = twilio(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN);
  }

  service = (sid: string) => {
    return new Promise<ServiceInstance>((resolve, reject) => {
      this.client.verify.services(sid).fetch((error, items) => {
        if (error) return reject(error);
        return resolve(items);
      });
    });
  };

  services = (opts: ServiceListInstanceOptions) => {
    return new Promise<ServiceInstance[]>((resolve, reject) => {
      this.client.verify.services.list(opts, (error, items) => {
        if (error) return reject(error);
        return resolve(items);
      });
    });
  };
}

export default new TwilioVerify();
