import config from '../config';
import { Router, Request, Response } from 'express';
import { getBasket } from './proxy';
import BasketItemDTO from './BasketItemDTO';

const { basketUrl, basketFetchInterval } = config;
export const basketRouter = Router();

let basket: BasketItemDTO[];

const fetch = async () => {
    basket = await getBasket(basketUrl);
    console.log('fetch basket at => ', new Date(), `, ${basket.length} items`);
};

setImmediate(fetch);
setInterval(fetch, basketFetchInterval);

basketRouter.get('/', async (req: Request, res: Response) => {
    console.log(`GET => ${basket.length} items`);
    res.json(basket)
});
