import { QueryItem } from '../interfaces';

export const mapQueryItems = (itemsArr: QueryItem[], name: string) =>
  Object.fromEntries([
    [name, true],
    ...itemsArr.map((item) => [item.name, true]),
  ]);
