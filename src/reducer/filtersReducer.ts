import { DEFAULT_MAX_STATE, DEFAULT_MIN_STATE } from '../consts';
import {
  FiltersAction,
  FiltersGroup,
  FiltersParams,
  FiltersState,
} from '../interfaces';
import { mapQueryItems } from '../utils';

export const mockState = () => ({
  nations: {},
  types: {},
  min: DEFAULT_MIN_STATE,
  max: DEFAULT_MAX_STATE,
});

export const getDefaultState = ({
  nations,
  types,
  minLevel,
  maxLevel,
}: FiltersParams): FiltersState => {
  return {
    min: minLevel,
    max: maxLevel,
    nations: mapQueryItems(nations, 'nations'),
    types: mapQueryItems(types, 'types'),
  };
};

export const filtersReducer = (state: FiltersState, action: FiltersAction) => {
  switch (action.type) {
    case 'switchFilter': {
      const { kind, name } = action.payload;
      const newFilters = {
        ...state[kind],
        [action.payload.name]: state[kind][name],
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

    case 'moveMin': {
      return {
        ...state,
        min: action.payload,
        max: Math.max(action.payload, state.max),
      };
    }

    case 'moveMax': {
      return {
        ...state,
        max: action.payload,
        min: Math.min(action.payload, state.min),
      };
    }

    case 'resetFilters': {
      return getDefaultState(action.payload);
    }

    default:
      throw new Error('Unknown filters reducer action');
  }
};
