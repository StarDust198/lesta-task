import { useEffect, useState } from 'react';
import { Vehicle } from 'interfaces';
import { Card, Container } from './components';

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
              title
              typeName
              nation {
                name
                icons {
                  small
                }
              }
              level
              description
              icons {
                medium
                large
              }
            }
          }
      `,
      }),
    })
      .then((response: Response) => response.json())
      .then((result) => {
        console.log(result.data.vehicles);
        setVehicles(result.data.vehicles.slice(0, 20));
      });
  }, []);

  return (
    <Container>
      {vehicles.map((vehicle) => (
        <Card
          key={vehicle.title}
          title={vehicle.title}
          typeName={vehicle.typeName}
          nationName={vehicle.nation.name}
          nationIcon={vehicle.nation.icons.small}
          level={vehicle.level}
          description={vehicle.description}
          icon={vehicle.icons.medium}
        />
      ))}
    </Container>
  );
}

export default App;
