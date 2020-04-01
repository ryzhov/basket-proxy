
import axios, { AxiosResponse} from 'axios';
import { parse as parseXML } from 'fast-xml-parser';
import { ListItem, BasketItem } from '.';

const normalizer = (list: ListItem[]): BasketItem[] => list.map(
    ({'@_data': data, '@_val': val }: ListItem): BasketItem => ({ timestamp: new Date(data), value: parseFloat(val)})
);

export const getBasket = async (url: string): Promise<BasketItem[]> => {
    const { data }: AxiosResponse<string> = await axios.get(url);
    const { Basket: { BasketList: list } } = parseXML(data, { ignoreAttributes: false });
    return normalizer(list);
}
