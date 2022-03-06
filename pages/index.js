import Image from 'next/image';
import Link from 'next/link';

import Layout from '../components/Layout';

export default function Home({ pokemons }) {
  return (
    <Layout title='NextJS Pokedex'>
      <h1 className='mb-8 text-center text-4xl text-white drop-shadow-md'>
        NextJS Pokedex
      </h1>
      <ul>
        {pokemons.map((pokemon, index) => (
          <li key={index}>
            <Link href={`/pokemon?id=${index + 1}`}>
              <a className='border-sky-600 my-2 flex items-center rounded-md border-2 bg-gray-200 p-4 text-lg capitalize hover:bg-amber-100'>
                <img
                  className='mr-3 h-20 w-20'
                  src={pokemon.image}
                  alt={pokemon.name}
                />
                <span>{index + 1}. </span>
                {pokemon.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticProps(context) {
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
    const { results } = await res.json();
    const pokemons = results.map((result, index) => {
      const paddedIndex = '00'.concat(index + 1).slice(-3);
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
      return {
        ...result,
        image
      };
    });
    return {
      props: { pokemons }
    };
  } catch (error) {
    console.log(error);
  }
}
