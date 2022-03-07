export interface PokemonAbilities {
  ability: {
    name: string;
  };
}

export interface PokemonModel {
  name: string;
  url: string;
  id: number | string;
  img: string;
  abilities: PokemonAbilities[];
  weight: number;
  height: number;
}

export enum ApiStatus {
  LOADING = 'loading',
  LOADED = 'loaded',
}
