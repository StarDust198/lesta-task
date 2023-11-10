import { Vehicle } from '../interfaces';
import { Card, Pagination } from '.';
import { useEffect, useState } from 'react';
import { useFiltersContext } from '../hooks';

export const CardList = () => {
  const [page, setPage] = useState(0);
  const { filteredVehicles } = useFiltersContext();
  const totalPages = Math.floor(filteredVehicles.length / 12);

  useEffect(() => {
    if (totalPages < page) setPage(totalPages);
  }, [totalPages, page]);

  console.log('list render', totalPages, page, filteredVehicles);

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
