import {
  Dispatch,
  ReactNode,
  createContext,
  useEffect,
  useReducer,
} from 'react';
import {
  FiltersAction,
  FiltersState,
  Nation,
  Type,
  Vehicle,
} from '../interfaces';
import { filtersReducer, mockState, resetFilters } from '../reducer';

export type FiltersContextType = {
  state: FiltersState;
  dispatch: Dispatch<FiltersAction>;
  filteredVehicles: Vehicle[];
};

export const FiltersContext = createContext<FiltersContextType>({
  state: mockState(),
  dispatch: () => {},
  filteredVehicles: [],
});

type FiltersContextProviderProps = {
  children: ReactNode;
  vehicles: Vehicle[];
  types: Type[];
  nations: Nation[];
  minLevel: number;
  maxLevel: number;
};

export const FiltersContextProvider = ({
  children,
  vehicles,
  nations,
  types,
  minLevel,
  maxLevel,
}: FiltersContextProviderProps) => {
  const [state, dispatch] = useReducer(filtersReducer, mockState());

  useEffect(() => {
    dispatch(resetFilters({ nations, types, minLevel, maxLevel }));
  }, [nations, types, minLevel, maxLevel, dispatch]);

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      state.nations[vehicle.nation.name] &&
      state.types[vehicle.type.name] &&
      vehicle.level >= state.min &&
      vehicle.level <= state.max
  );

  return (
    <FiltersContext.Provider value={{ state, dispatch, filteredVehicles }}>
      {children}
    </FiltersContext.Provider>
  );
};
