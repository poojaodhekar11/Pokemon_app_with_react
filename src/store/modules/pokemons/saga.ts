import { call, takeLatest, put, all, delay } from 'redux-saga/effects';

import api from '../../../services/api';

import { PokeActionTypes } from './actions';
import { PokemonModel } from './models';

export function* getPokes(action: any) {
  const sumOffsetLimit = (action?.payload - 1) * action?.limit;
  try {
    const { data } = yield call(api.get, `/pokemon?limit=${action?.limit}&offset=${sumOffsetLimit}`);
    yield delay(1000);
    let responses: Array<PokemonModel> = yield all(
    data.results.map((item: PokemonModel) => call(api.get, item.url)));
    

    responses = action?.sort ?  responses.sort((a:any, b:any) => a.data[action?.sort] > b.data[action?.sort] ? 1 : -1) : responses;
    const getOnlyData = responses.map((item: any) => ({
      id: item.data.id,
      name: item.data.name,
      img: item.data.sprites.front_default,
      types: item.data.types,
      abilities: item.data.abilities,
      height: item.data.height,
      weight: item.data.weight
    }));
    yield put({
      type: PokeActionTypes.GET_POKE_SUCCESS,
      payload: { pagination: data.count, data: getOnlyData },
    });
  } catch (err) {
    yield put({
      type: PokeActionTypes.GET_POKE_FAILURE,
    });
  }
}

export function* searchPokes(action: any) {
  try {
    const { data } = yield call(api.get, `/pokemon/${action?.payload}`);
    yield delay(1000);
    yield put({
      type: PokeActionTypes.SEARCH_POKE_SUCCESS,
      payload: {
        id: data.id,
        name: data.name,
        img: data.sprites.front_default,
        types: data.types,
        stats: data.data,
        abilities: data.abilities,
      },
    });
  } catch (err) {
    yield put({
      type: PokeActionTypes.SEARCH_POKE_FAILURE,
    });
  }
}


export function* searchPokesByAbility(action: any) {
  try {
    const { data } = yield call(api.get, `/ability/${action?.payload}`);
    yield delay(1000);
    const result: Array<any> = yield all(data.pokemon.map((item:any) => call(api.get, item.pokemon.url)));
    const getSerchedData = result.map((item: any) => ({
      id: item.data.id,
      name: item.data.name,
      types: item.data.types,
      abilities: item.data.abilities,
      height: item.data.height,
      weight: item.data.weight
    }));
    yield put({
      type: PokeActionTypes.SEARCH_POKE_BY_ABILITY_SUCCESS,
      payload: { pagination: data.count, data: getSerchedData },
    });
  } catch (err) {
    yield put({
      type: PokeActionTypes.SEARCH_POKE_BY_ABILITY_FAILURE,
    });
  }
}

export default function* saga() {
  yield takeLatest(PokeActionTypes.GET_POKE, getPokes);
  yield takeLatest(PokeActionTypes.SEARCH_POKE, searchPokes);
  yield takeLatest(PokeActionTypes.SEARCH_POKE_BY_ABILITY, searchPokesByAbility);

}
