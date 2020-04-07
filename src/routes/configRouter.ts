import config from '../config';
import { Router, Request, Response } from 'express';

export const configRouter = Router();

configRouter.get('/', (req: Request, res: Response) => {
    try {
        console.log(`GET => config`);
        res.json(config);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});
