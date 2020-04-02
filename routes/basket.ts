import config from '../config';
import { Router, Request, Response } from 'express';
import { BasketItemDTO } from '../';
import { getBasket} from '../basket';

export const router = Router();

router.get('/', async (req: Request, res: Response) => {
  console.log('GET /basket');

  try {
    const { BASKET_URL } = config;
    const basket: BasketItemDTO[] = await getBasket(BASKET_URL);
    res.json(basket)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
});
