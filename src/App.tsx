import { useEffect, useState } from 'react';
import { Vehicle } from 'interfaces';
import { Card, Container, CardList } from './components';

function App() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
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
                title
                icons {
                  default
                }
              }
              nation {
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
        console.log(result.data.vehicles);
        setVehicles(
          result.data.vehicles
            // .filter(
            //   (item: any) =>
            //     item.nation.title !== 'Japan' &&
            //     item.nation.title !== 'U.S.A.' &&
            //     item.nation.title !== 'U.S.S.R.' &&
            //     item.nation.title !== 'Germany' &&
            //     item.nation.title !== 'U.K.' &&
            //     item.nation.title !== 'Pan-Asia' &&
            //     item.nation.title !== 'Italy' &&
            //     item.nation.title !== 'Commonwealth' &&
            //     item.nation.title !== 'Pan-America' &&
            //     item.nation.title !== 'Europe' &&
            //     item.nation.title !== 'The Netherlands' &&
            //     item.nation.title !== 'Spain' &&
            //     item.nation.title !== 'France'
            // )
            .slice(0, 24)
        );
      });
  }, []);

  return (
    <div className="bg-sky-700 text-sky-200 min-h-screen">
      <Container>
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
