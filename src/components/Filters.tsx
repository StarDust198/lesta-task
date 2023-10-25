import { useEffect, useReducer, useState } from 'react';
import { BorderedDiv, FilterOption, FilterRange } from '../components';
import { Nation, Type } from 'interfaces';
import { filtersReducer, getDefaultState } from '../reducer';

type Props = {
  nations: Nation[];
  types: Type[];
  minLevel: number;
  maxLevel: number;
};

export const Filters = ({ nations, types, minLevel, maxLevel }: Props) => {
  const [min, setMin] = useState(minLevel);
  const [max, setMax] = useState(maxLevel);

  const [state, dispatch] = useReducer(
    filtersReducer,
    getDefaultState({ nations, types, minLevel, maxLevel })
  );

  useEffect(() => {
    setMin(minLevel);
    setMax(maxLevel);
  }, [minLevel, maxLevel]);

  return (
    <div className="flex flex-col gap-4 p-4">
      <BorderedDiv className="grid grid-cols-2 px-4 before:content-['Nations']">
        <FilterOption
          title="All nations"
          name="nations"
          checked={state.nations.nations}
          onChange={(e) =>
            dispatch({
              type: 'switchAllFilters',
              payload: { kind: 'nations', value: e.currentTarget.checked },
            })
          }
        />
        {nations.map((nation) => (
          <FilterOption
            key={nation.name}
            name={nation.name}
            title={nation.title}
            checked={state.nations[nation.name]}
            onChange={() =>
              dispatch({
                type: 'switchFilter',
                payload: { kind: 'nations', name: nation.name },
              })
            }
          />
        ))}
      </BorderedDiv>

      <BorderedDiv className="grid grid-cols-2 px-4 before:content-['Classes']">
        <FilterOption title="All types" name="types" />
        {types.map((type) => (
          <FilterOption key={type.name} name={type.name} title={type.title} />
        ))}
      </BorderedDiv>

      <BorderedDiv className="grid grid-cols-2 px-4 before:content-['Levels']">
        <FilterRange
          min={minLevel}
          max={maxLevel}
          onChange={(e) => setMin(+e.currentTarget.value)}
          title={'min'}
          value={min}
        />
        <FilterRange
          min={minLevel}
          max={maxLevel}
          onChange={(e) => setMax(+e.currentTarget.value)}
          title={'max'}
          value={max}
        />
      </BorderedDiv>

      <button className="border border-blue-200 hover:bg-blue-800 hover:shadow-md p-1 rounded">
        Reset Filters
      </button>
    </div>
  );
};
