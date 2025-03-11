export function Error() {
    return (
      <div className='text-center text-red-600 p-4 border border-red-600 rounded-md bg-red-50'>
        <div className='flex items-center justify-center mb-4'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-8 w-8 text-red-600 mr-2'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M12 9v2m0 4h.01M21 12c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8z'
            />
          </svg>
          <h2 className='font-semibold text-lg'>
            Erro ao carregar os repositórios
          </h2>
        </div>
        <p className='text-sm text-gray-700 mb-4'>
          Ocorreu um problema ao tentar carregar os repositórios.
        </p>
      </div>
    );
  }
  