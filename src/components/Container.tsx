import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Container = ({ children }: Props) => {
  return <div className="container mx-auto px-4">{children}</div>;
};
