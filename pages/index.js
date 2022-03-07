import Image from 'next/image';
import Link from 'next/link';

import Layout from '../components/Layout';

export default function Home({ pokemons }) {
  return (
    <Layout title='NextJS Pokedex'>
      <h1 className='mb-8 text-center text-4xl text-white drop-shadow-md'>
        NextJS Pokedex
      </h1>
      <div>
        <ul className='mx-auto flex flex-wrap justify-center gap-4'>
          {pokemons.map((pokemon, index) => (
            <li className='w-full max-w-xs' key={index}>
              <Link href={`/pokemon?id=${index + 1}`}>
                <a className='card-bg my-2 flex  select-none items-center rounded-md border-2 border-sky-600 p-4 pl-8 text-lg capitalize'>
                  <div className='relative mr-3 h-20 w-20'>
                    <Image
                      src={pokemon.image}
                      alt={pokemon.name}
                      layout='fill'
                    />
                  </div>
                  <span className='mr-2 font-bold'>{index + 1}. </span>
                  {pokemon.name}
                </a>
              </Link>
            </li>
          ))}
          {/* The following list elements are added so that the last row of the flexbox is left-aligned */}
          <li className='w-full max-w-xs'></li>
          <li className='w-full max-w-xs'></li>
        </ul>
      </div>
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
