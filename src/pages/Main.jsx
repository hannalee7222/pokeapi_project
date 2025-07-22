import { useSelector } from 'react-redux';
import { Card } from '../component/Card';
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';

function TopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = debounce(() => {
      setShow(window.scrollY > 300);
    }, 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!show) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-[30px] right-[15px] bg-black text-white px-4 py-2 rounded-full shadow-md hover:bg-gray-800 z-50"
    >
      TOP
    </button>
  );
}

export default function Main() {
  const pokemonData = useSelector((state) => state.pokemon.data);

  return (
    <>
      {pokemonData.map((el) => (
        <Card key={el.id} pokemon={el} />
      ))}
      <TopButton />
    </>
  );
}
