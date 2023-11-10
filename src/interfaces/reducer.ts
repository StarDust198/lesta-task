import { QueryItem } from '../interfaces';

export interface FiltersParams {
  nations: QueryItem[];
  types: QueryItem[];
  minLevel: number;
  maxLevel: number;
}

export interface FiltersGroup {
  [key: string]: boolean;
}

export interface FiltersState {
  nations: FiltersGroup;
  types: FiltersGroup;
  min: number;
  max: number;
}

export type FiltersKind = 'nations' | 'types';

export type FiltersAction =
  | {
      type: 'switchFilter';
      payload: {
        kind: FiltersKind;
        name: string;
      };
    }
  | {
      type: 'switchAllFilters';
      payload: {
        kind: FiltersKind;
        value: boolean;
      };
    }
  | {
      type: 'moveMin';
      payload: number;
    }
  | {
      type: 'moveMax';
      payload: number;
    }
  | {
      type: 'resetFilters';
      payload: FiltersParams;
    };
