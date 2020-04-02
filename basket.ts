
import axios, { AxiosResponse} from 'axios';
import { parse as parseXML } from 'fast-xml-parser';
import { ListItem, BasketItemDTO } from '.';

const normalizer = (list: ListItem[]): BasketItemDTO[] => list.map(
    ({'@_data': data, '@_val': val }: ListItem): BasketItemDTO => ({ timestamp: (new Date(data)).getTime(), value: parseFloat(val)})
);

export const getBasket = async (url: string): Promise<BasketItemDTO[]> => {
    const { data }: AxiosResponse<string> = await axios.get(url);
    const { Basket: { BasketList: list } } = parseXML(data, { ignoreAttributes: false });
    return normalizer(list);
}
