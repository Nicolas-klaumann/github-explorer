export function NoRepositories() {
    return (
      <div className='text-center text-yellow-600 p-4 border border-yellow-600 rounded-md bg-yellow-50'>
        <div className='flex items-center justify-center mb-4'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-8 w-8 text-yellow-600 mr-2'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M11 7h2v4h-2zm0 6h2v2h-2zm1-11C5.373 2 2 5.373 2 9s3.373 7 7 7 7-3.373 7-7-3.373-7-7-7z'
            />
          </svg>
          <h2 className='font-semibold text-lg'>
            Nenhum repositório encontrado
          </h2>
        </div>
        <p className='text-sm text-gray-700 mb-4'>
          Não foi encontrado nenhum repositório com os critérios especificados.
        </p>
      </div>
    );
  }
  