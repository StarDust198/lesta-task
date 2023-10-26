import { Dispatch, PropsWithChildren, createContext, useReducer } from 'react';
import { FiltersAction, FiltersState } from '../interfaces';
import { filtersReducer, mockState } from '../reducer';

export type FiltersContextType = {
  state: FiltersState;
  dispatch: Dispatch<FiltersAction>;
};

export const FiltersContext = createContext<FiltersContextType>({
  state: mockState(),
  dispatch: () => {},
});

export const FiltersContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(filtersReducer, mockState());

  return (
    <FiltersContext.Provider value={{ state, dispatch }}>
      {children}
    </FiltersContext.Provider>
  );
};
