import { ReactNode } from 'react';
import { Container, Footer } from '.';

type Props = {
  children: ReactNode;
};
export const Layout = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col ">
      <div className="bg-gradient-to-r from-blue-900 to-sky-900 text-blue-100 py-4 flex-grow">
        <Container>{children}</Container>
      </div>
      <Footer />
    </div>
  );
};
