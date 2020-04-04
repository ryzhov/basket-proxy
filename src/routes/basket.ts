import config from '../config';
import { Router, Request, Response } from 'express';
import BasketItemDTO from './BasketItemDTO';
import { getBasket } from './proxy';

export const router = Router();

router.get('/', async (req: Request, res: Response) => {

  try {
    const { basket_url } = config;
    const basket: BasketItemDTO[] = await getBasket(basket_url);
    console.log(`GET => ${basket.length} items`);
    res.json(basket)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
});
