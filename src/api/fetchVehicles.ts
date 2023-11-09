import { URL, QUERY } from '../consts';
import { Vehicle } from '../interfaces';

export const fetchVehicles = async (): Promise<Vehicle[]> => {
  console.log('FETCHING');

  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      query: QUERY,
    }),
  }).then((response: Response) => response.json());

  return response.data.vehicles;
};
