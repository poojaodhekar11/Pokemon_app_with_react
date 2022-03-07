import produce from 'immer';
import { ApiStatus, PokemonModel, PokemonAbilities } from './models';
import { PokemonAction, PokeActionTypes } from './actions';
import { mockListPokemons } from '../../../utils/tools';

export interface PokemonState {
  loadingStatus: ApiStatus;
  pokemonList: PokemonModel[];
  pages: number;
  isSearchFilled: boolean;
  isSearchByAbilityFilled: boolean;
  error: string;
  abilities: PokemonAbilities[];
}

export const INITIAL_STATE_POKE: PokemonState = {
  loadingStatus: ApiStatus.LOADING,
  pokemonList: mockListPokemons(),
  pages: 0,
  isSearchFilled: false,
  isSearchByAbilityFilled: false,
  error: '',
  abilities: [],
};

export default function pokemonsReducer(
  state: PokemonState = INITIAL_STATE_POKE,
  action: PokemonAction,
) {
  return produce(state, (draft) => {
    
    switch (action.type) {
      case PokeActionTypes.GET_POKE:
        draft.loadingStatus = ApiStatus.LOADING;
        draft.isSearchFilled = false;
        draft.isSearchByAbilityFilled = false;
        draft.error = '';
        break;
      case PokeActionTypes.GET_POKE_SUCCESS:
        draft.pokemonList = action.payload.data;
        draft.pages = action.payload.pagination;
        draft.loadingStatus = ApiStatus.LOADED;
        break;
      case PokeActionTypes.GET_POKE_FAILURE:
        draft.loadingStatus = ApiStatus.LOADED;
        draft.pokemonList = [];
        draft.error = 'Not Found';
        break;

        case PokeActionTypes.SEARCH_POKE:
          draft.loadingStatus = ApiStatus.LOADING;
          draft.isSearchFilled = !!action.payload;
          draft.isSearchByAbilityFilled = false;
          draft.error = '';
          break;
  
        case PokeActionTypes.SEARCH_POKE_SUCCESS:
          draft.loadingStatus = ApiStatus.LOADED;
          draft.pokemonList = [];
          draft.pokemonList.push(action.payload);
          break;
  
        case PokeActionTypes.SEARCH_POKE_FAILURE:
          draft.loadingStatus = ApiStatus.LOADED;
          draft.pokemonList = [];
          draft.error = 'Not Found';
          break;

      case PokeActionTypes.SEARCH_POKE_BY_ABILITY:
        draft.loadingStatus = ApiStatus.LOADING;
        draft.isSearchByAbilityFilled = !!action.payload;
        draft.isSearchFilled = false;
        draft.error = '';
        break;

      case PokeActionTypes.SEARCH_POKE_BY_ABILITY_SUCCESS:
        draft.pokemonList = action.payload.data;
        draft.pages = action.payload.pagination;
        draft.loadingStatus = ApiStatus.LOADED;
        break;

      case PokeActionTypes.SEARCH_POKE_BY_ABILITY_FAILURE:
        draft.loadingStatus = ApiStatus.LOADED;
        draft.pokemonList = [];
        draft.error = 'Not Found';
        break;
     
      default:
    }
  });
}
