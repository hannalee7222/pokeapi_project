import { useSelector } from 'react-redux';
import { selectFavoritePokemons } from '../RTK/selector';
import { Card } from '../component/Card';

export default function Favorite() {
  const pokemon = useSelector(selectFavoritePokemons);

  if (pokemon.length === 0) {
    return (
      <div className="w-full text-center text-[18px] py-[20px] text-gray-600">
        <span className="text-[red]">♥</span>
        찜한 포켓몬이 없습니다.
      </div>
    );
  }

  return (
    <>
      {pokemon.map((el) => (
        <Card key={el.id} pokemon={el} />
      ))}
    </>
  );
}
