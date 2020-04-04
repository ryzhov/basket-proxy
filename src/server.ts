
import express, { Express } from 'express';
import { Server } from 'http';
import config from './config';
import { router as basketRouter } from './routes/basket';

const port: number = parseInt(config.EXPOSE_PORT, 10);
const app: Express = express();

app.use(express.json());
app.use('/basket', basketRouter);
const server: Server = app.listen(port, () => console.log(`server:: started at port => ${port}`));

process.on('SIGTERM', () => {
    console.log('Process terminated.')
    server.close();
});

process.on('SIGINT', () => {
    console.log("Caught interrupt signal");
    server.close();
});
