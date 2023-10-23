import { Vehicle } from 'interfaces';

type Props = {
  vehicle: Vehicle;
};

export const Card = ({ vehicle }: Props) => {
  return (
    <div className="max-w-xs p-4 flex flex-col items-center gap-2 bg-sky-900 rounded shadow-lg">
      <div>
        <h3 className="text-xl text-center">{vehicle.title}</h3>
        <div className="mt-1 flex gap-2 justify-center items-center">
          <img
            className="h-4"
            src={vehicle.nation.icons.small}
            alt={vehicle.nation.title}
          />
          <div className={`text-xs text-[${vehicle.nation.color}]`}>
            {vehicle.nation.title}
          </div>
        </div>
      </div>
      <div className="text-sm">
        {vehicle.type.title}, level: {vehicle.level}
      </div>
      <img className="h-32" src={vehicle.icons.medium} alt={vehicle.title} />
      <div className="p-4 text-center bg-sky-800 rounded shadow">
        <div className="text-xs line-clamp-4">{vehicle.description}</div>
      </div>
    </div>
  );
};
