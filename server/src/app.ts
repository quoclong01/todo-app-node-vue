import { Request, Response, NextFunction } from "express"; 
import express from 'express';
import log from "./logger";
import connect from "./db/connect";
import { config } from './config/config';
import routes from './routes';

const app = express();
 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

app.listen(config.server.port, () => {
  log.info(`Server listing at ${config.server.port}`);

  connect();

  app.use('/api/v1', routes);
});

