import { useEffect, useReducer } from 'react';
import { Container, CardList, Filters, Footer } from './components';
import { useVehicles } from './hooks';
import { filtersReducer, resetFilters } from './reducer';
import { Spinner } from './static/icons';

function App() {
  const { vehicles, nations, types, minLevel, maxLevel, loading } =
    useVehicles();
  const [state, dispatch] = useReducer(filtersReducer, {
    nations: {},
    types: {},
    min: 0,
    max: 100,
  });

  useEffect(() => {
    dispatch(resetFilters({ nations, types, minLevel, maxLevel }));
  }, [loading, nations, types, minLevel, maxLevel]);

  return (
    <>
      <div className="bg-gradient-to-r from-blue-900 to-sky-900 text-blue-100 min-h-screen py-4">
        <Container>
          {loading ? (
            <div className="flex items-center h-screen">
              <Spinner />
            </div>
          ) : (
            <>
              <Filters
                state={state}
                dispatch={dispatch}
                nations={nations}
                types={types}
                minLevel={minLevel}
                maxLevel={maxLevel}
              />
              <CardList vehicles={vehicles} filtersState={state} />
            </>
          )}
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default App;
