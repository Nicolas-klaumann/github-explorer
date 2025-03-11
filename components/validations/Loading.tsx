export function Loading() {
    return (
      <div className='text-center flex items-center justify-center'>
        <div
          className='spinner-border animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent rounded-full'
          role='status'
        >
          <span className='sr-only'>Carregando...</span>
        </div>
      </div>
    );
  }
  