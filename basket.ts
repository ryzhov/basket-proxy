
import axios, { AxiosResponse} from 'axios';
import { parse } from 'fast-xml-parser';
import { ListItem, BasketItem } from '.';

const normalizer = (list: ListItem[]): BasketItem[] => list.map(
    ({'@_data': data, '@_val': val }: ListItem): BasketItem => ({ timestamp: new Date(data), value: parseFloat(val)})
);

export const getBasket = (url: string): Promise<BasketItem[]> => axios.get(url)
    .then(({ data }: AxiosResponse<string>): BasketItem[] => {
        const { Basket: { BasketList: list}} = parse(data, {ignoreAttributes: false});
        return normalizer(list);
    });
