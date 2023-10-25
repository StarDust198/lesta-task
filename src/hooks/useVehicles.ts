import { useEffect, useState } from 'react';
import { Nation, Type, Vehicle } from '../interfaces';

export const useVehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [nations, setNations] = useState<Nation[]>([]);
  const [types, setTypes] = useState<Type[]>([]);
  const [minLevel, setMinLevel] = useState(Infinity);
  const [maxLevel, setMaxLevel] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const nationNames = new Set<string>();
    const typeNames = new Set<string>();
    let minLevel = Infinity;
    let maxLevel = 0;

    setLoading(true);
    setNations([]);
    setTypes([]);
    setMinLevel(Infinity);
    setMaxLevel(0);

    fetch('https://vortex.korabli.su/api/graphql/glossary/', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      signal: controller.signal,
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
          if (!nationNames.has(vehicle.nation.name)) {
            nationNames.add(vehicle.nation.name);
            setNations((nations) => [...nations, vehicle.nation]);
          }

          if (!typeNames.has(vehicle.type.name)) {
            typeNames.add(vehicle.type.name);
            setTypes((types) => [...types, vehicle.type]);
          }

          maxLevel = Math.max(maxLevel, vehicle.level);
          minLevel = Math.min(minLevel, vehicle.level);
        });

        setMaxLevel(maxLevel);
        setMinLevel(minLevel);

        return setVehicles(result.data.vehicles);
      })
      .then(() => setLoading(false));

    return () => controller.abort();
  }, []);

  return {
    vehicles,
    nations,
    types,
    minLevel,
    maxLevel,
    loading,
  };
};
