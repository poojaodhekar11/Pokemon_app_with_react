import React, { useCallback, useState } from 'react';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { Creators as PokemonActions } from 'store/modules/pokemons/actions';
import { TextField } from '@material-ui/core';
const SearchPokemon = (props:any) => {
  const dispatch = useDispatch();
  const [time, setTime] = useState<any>(null);

  const handleSubmitForm = useCallback(
    (value) => {
      if (value) {
        dispatch(PokemonActions.searchPoke(value));
        return;
      }
      dispatch(PokemonActions.getPokes(1, props.limit, props.sortName));
    },
    [dispatch],
  );

  const getAllPokes = useCallback(
    (value) => {
      dispatch(PokemonActions.getPokes(value, props.limit, props.sortName));
    },
    [dispatch],
  );

  const customHandleChange = useCallback(
    (event, change, submit) => {
      change(event);
      // debounce
      if (time) clearTimeout(time);
      setTime(setTimeout(() => submit(), 750));
    },
    [time],
  );

  return (
    <Formik
      initialValues={{ search: '' }}
      onSubmit={(values) => {
        if (!values.search) {
          getAllPokes(1);
          return;
        }
        handleSubmitForm(values.search.toLowerCase());
      }}
    >
      {({
        values,
        handleChange,
        handleSubmit,
        submitForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <div className='searchBox'>
            <TextField
              type="text"
              name="search"
              onChange={(e) => customHandleChange(e, handleChange, submitForm)}
              value={values.search}
              fullWidth
              placeholder="Search pokemon by name and number"
            />
          </div>
        </form>
      )}
    </Formik>
  );
};

export default SearchPokemon;
