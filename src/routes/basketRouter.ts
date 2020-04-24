import config from '../config';
import { Router, Request, Response } from 'express';
import { getBasket } from './proxy';
import BasketItemDTO from './BasketItemDTO';

const { basketUrl, basketFetchInterval } = config;
export const basketRouter = Router();

let basket: BasketItemDTO[];

const fetch = async () => {
    basket = await getBasket(basketUrl);
    console.log(`fetch ${basket.length} basket items at ${new Date()}`);
};

setImmediate(fetch);
setInterval(fetch, basketFetchInterval);

basketRouter.get('/', async (req: Request, res: Response) => {
    res.json(basket)
});
