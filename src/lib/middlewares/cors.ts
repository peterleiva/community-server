import cors, { CorsOptions } from 'cors';

const options: CorsOptions = {
  origin: [/https?:\/\/localhost:(3000|4200)/],
};

export default cors(options);
