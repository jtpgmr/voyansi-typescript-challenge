import app from './app';
import config from "config"
import dotenv from 'dotenv';

import connectDb from './utils/connectDb';
import log from './utils/logger';

dotenv.config();
// const port = process.env.PORT || 4000;

const port = config.get<number>("port")

app.listen(port, () => {
  log.info(`Listening: http://localhost:${port}`);
  connectDb();
});