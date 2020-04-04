
import express, { Express } from 'express';
import { Server } from 'http';
import config from './config';
import { router as basketRouter } from './routes/basket';

const { port, env, debug, version } = config;
const app: Express = express();

app.use(express.json());
app.use('/basket', basketRouter);

const server: Server = app.listen(
    port,
    () => console.log(`server:: started at port => ${port}; env => ${env}; debug => ${debug}; version => ${version}`)
);

const exit = (message: string) => {
    console.log(message);
    server.close(error => console.error(`server close error => ${error}`));
    process.exit(0)
};

process.on('SIGTERM', () => exit('Process terminated.'));
process.on('SIGINT', () => exit('Caught Interrupt signal.'));    
process.on('SIGHUP', () => exit('Caught Hangup signal.'));    
