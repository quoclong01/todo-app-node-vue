const dotenv = require('dotenv');

dotenv.config();

const MONGDB_USERNAME = process.env.MONGDB_USERNAME || '';
const MONGDB_PASSWORD = process.env.MONGDB_PASSWORD || '';
const MONGDB_URL = `mongodb+srv://${MONGDB_USERNAME}:${MONGDB_PASSWORD}@cluster0.0ooju4g.mongodb.net/?retryWrites=true&w=majority`;

const PORT = process.env.PORT || 3000;

export const config = {
  mongdb: {
    username: MONGDB_USERNAME,
    password: MONGDB_PASSWORD,
    url: MONGDB_URL,
  },
  server: {
    port: PORT,
  },
};
