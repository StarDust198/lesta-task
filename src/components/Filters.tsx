import { Dispatch } from 'react';
import { BorderedDiv, FilterOption, FilterRange } from '../components';
import { FiltersAction, FiltersParams, FiltersState } from '../interfaces';
import {
  moveMax,
  moveMin,
  resetFilters,
  switchAllFilters,
  switchFilter,
} from '../reducer';

type Props = {
  state: FiltersState;
  dispatch: Dispatch<FiltersAction>;
} & FiltersParams;

export const Filters = ({
  state,
  dispatch,
  nations,
  types,
  minLevel,
  maxLevel,
}: Props) => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <BorderedDiv className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4 before:content-['Nations']">
        <FilterOption
          title="All nations"
          name="nations"
          checked={state.nations.nations}
          onChange={(e) =>
            dispatch(switchAllFilters('nations', e.currentTarget.checked))
          }
        />
        {nations.map((nation) => (
          <FilterOption
            key={nation.name}
            name={nation.name}
            title={nation.title}
            checked={state.nations[nation.name]}
            onChange={() => dispatch(switchFilter('nations', nation.name))}
          />
        ))}
      </BorderedDiv>

      <BorderedDiv className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4 before:content-['Classes']">
        <FilterOption
          title="All types"
          name="types"
          checked={state.types.types}
          onChange={(e) =>
            dispatch(switchAllFilters('types', e.currentTarget.checked))
          }
        />
        {types.map((type) => (
          <FilterOption
            key={type.name}
            name={type.name}
            title={type.title}
            checked={state.types[type.name]}
            onChange={() => dispatch(switchFilter('types', type.name))}
          />
        ))}
      </BorderedDiv>

      <BorderedDiv className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4 before:content-['Levels']">
        <FilterRange
          min={minLevel}
          max={maxLevel}
          onChange={(e) => dispatch(moveMin(+e.currentTarget.value))}
          title={'min'}
          value={state.min}
        />
        <FilterRange
          min={minLevel}
          max={maxLevel}
          onChange={(e) => dispatch(moveMax(+e.currentTarget.value))}
          title={'max'}
          value={state.max}
        />
      </BorderedDiv>

      <button
        className={`border border-blue-200 hover:bg-gradient-to-r hover:from-blue-800
         hover:to-sky-800 hover:border-blue-300 hover:shadow-md p-1 rounded`}
        onClick={() =>
          dispatch(resetFilters({ nations, types, minLevel, maxLevel }))
        }
      >
        Reset Filters
      </button>
    </div>
  );
};
