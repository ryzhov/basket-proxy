import config from '../config';
import { Router, Request, Response } from 'express';
import BasketItemDTO from './BasketItemDTO';
import { getBasket } from './proxy';

export const basketRouter = Router();

basketRouter.get('/', async (req: Request, res: Response) => {
    try {
        const { basketUrl } = config;
        const basket: BasketItemDTO[] = await getBasket(basketUrl);
        console.log(`GET => ${basket.length} items`);
        res.json(basket)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});
