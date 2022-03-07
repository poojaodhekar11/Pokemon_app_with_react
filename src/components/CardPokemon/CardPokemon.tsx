import React, { useCallback } from 'react';
import { PokemonModel } from 'store/modules/pokemons/models';
import Skeleton from '@material-ui/lab/Skeleton';
import { formatTextToCapitalize, padDigits } from 'utils/tools';
import './styles.css';

interface CardProps {
  data: PokemonModel;
  loading: string;
}

const CardPokemon = ({ data, loading }:CardProps) => {
  return (
    <div className='cardWrapper'>
    <div className='cardDetails'
      key={data.id}
    >
      <div >
        {loading === 'loading' ? (
          <Skeleton animation="wave" variant="text" width={50} height={25} />
          ) : (
          <span className="pokemon_id"># {data.id && padDigits(data.id)}</span>
        )}

        {loading === 'loading' ? (
          <Skeleton animation="wave" variant="text" width={50} height={25} />
        ) : (
          <>
          <h2 className="Title">{formatTextToCapitalize(data.name)}</h2>
          <p><b>Height:</b> {data.height} </p>
          <p><b>Weight:</b> {data.weight} </p>
          </>
        )}
       </div>
      <div>
        {loading === 'loading' ? (
          <Skeleton animation="wave" variant="text" width={50} height={25} />
        ) : (
          <>{data.img && <img src={data.img} alt={data.name} />}</>
        )}
      </div>
      
      
    </div>
    <div className='abilityBox'>
    { loading != 'loading' ?
      <p>Abilities: </p>  : '' }  
      {data.abilities.map((item:any) => {
        return loading === 'loading' ? (
          <Skeleton
            key={item.ability.name}
            animation="wave"
            variant="rect"
            width={50}
            height={25}
          />
        ) : (
          <label key={item.ability.name}>
            {item.ability.name}
          </label>
        );
      })}
    </div>
    </div>
  );
};

export default React.memo(CardPokemon);
