import { useEffect, useRef, useState } from 'react';
import { Nation, Type, Vehicle } from 'interfaces';
import { Card, Container, CardList, Filters } from './components';

// interface Country {
//   name: string;
//   title: string;
// }

function App() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [nations, setNations] = useState<Nation[]>([]);
  const [types, setTypes] = useState<Type[]>([]);
  const [minLevel, setMinLevel] = useState(Infinity);
  const [maxLevel, setMaxLevel] = useState(0);
  const [loading, setLoading] = useState(true);
  const ref = useRef({
    nationNames: new Set<string>(),
    typeNames: new Set<string>(),
    minLevel: Infinity,
    maxLevel: 0,
  });

  useEffect(() => {
    setLoading(true);
    fetch('https://vortex.korabli.su/api/graphql/glossary/', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            vehicles {
              id
              title
              type {
                name
                title
                icons {
                  default
                }
              }
              nation {
                name
                title
                color
                icons {
                  small
                }
              }
              level
              description
              icons {
                medium
              }
            }
          }
      `,
      }),
    })
      .then((response: Response) => response.json())
      .then((result) => {
        result.data.vehicles.forEach((vehicle: Vehicle) => {
          if (!ref.current.nationNames.has(vehicle.nation.name)) {
            ref.current.nationNames.add(vehicle.nation.name);
            setNations((nations) => [...nations, vehicle.nation]);
          }

          if (!ref.current.typeNames.has(vehicle.type.name)) {
            ref.current.typeNames.add(vehicle.type.name);
            setTypes((types) => [...types, vehicle.type]);
          }

          ref.current.maxLevel = Math.max(ref.current.maxLevel, vehicle.level);
          ref.current.minLevel = Math.min(ref.current.minLevel, vehicle.level);
        });

        setMaxLevel(ref.current.maxLevel);
        setMinLevel(ref.current.minLevel);

        return setVehicles(
          result.data.vehicles
            .filter((item: any) => item.level < 2)
            .slice(0, 24)
        );
      })
      .then(() => setLoading(false));
  }, []);

  return (
    <div className="bg-blue-900 text-blue-100 min-h-screen">
      <Container>
        {!loading && (
          <Filters
            nations={nations}
            types={types}
            minLevel={minLevel}
            maxLevel={maxLevel}
          />
        )}
        <CardList>
          {vehicles.map((vehicle) => (
            <Card key={vehicle.id} vehicle={vehicle} />
          ))}
        </CardList>
      </Container>
    </div>
  );
}

export default App;
