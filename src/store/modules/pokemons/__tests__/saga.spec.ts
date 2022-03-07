import { takeLatest, put } from 'redux-saga/effects';
import { runSaga } from 'redux-saga';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import api from 'services/api';
import { PokeActionTypes, Creators as PokemonsActions } from '../actions';
import saga, { getPokes, searchPokes, searchPokesByAbility } from '../saga';

const gen = saga();
const apiMock = new MockAdapter(api);

let instance: any;
let mock: any;

beforeEach(function () {
  instance = axios.create();
  mock = new MockAdapter(instance);
});

describe('Reducer GET Pokemon', () => {
  it('Should be able to call getPokes saga if call action GET_POKE', () => {
    expect(gen.next().value).toEqual(
      takeLatest(PokeActionTypes.GET_POKE, getPokes),
    );
  }, 3000);

  it('Should be able to fail request', async () => {
    const dispatch = jest.fn();
    const sumOffsetLimit = 2;
    const limit = 20;
    apiMock.onGet(`pokemon?limit=${sumOffsetLimit}&offset=${limit}`).reply(400, ['finalidade']);

    await runSaga({ dispatch }, getPokes).toPromise();

    expect(dispatch).toHaveBeenCalledWith(PokemonsActions.getPokesFailure());
  });
});

describe('Reducer Search Pokemon', () => {
  it('Should be able to call searchPokes saga if call action SEARCH_POKES', () => {
    expect(gen.next().value).toEqual(
      takeLatest(PokeActionTypes.SEARCH_POKE, searchPokes),
    );
  }, 3000);

  // it('Should be able to success request', async () => {
  //   const dispatch = jest.fn();

  //   const action = {
  //     id: 1,
  //     name: 'teste',
  //     sprites: {
  //       front_default: 'url',
  //     },
  //     abilities: [
  //       {
  //         ability: {
  //           name: 'name',
  //         },
  //       },
  //     ],
  //   };

  //   apiMock.onGet('pokemon/2').reply(200, action);

  //   const payloadSaga = {
  //     payload: 2,
  //   };

  //   await runSaga({ dispatch }, searchPokes, payloadSaga).toPromise();

  //   expect(dispatch).toHaveBeenCalledWith(
  //     PokemonsActions.searchPokeSuccess({
  //       id: 2,
  //       name: 'teste',
  //       url: 'url',
  //       img:'url',
  //       abilities: [
  //         {
  //           ability: {
  //             name: 'name',
  //           },
  //         },
  //       ],
  //       height: 7,
  //       weight:69
  //     }),
  //   );
  // });

  it('Should be able to fail request', async () => {
    const dispatch = jest.fn();

    apiMock.onGet('pokemon/2').reply(400, ['finalidade']);

    await runSaga({ dispatch }, searchPokes).toPromise();

    expect(dispatch).toHaveBeenCalledWith(PokemonsActions.searchPokeFailure());
  });
});

describe('Reducer Search Pokemon by ability', () => {
  it('Should be able to call searchPokesByAbility saga if call action SEARCH_POKE_BY_ABILITY', () => {
    expect(gen.next().value).toEqual(
      takeLatest(PokeActionTypes.SEARCH_POKE_BY_ABILITY, searchPokesByAbility),
    );
  }, 3000);

  // it('Should be able to success request', async () => {
  //   const dispatch = jest.fn();
  //   const action = [ {
  //     id: 2,
  //     name: 'test',
  //     sprites: {
  //       front_default: 'url',
  //     },
  //     abilities: [
  //       {
  //         ability: {
  //           name: 'overgrow',
  //         },
  //       },
  //     ],
  //   }];

  //   apiMock.onGet('ability/overgrow').reply(200, action);

  //   const payloadSaga = {
  //     payload: 'overgrow',
  //   };

  //   await runSaga({ dispatch }, searchPokesByAbility, payloadSaga).toPromise();
    
  //   expect(dispatch).toHaveBeenCalledWith(
  //     PokemonsActions.searchPokeByAbilitySuccess(
  //        [{
  //          "abilities": [],
  //          "height": 10,
  //           "id": 2,
  //           "img": "img",
  //           "name": "Pokemon2",
  //           "url": "url",
  //           "weight": 70,
  //         }], 1));
        
  //     });

  it('Should be able to fail request', async () => {
    const dispatch = jest.fn();

    apiMock.onGet('ability/overgrow').reply(400, ['finalidade']);

    await runSaga({ dispatch }, searchPokesByAbility).toPromise();

    expect(dispatch).toHaveBeenCalledWith(PokemonsActions.searchPokeByAbilityFailure());
  });
});