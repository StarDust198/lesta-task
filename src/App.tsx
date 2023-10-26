import { Container, CardList, Filters, Footer } from './components';
import { useVehicles } from './hooks';
import { Spinner } from './assets';
import { FiltersContextProvider } from './context';

function App() {
  const { vehicles, nations, types, minLevel, maxLevel, loading } =
    useVehicles();

  return (
    <FiltersContextProvider>
      <div className="bg-gradient-to-r from-blue-900 to-sky-900 text-blue-100 min-h-screen py-4">
        <Container>
          {loading ? (
            <div className="flex items-center h-screen">
              <Spinner />
            </div>
          ) : (
            <>
              <Filters
                nations={nations}
                types={types}
                minLevel={minLevel}
                maxLevel={maxLevel}
              />
              <CardList vehicles={vehicles} />
            </>
          )}
        </Container>
      </div>
      <Footer />
    </FiltersContextProvider>
  );
}

export default App;
