export interface Group {
  name: string;
  title: string;
}

export interface Nation extends Group {
  color: string;
  icons: {
    small: string;
  };
}

export interface Type extends Group {
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
