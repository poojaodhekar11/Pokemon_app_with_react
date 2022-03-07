import React from "react";
import { render, screen } from '@testing-library/react';
import Home from "components/Home";
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mockListPokemons } from "utils/tools";

describe('With React Testing Library', () => {
    const initialState = { pokemons: {
        loadingStatus: 'Loading',
        pokemonList: mockListPokemons(),
        pages: 0,
        isSearchFilled: false,
        isSearchByAbilityFilled: false,
        error: '',
        abilities: [],
    }};

    const mockStore = configureStore();
    let store;
    it('Shows "Pokemon Application"', () => {
        store = mockStore(initialState);
        const { getByText } = render(
            <Provider store={store}>
                <Home />
            </Provider>
        );

        expect(getByText('Pokemon Application')).not.toBeNull();
    });
});