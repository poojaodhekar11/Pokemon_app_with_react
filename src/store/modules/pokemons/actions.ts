import { PokemonModel } from './models';

export enum PokeActionTypes {
  GET_POKE = 'pokemon/GET_POKE',
  GET_POKE_SUCCESS = 'pokemon/GET_POKE_SUCCESS',
  GET_POKE_FAILURE = 'pokemon/GET_POKE_FAILURE',

  SEARCH_POKE = 'pokemon/SEARCH_POKE',
  SEARCH_POKE_SUCCESS = 'pokemon/SEARCH_POKE_SUCCESS',
  SEARCH_POKE_FAILURE = 'pokemon/SEARCH_POKE_FAILURE',

  SEARCH_POKE_BY_ABILITY = 'pokemon/SEARCH_POKE_BY_ABILITY',
  SEARCH_POKE_BY_ABILITY_SUCCESS = 'pokemon/SEARCH_POKE_BY_ABILITY_SUCCESS',
  SEARCH_POKE_BY_ABILITY_FAILURE = 'pokemon/SEARCH_POKE_BY_ABILITY_FAILURE',


  GET_POKE_INF = 'pokemon/GET_POKE_INF',
}

interface IGetPoke {
  type: PokeActionTypes.GET_POKE;
  payload: number;
  limit: number;
  sort: string;
}

interface IGetPokeSuccess {
  type: PokeActionTypes.GET_POKE_SUCCESS;
  payload: {
    data: PokemonModel[];
    pagination: number;
  };
}

interface IGetPokeFailure {
  type: PokeActionTypes.GET_POKE_FAILURE;
}

interface ISearchPoke {
  type: PokeActionTypes.SEARCH_POKE;
  payload: string;
}

interface ISearchPokeSuccess {
  type: PokeActionTypes.SEARCH_POKE_SUCCESS;
  payload: PokemonModel;
}
interface ISearchPokeFailure {
  type: PokeActionTypes.SEARCH_POKE_FAILURE;
}

interface ISearchPokeByAbility {
  type: PokeActionTypes.SEARCH_POKE_BY_ABILITY;
  payload: string;
}

interface ISearchPokeByAbilitySuccess {
  type: PokeActionTypes.SEARCH_POKE_BY_ABILITY_SUCCESS;
  payload: {
    data: PokemonModel[];
    pagination: number;
  };
}

interface ISearchPokeByAbilityFailure {
  type: PokeActionTypes.SEARCH_POKE_BY_ABILITY_FAILURE;
}

interface IGetPokeInf {
  type: PokeActionTypes.GET_POKE_INF;
  payload: {
    id: number | string;
  };
}

export const Creators = {
  getPokes(value: number, limit: number, sort: string ): IGetPoke {
    return {
      type: PokeActionTypes.GET_POKE,
      limit:limit,
      sort:sort,
      payload: value,
    };
  },
  getPokesSuccess(data: PokemonModel[], pagination: number): IGetPokeSuccess {
    return {
      type: PokeActionTypes.GET_POKE_SUCCESS,
      payload: { data, pagination },
    };
  },
  getPokesFailure(): IGetPokeFailure {
    return {
      type: PokeActionTypes.GET_POKE_FAILURE,
    };
  },
  searchPoke(data: string): ISearchPoke {
    return {
      type: PokeActionTypes.SEARCH_POKE,
      payload: data,
    };
  },
  searchPokeSuccess(data: PokemonModel): ISearchPokeSuccess {
    return {
      type: PokeActionTypes.SEARCH_POKE_SUCCESS,
      payload: data,
    };
  },
  searchPokeFailure(): ISearchPokeFailure {
    return {
      type: PokeActionTypes.SEARCH_POKE_FAILURE,
    };
  },
  searchPokeByAbility(data: string): ISearchPokeByAbility {
    
    return {
      type: PokeActionTypes.SEARCH_POKE_BY_ABILITY,
      payload: data,
    };
  },
  searchPokeByAbilitySuccess(data: PokemonModel[], pagination: number): ISearchPokeByAbilitySuccess {
    
    return {
      type: PokeActionTypes.SEARCH_POKE_BY_ABILITY_SUCCESS,
      payload: { data, pagination },
    };
  },
  searchPokeByAbilityFailure(): ISearchPokeByAbilityFailure {
    return {
      type: PokeActionTypes.SEARCH_POKE_BY_ABILITY_FAILURE,
    };
  },
  getInfPoke(id: number | string): IGetPokeInf {
    return {
      type: PokeActionTypes.GET_POKE_INF,
      payload: { id },
    };
  },
};

export type PokemonAction =
  | IGetPoke
  | IGetPokeSuccess
  | IGetPokeFailure
  | ISearchPokeSuccess
  | ISearchPoke
  | ISearchPokeFailure
  | ISearchPokeByAbilitySuccess
  | ISearchPokeByAbility
  | ISearchPokeByAbilityFailure
  | IGetPokeInf;
