import { useContext } from 'react';
import { FiltersContext } from '../context';

export const useFiltersContext = () => useContext(FiltersContext);
