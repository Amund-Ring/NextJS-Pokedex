export default function FilterInput({ setFilterText }) {
  return (
    <form className='group absolute right-8 top-8 w-48'>
      <svg
        width='20'
        height='20'
        fill='currentColor'
        className='pointer-events-none absolute left-3 top-1/2 -mt-2.5 text-slate-400 group-focus-within:text-blue-500'
        aria-hidden='true'
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
        />
      </svg>
      <input
        className='w-full appearance-none rounded-md py-2 pl-10 text-sm leading-6 text-slate-900 placeholder-slate-400 shadow-sm ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
        type='text'
        aria-label='Filter pokemon'
        placeholder='Filter pokemon...'
        onChange={e => {
          setFilterText(e.target.value);
        }}
      />
    </form>
  );
}
