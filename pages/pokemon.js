import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineHome } from 'react-icons/ai';
import { useTransition, animated } from 'react-spring';
import { useRouter } from 'next/router';

import Layout from '../components/Layout';

export default function pokemon({ pokemon }) {
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  const transition = useTransition(isVisible, {
    from: { x: -1500, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    leave: { x: 1500, opacity: 0 }
  });

  const slideAndNavigate = () => {
    setIsVisible(v => !v);
    setTimeout(() => {
      router.push('/');
    }, 300);
  };

  return (
    <Layout title={pokemon.name}>
      <div className='invisible absolute top-14 ml-8 w-32 text-center md:visible'>
        {/* <Link href='/'> */}
        <a
          onClick={slideAndNavigate}
          className='flex cursor-pointer items-center justify-center gap-2 text-2xl text-white'
        >
          <AiOutlineHome />
          Home
        </a>
        {/* </Link> */}
      </div>

      {transition((style, item) =>
        item ? (
          <animated.div
            style={style}
            className='item mx-auto max-w-md rounded-[22px] border-[26px] border-amber-300 bg-amber-300 shadow-xl'
          >
            <div className='h-full w-full rounded-[22px] bg-orange-500 p-6'>
              <h1 className='mb-2 text-center text-4xl capitalize text-white drop-shadow-md'>
                {pokemon.name}
              </h1>

              <div className='relative mx-auto aspect-square w-full'>
                <Image src={pokemon.image} alt={pokemon.name} layout='fill' />
              </div>

              <div className='flex justify-center gap-14 pt-3'>
                <p>
                  <span className='mr-2 font-bold'>Weight:</span>
                  {pokemon.weight / 10} kg
                </p>
                <p>
                  <span className='mr-2 font-bold'>Height:</span>
                  {pokemon.height * 10} cm
                </p>
              </div>

              <div className='mb-2 flex justify-center gap-24 pt-6'>
                <div>
                  <h2 className='mb-1 text-xl text-white'>Types:</h2>
                  {pokemon.types.map(({ type }, index) => (
                    <p key={index} className='capitalize'>
                      {type.name}
                    </p>
                  ))}
                </div>
                <div>
                  <h2 className='mb-1 text-xl text-white'>Abilities:</h2>
                  {pokemon.abilities.map(({ ability }, index) => (
                    <p key={index} className='capitalize'>
                      {ability.name}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </animated.div>
        ) : (
          ''
        )
      )}
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const id = query.id;
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = await res.json();
    const paddedIndex = ('00' + id).slice(-3);
    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
    pokemon.image = image;
    return {
      props: { pokemon }
    };
  } catch (error) {
    console.log(error);
  }
}
