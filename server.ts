
import { config } from 'dotenv';
import { getBasket} from './basket';
import { BasketItem } from '.';

config();

const MIN_FETCH_INTERVAL = 60000;
const { BASKET_URL, FETCH_INTERVAL = '900000' } = process.env;

if (!BASKET_URL) {
    throw new TypeError(`Valid basket URL must be configured, found => "${BASKET_URL}"`);
}

const fetchInterval = parseInt(FETCH_INTERVAL, 10);
const getFetchInterval = () => MIN_FETCH_INTERVAL > fetchInterval ? MIN_FETCH_INTERVAL : fetchInterval;

const fetchHandler = async () => {
    const basket: BasketItem[] = await getBasket(BASKET_URL);
    const date = (new Date()).toUTCString();
    console.log(basket, `, length => ${basket.length}, date => ${date}`);
};

const timeout = setInterval(fetchHandler, getFetchInterval());
console.log('scheduled with interval => ', getFetchInterval());

process.on('SIGTERM', () => {
    console.log('Process terminated.')
    clearInterval(timeout);
});

process.on('SIGINT', () => {
    console.log("Caught interrupt signal");
    clearInterval(timeout);
});

setImmediate(fetchHandler);