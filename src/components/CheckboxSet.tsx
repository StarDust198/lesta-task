import { FiltersKind, QueryItem } from '../interfaces';
import { useFiltersContext } from '../hooks';
import { BorderedDiv, FilterOption } from '.';
import { switchAllFilters, switchFilter } from '../reducer';

type Props = {
  className?: string;
  all: string;
  groupName: FiltersKind;
  items: QueryItem[];
};

export const CheckboxSet = ({
  className = '',
  all,
  groupName,
  items,
}: Props) => {
  const { state, dispatch } = useFiltersContext();

  return (
    <BorderedDiv
      className={`grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4 ${className}`}
    >
      <FilterOption
        title={all}
        name={groupName}
        checked={state[groupName][groupName] || false}
        onChange={(e) =>
          dispatch(switchAllFilters(groupName, e.currentTarget.checked))
        }
      />
      {items.map((item) => (
        <FilterOption
          key={item.name}
          name={item.name}
          title={item.title}
          checked={state[groupName][item.name] || false}
          onChange={() => dispatch(switchFilter(groupName, item.name))}
        />
      ))}
    </BorderedDiv>
  );
};
