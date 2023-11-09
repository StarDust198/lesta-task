import { useEffect, useState } from 'react';
import { Nation, Type, Vehicle } from '../interfaces';
import { fetchVehicles } from '../api';

type VehiclesState = {
  vehicles: Vehicle[];
  nations: Nation[];
  types: Type[];
  minLevel: number;
  maxLevel: number;
};

export const useVehicles = () => {
  const [loading, setLoading] = useState(true);

  const [vehiclesState, setVehiclesState] = useState<VehiclesState>({
    vehicles: [],
    nations: [],
    types: [],
    minLevel: Infinity,
    maxLevel: 0,
  });

  useEffect(() => {
    let ignore = false;

    const nationNames = new Set<string>();
    const typeNames = new Set<string>();
    const nations: Nation[] = [];
    const types: Type[] = [];
    let minLevel = Infinity;
    let maxLevel = 0;

    setLoading(true);
    fetchVehicles().then((vehicles) => {
      if (ignore) return;

      vehicles.forEach((vehicle) => {
        if (!nationNames.has(vehicle.nation.name)) {
          nationNames.add(vehicle.nation.name);
          nations.push(vehicle.nation);
        }

        if (!typeNames.has(vehicle.type.name)) {
          typeNames.add(vehicle.type.name);
          types.push(vehicle.type);
        }

        maxLevel = Math.max(maxLevel, vehicle.level);
        minLevel = Math.min(minLevel, vehicle.level);
      });

      setVehiclesState({
        vehicles,
        nations,
        types,
        minLevel,
        maxLevel,
      });
      setLoading(false);
    });

    return () => {
      ignore = true;
    };
  }, []);

  return {
    ...vehiclesState,
    loading,
  };
};
