const fetchRandomPokemon = async (generation) => {
  try {
    // Fetch the list of Pokémon for the given generation
    const response = await fetch(`https://pokeapi.co/api/v2/generation/${generation}/`);
    const data = await response.json();

    // Get the list of Pokémon from the generation
    const pokemonList = data.pokemon_species;

    // Select a random Pokémon from the list
    const randomIndex = Math.floor(Math.random() * pokemonList.length);
    const randomPokemon = pokemonList[randomIndex];

    // Fetch detailed data of the selected Pokémon
    const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemon.name}`);
    const pokemonData = await pokemonResponse.json();

    return {
      name: pokemonData.name,
      sprite: pokemonData.sprites.other.dream_world.front_default,
      sound: pokemonData.cries.latest,
    };

  } catch (error) {
    console.error('Error fetching random Pokémon:', error);
  }
};

export default fetchRandomPokemon;