import { FiltersAction, FiltersKind, FiltersParams } from '../interfaces';

export const switchAllFilters = (
  kind: FiltersKind,
  val: boolean
): FiltersAction => ({
  type: 'switchAllFilters',
  payload: { kind: kind, value: val },
});

export const switchFilter = (
  kind: FiltersKind,
  filterName: string
): FiltersAction => ({
  type: 'switchFilter',
  payload: { kind, name: filterName },
});

export const moveMin = (val: number): FiltersAction => ({
  type: 'moveMin',
  payload: val,
});

export const moveMax = (val: number): FiltersAction => ({
  type: 'moveMax',
  payload: val,
});

export const resetFilters = (params: FiltersParams): FiltersAction => ({
  type: 'resetFilters',
  payload: params,
});
