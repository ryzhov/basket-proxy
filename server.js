
import express from 'express';
import dotenv from 'dotenv'
import { router as basketRouter } from './routes/basket.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/basket', basketRouter);
app.listen(3000, () => console.log('server started'));
