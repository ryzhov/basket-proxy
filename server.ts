
import express, { Express } from 'express';
import { Server } from 'http';
import { router as basketRouter } from './routes/basket';

const app: Express = express();

app.use(express.json());
app.use('/basket', basketRouter);
const server: Server = app.listen(3000, () => console.log('server started'));

process.on('SIGTERM', () => {
    console.log('Process terminated.')
    server.close();
});

process.on('SIGINT', () => {
    console.log("Caught interrupt signal");
    server.close();
});
