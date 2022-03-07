import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InitialState } from 'store/combineReducers';
import { PokemonModel } from 'store/modules/pokemons/models';
import { Creators as PokemonActions } from 'store/modules/pokemons/actions';
import './styles.css';
import CardPokemon from 'components/CardPokemon';
import { Grid } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import SearchPokemon from 'components/SearchPokemon';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SearchPokemonByAbility from 'components/SearchPokemonByAbility';

const Home = () => {
  const pokemonsList: Array<PokemonModel> = useSelector<InitialState, PokemonModel[]>(
    (state) => state.pokemons.pokemonList,
  );
  const pagination = useSelector<InitialState, number>(
    (state) => state.pokemons.pages,
  );
  const loading = useSelector<InitialState, string>(
    (state) => state.pokemons.loadingStatus,
  );
  const isSearchFilled = useSelector<InitialState, boolean>(
    (state) => state.pokemons.isSearchFilled,
  );

  const isSearchByAbilityFilled = useSelector<InitialState, boolean>(
    (state) => state.pokemons.isSearchByAbilityFilled,
  );

  const notFoundItems = useSelector<InitialState, string>(
    (state) => state.pokemons.error,
  );

  const [limit, setLimit] = useState(20);
  const [pageNo, setPageNo] = useState(0);
  const [sortName, setSortName] = useState("");

  const dispatch = useDispatch();

  const actionGetPokes = useCallback(() => {
    dispatch(PokemonActions.getPokes(1, limit, sortName));
  }, [dispatch, sortName]);

  useEffect(() => {
    actionGetPokes();
  }, [actionGetPokes]);

  const handlePagination = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPageNo(value);
    dispatch(PokemonActions.getPokes(value, limit, sortName));
  };

  const handleRecords = (e: any) => {
    setLimit(parseInt(e))
    setPageNo(1);
    dispatch(PokemonActions.getPokes(1, parseInt(e), sortName));
  };

  const handleSorting = (e: any) => {
    setSortName(e)
    setPageNo(1);
    dispatch(PokemonActions.getPokes(1, limit, sortName));
  }
  return (
    <>
      <div className='Wrapper'>
        <span className='app_title'>Pokemon Application</span>
        <div className="Container">
          <div className="Header">
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <SearchPokemon limit={limit} sort={sortName} />
              </Grid>
              <Grid item xs={6}>
                <SearchPokemonByAbility limit={limit} sort={sortName} />
              </Grid>
              <Grid item xs={6}>
                <FormControl className="pageSize">
                  <InputLabel htmlFor="page-items">Per page</InputLabel>
                  <Select
                    value={limit}
                    onChange={e => handleRecords(e.target.value)}
                    inputProps={{
                      name: 'perPageItems',
                      id: 'page-items',
                    }}
                  >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} >
                <FormControl className="pageSize">
                  <InputLabel htmlFor="sort-items">Sort By</InputLabel>
                  <Select
                    value={sortName}
                    onChange={e => handleSorting(e.target.value)}
                    inputProps={{
                      name: 'sortItems',
                      id: 'sort-items',
                    }}
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="name">Name</MenuItem>
                    <MenuItem value="height">height</MenuItem>
                    <MenuItem value="weight">Weight</MenuItem>
                  </Select>
                </FormControl>

              </Grid>
            </Grid>
          </div>
          {(!isSearchFilled && !isSearchByAbilityFilled) && (
            <Pagination className="Pagination"
              showFirstButton
              showLastButton
              variant="outlined"
              color="primary"
              count={Math.ceil(pagination / limit)}
              onChange={handlePagination}
              disabled={loading === 'loading'}
              page={pageNo}
            />
          )}
          <div className="Box">
            {pokemonsList.map((data: any) => (
              <CardPokemon key={data.id} data={data} loading={loading} />
            ))}
          </div>
          {notFoundItems && <h2>No items found!!!</h2>}
          {(!isSearchFilled && !isSearchByAbilityFilled) && (
            <Pagination className="Pagination"
              showFirstButton
              showLastButton
              variant="outlined"
              color="primary"
              count={Math.ceil(pagination / limit)}
              onChange={handlePagination}
              disabled={loading === 'loading'}
              page={pageNo}
            />
          )}
        </div>
      </div>

    </>
  );
};

export default Home;
