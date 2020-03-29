
import { config } from 'dotenv'
import axios, { AxiosResponse} from 'axios';
import { parse } from 'fast-xml-parser';
import { BasketItem, ListItem } from './BasketItem';

config();
const { BASKET_URL } = process.env;

if (!BASKET_URL) {
    throw new TypeError(`Valid basket URL must be configured, found => "${BASKET_URL}"`);
}

const normalizer = (list: ListItem[]): BasketItem[] => {
    return list.map((item: ListItem): BasketItem => {
        const { '@_data': data, '@_val': val } = item;
        return { timestamp: new Date(data), value: parseFloat(val)};
    });
};

const basket: Promise<BasketItem[]> = axios.get(BASKET_URL)
    .then(({ data }: AxiosResponse<string>): BasketItem[] => {
        const { Basket: { BasketList: list}} = parse(data, {ignoreAttributes: false});
        console.log(`basket length => ${list.length}`);
        return normalizer(list);
    })
;

basket.then((basket: BasketItem[]) => console.log(basket));
