export interface Nation {
  name: string;
  title: string;
  color: string;
  icons: {
    small: string;
  };
}

export interface Type {
  name: string;
  title: string;
  icons: {
    default: string;
  };
}

export interface Vehicle {
  id: string;
  title: string;
  level: number;
  description: string;
  type: Type;
  nation: Nation;
  icons: {
    // large: string;
    medium: string;
  };
}
