import { Vehicle } from '../interfaces';
import { Card, Pagination } from '.';
import { useEffect, useState } from 'react';
import { useFiltersContext } from '../hooks';

type Props = {
  vehicles: Vehicle[];
};

export const CardList = ({ vehicles }: Props) => {
  const [page, setPage] = useState(0);
  const { state: filtersState } = useFiltersContext();
  useEffect(() => {
    setPage(0);
  }, [filtersState]);

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      filtersState.nations[vehicle.nation.name] &&
      filtersState.types[vehicle.type.name] &&
      vehicle.level >= filtersState.min &&
      vehicle.level <= filtersState.max
  );
  const totalPages = Math.floor(filteredVehicles.length / 12);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center justify-items-center">
        {filteredVehicles.length ? (
          filteredVehicles
            .slice(page * 12, page * 12 + 12)
            .map((vehicle: Vehicle) => (
              <Card key={vehicle.name} vehicle={vehicle} />
            ))
        ) : (
          <p className="py-4 col-span-full">
            No matches found.. try using different filters
          </p>
        )}
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        setPage={setPage}
      />
    </div>
  );
};
