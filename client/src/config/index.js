const nodeEnv = process.env.NODE_ENV;
const [devApi, prodApi] = [
  'http://localhost:7000/api/',
  'https://pure-river-53753.herokuapp.com/api/',
];

export const BASE_URL = nodeEnv === 'production' ? prodApi : devApi;
