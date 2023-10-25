import { Nation, Type } from 'interfaces';

export interface FiltersParams {
  nations: Omit<Nation, 'icons' | 'colors'>[];
  types: Omit<Type, 'icons'>[];
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
    };

export const getDefaultState = ({
  nations,
  types,
  minLevel,
  maxLevel,
}: FiltersParams): FiltersState => {
  const nationsState: { [key: string]: boolean } = {
    nations: true,
  };
  const typesState: { [key: string]: boolean } = {
    types: true,
  };

  nations.forEach((nation) => (nationsState[nation.name] = true));
  types.forEach((type) => (typesState[type.name] = true));

  return {
    min: minLevel,
    max: maxLevel,
    nations: nationsState,
    types: typesState,
  };
};

export const filtersReducer = (state: FiltersState, action: FiltersAction) => {
  switch (action.type) {
    case 'switchFilter': {
      const { kind, name } = action.payload;
      const newFilters = {
        ...state[kind],
        [action.payload.name]: !state[kind][name],
      };
      delete newFilters[kind];

      const values = new Set(Object.values(newFilters));
      if (!values.has(false)) {
        newFilters[kind] = true;
      } else {
        newFilters[kind] = false;
      }

      return {
        ...state,
        [kind]: newFilters,
      };
    }

    case 'switchAllFilters': {
      const { kind, value } = action.payload;
      const newFilters: FiltersGroup = {};
      Object.keys(state[kind]).forEach((filter) => {
        newFilters[filter] = value;
      });

      return {
        ...state,
        [kind]: newFilters,
      };
    }

    default:
      throw new Error('Unknown filters reducer action');
  }
};
