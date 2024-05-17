
interface ApiButtonProps {
  buttonText: string;
  isBusy: boolean;
  onButtonClick: () => void;
}

const ApiButton: React.FC<ApiButtonProps> = ({
  buttonText,
  isBusy,
  onButtonClick,
}) => {
  return (
    <button
      onClick={onButtonClick}
      disabled={isBusy}
      className={`px-4 py-2 text-sm bg-blue-500 text-white rounded flex items-center 
                  ${
                    isBusy
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-blue-700'
                  }`}
    >
      {isBusy && (
        <svg
          className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
        >
          <circle
            className='opacity-25'
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            strokeWidth='4'
          ></circle>
          <path
            className='opacity-75'
            fill='currentColor'
            d='M4 12a8 8 0 018-8v8z'
          ></path>
        </svg>
      )}
      {buttonText}
    </button>
  );
};

export default ApiButton;
