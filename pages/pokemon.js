import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function pokemon({ pokemon }) {
  return (
    <Layout title={pokemon.name}>
      <div className='rounded-[22px] border-[26px] border-amber-300 bg-amber-300 shadow-xl max-w-xl mx-auto'>
        <div className='h-full w-full rounded-[22px] bg-orange-500 p-4'>
          <h1 className='mb-2 text-center text-4xl capitalize text-white drop-shadow-md'>
            {pokemon.name}
          </h1>
          <div className='relative mx-auto aspect-square w-full border-2 border-green-400'>
            <Image src={pokemon.image} alt={pokemon.name} layout='fill' />
          </div>

          <div className='border-2 flex justify-around'>
            <p>
              <span className='mr-2 font-bold'>Weight:</span>
              {pokemon.weight/10} kg
            </p>

            <p>
              <span className='mr-2 font-bold'>Height:</span>
              {pokemon.height*10} cm
            </p>
          </div>

          <h2 className='mt-6 mb-2 text-2xl'>Types</h2>
          {pokemon.types.map(({ type }, index) => (
            <p key={index}>{type.name}</p>
          ))}
          <h2 className='mt-6 mb-2 text-2xl'>Abilities</h2>
          {pokemon.abilities.map(({ ability }, index) => (
            <p key={index}>{ability.name}</p>
          ))}
        </div>
      </div>
      <p className='mt-10 text-center'>
        <Link href='/'>
          <a className='text-2xl underline'>Home</a>
        </Link>
      </p>
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
