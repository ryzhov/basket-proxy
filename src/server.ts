
import express, { Express } from 'express';
import cors from 'cors';
import { Server } from 'http';
import config from './config';
import { basketRouter } from './routes/basketRouter';
import { configRouter } from './routes/configRouter';

const { port, env, debug, version, appName } = config;
const app: Express = express();

app.use(express.json());
app.use(cors());
app.use('/', configRouter);
app.use('/basket', basketRouter);

const server: Server = app.listen(
    port,
    () => console.log(`port => ${port}; env => ${env}; debug => ${debug}; app => ${appName}:${version}`)
);

const exit = (message: string) => {
    console.log(message);
    server.close(error => console.error(`server close error => ${error}`));
    process.exit(0)
};

process.on('SIGTERM', () => exit('Process terminated.'));
process.on('SIGINT', () => exit('Caught Interrupt signal.'));    
process.on('SIGHUP', () => exit('Caught Hangup signal.'));    
