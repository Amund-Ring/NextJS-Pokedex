import Head from 'next/head';

export default function Layout({ title, children }) {
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className='bg-sky-400'>
      <Head>
        <title>{capitalize(title)}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='container mx-auto min-h-screen min-w-full p-4 pt-8'>
        <h1 className='mb-10 mt-6 text-center text-4xl text-white drop-shadow-md'>
          NextJS Pokedex
        </h1>
        {children}
      </main>
    </div>
  );
}
