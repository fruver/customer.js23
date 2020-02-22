declare namespace NodeJS {
  // Merge the existing `ProcessEnv` definition with ours
  // https://www.typescriptlang.org/docs/handbook/declaration-merging.html#merging-interfaces
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    DEBUG: string;
    PORT: string;
    VERSION: string;
    SECRETKEY: string;
    DBURI: string;
    DBNAME: string;
    SENDGRIDAPIKEY: string;
    TWILIO_ACCOUNT_SID: string;
    TWILIO_AUTH_TOKEN: string;
  }
}
