import { combineReducers } from 'redux';
import pokemonsReducer, {
  PokemonState,
  INITIAL_STATE_POKE,
} from './modules/pokemons/reducer';

export interface InitialState {
  pokemons: PokemonState;
}

export const initialState: InitialState = {
  pokemons: INITIAL_STATE_POKE,
};

export default combineReducers({
  pokemons: pokemonsReducer,
});
