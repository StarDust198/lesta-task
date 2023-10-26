import { Chevron, DoubleChevron } from '../assets';

type Props = {
  currentPage: number;
  totalPages: number;
  setPage: (page: number) => void;
};

export const Pagination = ({ currentPage, totalPages, setPage }: Props) => {
  return (
    <div className="flex gap-4 justify-center">
      <button disabled={currentPage === 0} onClick={() => setPage(0)}>
        <DoubleChevron
          className={`w-5 ${currentPage === 0 || 'hover:text-blue-400'}`}
        />
      </button>

      <button
        disabled={currentPage === 0}
        onClick={() => setPage(currentPage - 1)}
      >
        <Chevron
          className={`w-5 ${currentPage === 0 || 'hover:text-blue-400'}`}
        />
      </button>

      {currentPage > 1 && <p>...</p>}

      {currentPage > 0 && (
        <button
          onClick={() => setPage(currentPage - 1)}
          className="hover:text-blue-400"
        >
          {currentPage}
        </button>
      )}

      {currentPage >= 0 && <p className="text-blue-400">{currentPage + 1}</p>}

      {currentPage < totalPages && (
        <button
          onClick={() => setPage(currentPage + 1)}
          className="hover:text-blue-400"
        >
          {currentPage + 2}
        </button>
      )}

      {currentPage < totalPages - 1 && <p>...</p>}

      <button
        disabled={currentPage === totalPages}
        onClick={() => setPage(currentPage + 1)}
      >
        <Chevron
          className={`w-5 rotate-180 ${
            currentPage === totalPages || 'hover:text-blue-400'
          }`}
        />
      </button>

      <button
        disabled={currentPage === totalPages}
        onClick={() => setPage(totalPages)}
      >
        <DoubleChevron
          className={`w-5 rotate-180 ${
            currentPage === totalPages || 'hover:text-blue-400'
          }`}
        />
      </button>
    </div>
  );
};
