export interface QueryItem {
  name: string;
  title: string;
}

export interface Nation extends QueryItem {
  color: string;
  icons: {
    small: string;
  };
}

export interface Type extends QueryItem {
  icons: {
    default: string;
  };
}

export interface Vehicle extends QueryItem {
  level: number;
  description: string;
  type: Type;
  nation: Nation;
  icons: {
    // large: string;
    medium: string;
  };
}
