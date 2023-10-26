import { useEffect, useRef, useState } from 'react';
import { Vehicle } from '../interfaces';

type Props = {
  vehicle: Vehicle;
};

export const Card = ({ vehicle }: Props) => {
  const [withButton, setWithButton] = useState(false);
  const [cut, setCut] = useState(true);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Checking if we need 'more' btn for proper description display
    if (!boxRef.current) return;
    setWithButton(boxRef.current.clientHeight < boxRef.current.scrollHeight);
  }, []);

  return (
    <div
      className={`max-w-xs p-4 flex flex-col items-center gap-2 bg-blue-950 rounded shadow-xl`}
    >
      <div className="text-center">
        <h3 className="text-2xl">{vehicle.title}</h3>
        <div className="flex gap-2 justify-center items-center">
          <img
            className="h-6"
            src={vehicle.type.icons.default}
            alt={vehicle.type.title}
          />
          <div>{vehicle.type.title}</div>
        </div>
        <div className="flex gap-2 justify-center items-center">
          <img
            className="h-4"
            src={vehicle.nation.icons.small}
            alt={vehicle.nation.title}
          />
          {/* Inline styles used as temporary solution because 
          TailwindCSS can't use variables in arbitrary params */}
          <div style={{ color: vehicle.nation.color }} className="text-xs">
            {vehicle.nation.title}
          </div>
        </div>
      </div>
      <img className="h-32" src={vehicle.icons.medium} alt={vehicle.title} />
      <div className="text-sm">level {vehicle.level}</div>
      {/* <div className="p-4 text-center bg-gradient-to-r from-blue-900 to-sky-900 rounded shadow"> */}
      <div className="p-4 text-center bg-blue-900 rounded shadow">
        <div ref={boxRef} className={`text-xs ${cut ? 'line-clamp-4' : ''}`}>
          {vehicle.description}
        </div>
        {withButton && (
          <button
            className="text-xs text-sky-300 underline"
            onClick={() => setCut((c) => !c)}
          >
            {cut ? 'more' : 'less'}
          </button>
        )}
      </div>
    </div>
  );
};
