import { useDispatch, useSelector } from 'react-redux';
import { addToFavorite, removeFromFavorite } from '../RTK/slice';

export default function FavoriteButton({ pokemonId }) {
  const isFavorite = useSelector((state) => state.favorite.includes(pokemonId));
  const dispatch = useDispatch();

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        dispatch(
          isFavorite
            ? removeFromFavorite({ pokemonId })
            : addToFavorite({ pokemonId })
        );
      }}
      className={isFavorite ? 'text-[red]' : ''}
    >
      {isFavorite ? '♥' : '♡'}
    </button>
  );
}
