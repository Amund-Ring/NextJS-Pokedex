import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTransition, animated } from 'react-spring';
import { useRouter } from 'next/router';


import Layout from '../components/Layout';

export default function Home({ pokemons }) {
  const [linkList, setLinkList] = useState(pokemons);
  const router = useRouter();

  const transition = useTransition(linkList, {
    from: { x: 1500, y: 1500, opacity: 0 },
    enter: (pokemon) => (next) => (
      next({ x: 0, y: 0, opacity: 1, delay: pokemon.index * 20 })
    ),
    leave: (pokemon) => (next) => (
      next({ x: -1500, opacity: 0, delay: pokemon.index * 5 })
    ),
  });

  const slideAndNavigate = (index) => {
    setLinkList([]);
    setTimeout(() => {
      router.push(`/pokemon?id=${index+1}`)
    }, 300);
  };

  return (
    <Layout title='NextJS Pokedex'>
      <div>
      <ul className='mx-auto flex flex-wrap justify-center gap-4'>

      {transition((style, pokemon) =>{
        return (
        pokemon ? (
          <animated.div style={style} className='pokemon w-full max-w-xs'>
              <li
              className='duration-300 hover:scale-105 hover:transform'
              key={pokemon.index}
            >
              {/* <Link href={`/pokemon?id=${pokemon.index + 1}`}> */}
                <a
                  onClick={() => slideAndNavigate(pokemon.index)}
                  className='card-bg my-2 flex  select-none items-center rounded-md border-2 border-sky-600 p-4 pl-8 text-lg capitalize'>
                  <div className='relative mr-3 h-20 w-20'>
                    <Image
                      src={pokemon.image}
                      alt={pokemon.name}
                      layout='fill'
                    />
                  </div>
                  <span className='mr-2 font-bold'>{pokemon.index + 1}. </span>
                  {pokemon.name}
                </a>
              {/* </Link> */}
            </li>

          </animated.div>
        ) : (
          ''
        ))
      }
      )}

      

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
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=200');
    const { results } = await res.json();
    const pokemons = results.map((result, index) => {
      const paddedIndex = '00'.concat(index + 1).slice(-3);
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
      return {
        ...result,
        image,
        index
      };
    });
    return {
      props: { pokemons }
    };
  } catch (error) {
    console.log(error);
  }
}
