import { ChangeEvent } from 'react';

type Props = {
  min: number;
  max: number;
  title: string;
  value: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const FilterRange = ({
  min,
  max,
  title,
  value,
  onChange,
  ...restProps
}: Props) => {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor={title}>{title}</label>
      <input
        type="range"
        name={title}
        id={title}
        min={min}
        max={max}
        onChange={onChange}
        value={value}
        {...restProps}
      />
      <span>{value}</span>
    </div>
  );
};
