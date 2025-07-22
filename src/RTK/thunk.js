import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMultiplePokemonById = createAsyncThunk(
  'pokemon/fetchMultiplePokemonById',
  async (maxPokemonId) => {
    const numberArray = Array.from({ length: maxPokemonId }, (_, i) => i + 1);

    const fetchAPI = async (pokemonId) => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`
        );
        if (!response.ok) throw new Error(`Error with ID ${pokemonId}`);
        const data = await response.json();

        return {
          id: pokemonId,
          name: data.names.find((el) => el.language.name === 'ko').name,
          description: data.flavor_text_entries.find(
            (el) => el.language.name === 'ko'
          ).flavor_text,
          front: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`,
          back: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemonId}.png`,
        };
      } catch (err) {
        console.error(`포켓몬 ID ${pokemonId} 불러오기 실패`, err);
        return null;
      }
    };

    return await Promise.all(numberArray.map((el) => fetchAPI(el))).then(
      (results) => results.filter(Boolean)
    );
  }
);
