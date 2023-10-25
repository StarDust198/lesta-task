import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const CardList = ({ children }: Props) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center justify-items-center">
      {children}
    </div>
  );
};
