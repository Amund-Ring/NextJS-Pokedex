import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function pokemon({ pokemon }) {
  return (
    <Layout title={pokemon.name}>
      <h1 className='mb-2 text-center text-4xl capitalize text-white drop-shadow-md'>
        {pokemon.name}
      </h1>
      <div className='relative mx-auto w-96 h-96'>
        <Image src={pokemon.image} alt={pokemon.name} layout='fill' />
      </div>
      <p><span className="font-bold mr-2">Weight</span>{pokemon.weight}</p>
      <p><span className="font-bold mr-2">Height</span>{pokemon.height}</p>
      <h2 className="text-2xl mt-6 mb-2">Types</h2>
      {pokemon.types.map((type, index) => (
        <p key={index}>{type.type.name}</p>
      ))}
      <p className="mt-10 text-center">
        <Link href='/'>
          <a className='text-2xl underline'>Home</a>
        </Link></p>
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
