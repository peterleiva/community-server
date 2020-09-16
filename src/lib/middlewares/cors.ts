import cors, { CorsOptions } from 'cors';

const options: CorsOptions = {
  origin: [
    /https?:\/\/localhost:(3000|4200)/,
    'https://studio.apollographql.com',
  ],
};

export default cors(options);
