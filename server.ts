
import express, { json } from 'express';
import { config } from 'dotenv'
import { router as basketRouter } from './routes/basket';

config();

const app: express.Application = express();
app.use(json());
app.use('/basket', basketRouter);
app.listen(3000, () => console.log('server started'));
