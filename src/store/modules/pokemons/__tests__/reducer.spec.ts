import pokemonsReducer, { INITIAL_STATE_POKE } from '../reducer';
import { Creators as PokemonActions } from '../actions';
import { ApiStatus } from '../models';

describe('Reducer Pokemon', () => {
  it('GET_POKE', () => {
    const state = pokemonsReducer(INITIAL_STATE_POKE, PokemonActions.getPokes(1, 20, ''));

    expect(state).toStrictEqual({
      ...INITIAL_STATE_POKE,
      loadingStatus: ApiStatus.LOADING,
      isSearchFilled: false,
      error: '',
    });
  });

  it('GET_POKE_SUCCESS', () => {
    const payload = [
      {
        id: 1,
        name: 'Pokemon',
        url: 'url',
        img: 'img',
        abilities: [],
        height: 7,
        weight: 50
      },
    ];

    const state = pokemonsReducer(
      INITIAL_STATE_POKE,
      PokemonActions.getPokesSuccess(payload, 1),
    );

    expect(state).toStrictEqual({
      ...INITIAL_STATE_POKE,
      pokemonList: payload,
      pages: 1,
      loadingStatus: ApiStatus.LOADED,
    });
  });

  it('GET_POKE_FAILURE', () => {
    const state = pokemonsReducer(
      INITIAL_STATE_POKE,
      PokemonActions.getPokesFailure(),
    );

    expect(state).toStrictEqual({
      ...INITIAL_STATE_POKE,
      loadingStatus: ApiStatus.LOADED,
      pokemonList: [],
      error: 'Not Found',
    });
  });

  it('SEARCH_POKE', () => {
    const state = pokemonsReducer(
      INITIAL_STATE_POKE,
      PokemonActions.searchPoke('test'),
    );

    expect(state).toStrictEqual({
      ...INITIAL_STATE_POKE,
      loadingStatus: ApiStatus.LOADING,
      isSearchFilled: true,
      error: '',
    });
  });
  it('SEARCH_POKE', () => {
    const payload = {
      id: 1,
      name: 'Pokemon',
      url: 'url',
      img: 'img',
      abilities: [],
      height: 7,
      weight: 32
    };
    const state = pokemonsReducer(
      INITIAL_STATE_POKE,
      PokemonActions.searchPokeSuccess(payload),
    );

    expect(state).toStrictEqual({
      ...INITIAL_STATE_POKE,
      loadingStatus: ApiStatus.LOADED,
      pokemonList: [payload],
    });
  });

  it('SEARCH_POKE_FAILURE', () => {
    const state = pokemonsReducer(
      INITIAL_STATE_POKE,
      PokemonActions.searchPokeFailure(),
    );

    expect(state).toStrictEqual({
      ...INITIAL_STATE_POKE,
      loadingStatus: ApiStatus.LOADED,
      pokemonList: [],
      error: 'Not Found',
    });
  });

  it('SEARCH_POKE_BY_ABILITY', () => {
    const payload = [{
      id: 1,
      name: 'Pokemon1',
      url: 'url',
      img: 'img',
      abilities: [],
      height: 7,
      weight: 32
    },
    {
      id: 2,
      name: 'Pokemon2',
      url: 'url',
      img: 'img',
      abilities: [],
      height: 10,
      weight: 70
    }];
    const state = pokemonsReducer(
      INITIAL_STATE_POKE,
      PokemonActions.searchPokeByAbilitySuccess(payload, 1),
    );
    expect(state).toStrictEqual({
      ...INITIAL_STATE_POKE,
      pokemonList: payload,
      pages: 1,
      loadingStatus: ApiStatus.LOADED,
    });
  });

  it('SEARCH_POKE_BY_ABILITY_FAILURE', () => {
    const state = pokemonsReducer(
      INITIAL_STATE_POKE,
      PokemonActions.searchPokeByAbilityFailure(),
    );

    expect(state).toStrictEqual({
      ...INITIAL_STATE_POKE,
      loadingStatus: ApiStatus.LOADED,
      pokemonList: [],
      error: 'Not Found',
    });
  });

});
