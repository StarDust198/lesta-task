import { CardList, Filters, Layout, Loader } from './components';
import { useVehicles } from './hooks';
import { FiltersContextProvider } from './context';

function App() {
  const { vehicles, nations, types, minLevel, maxLevel, loading } =
    useVehicles();

  return (
    <FiltersContextProvider
      {...{ vehicles, nations, types, minLevel, maxLevel }}
    >
      <Layout>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Filters
              nations={nations}
              types={types}
              minLevel={minLevel}
              maxLevel={maxLevel}
            />
            <CardList />
          </>
        )}
      </Layout>
    </FiltersContextProvider>
  );
}

export default App;
