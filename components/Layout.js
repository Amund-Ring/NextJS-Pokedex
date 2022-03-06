import Head from 'next/head';

export default function Layout({ title, children }) {
  return (
    <div className='bg-sky-400 pb-6'>
      <Head>
        <title>{title}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='container mx-auto min-h-screen max-w-xl pt-8'>
        {children}
      </main>
    </div>
  );
}
