export interface Nation {
  name: string;
  icons: {
    small: string;
  };
}

export interface Vehicle {
  title: string;
  typeName: string;
  nation: Nation;
  level: number;
  description: string;
  icons: {
    medium: string;
  };
}
