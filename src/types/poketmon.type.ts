export type Species = {
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
};

export type Type = {
  slot: number;
  type: {
    name: string;
    url: string;
    korean_name?: string;
  };
};
export type Abilities = {
  ability: {
    name: string;
    url: string;
    korean_name?: string;
  };
  is_hidden: boolean;
  slot: number;
};
export type Move = {
  move: {
    name: string;
    url: string;
    korean_name?: string;
  };
};
export type UrlNames = {
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
};

export type Pokemon = {
  id: number;
  name: string;
  korean_name?: string;
  height: number;
  weight: number;
  sprites: { front_default: string };
  types: Type[];
  abilities: Abilities[];
  moves: Move[];
};
