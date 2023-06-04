import mongoose from 'mongoose';
import log from '../logger';
import { config } from '../config/config';

const connect = () => {
  // connect db
  mongoose.connect(config.mongdb.url, { retryWrites: true, w: 'majority' })
    .then(() => {
      log.info('mongdb connect success')
    })
    .catch(() => {
      log.error('connect failed');
    });
};

export default connect;
