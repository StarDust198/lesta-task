import { ChangeEvent } from 'react';

type Props = {
  name: string;
  title: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const FilterOption = ({ name, title, checked, onChange }: Props) => {
  return (
    <div className="flex gap-2 items-center">
      <input type="checkbox" id={name} checked={checked} onChange={onChange} />
      <label htmlFor={name}>{title}</label>
    </div>
  );
};
