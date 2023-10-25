import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

export const BorderedDiv = ({ children, className }: Props) => {
  return (
    <div
      className={`border rounded p-2 relative before:text-sm before:absolute
			before:-top-[0.625rem] before:left-2 before:bg-blue-900 before:pl-2
			before:pr-2 border-blue-200 ${className || ''}`}
    >
      {children}
    </div>
  );
};
