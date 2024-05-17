'use client';

import React, { useState } from 'react';
import ApiButton from '@/components/ApiButton';

interface TestLogProps {
  logsJson: string;
  isBusy: boolean;
  requestApiCall: (purpose: string, payload?: any) => void;
}

const TestLog: React.FC<TestLogProps> = ({
  logsJson,
  isBusy,
  requestApiCall,
}) => {
  const [name, setName] = useState<string>('');
  const [data, setData] = useState<string>('');

  const handleTestAuth = () => {
    requestApiCall('Test Log', {
      action: 'log',
      log: { name, data },
    });
  };

  return (
    <div className='flex h-full'>
      <div className='w-2/3 p-4 flex flex-col'>
        <input
          type='email'
          placeholder='Event name (e.g.: UserCreated)'
          className='p-2 border rounded mb-3'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className='w-full h-full p-2 border rounded mb-4'
          placeholder='Log data (e.g. User successfully created)'
          value={data}
          onChange={(e) => setData(e.target.value)}
        ></textarea>
        <div className='flex justify-end w-full'>
          <ApiButton
            buttonText='Submit Log'
            isBusy={isBusy}
            onButtonClick={handleTestAuth}
          />
        </div>
      </div>
      <div className='w-1/3 p-4 border-l flex flex-col'>
        <div className='flex justify-between mb-4 w-full'>
          <ApiButton
            buttonText='Refresh Logs'
            isBusy={isBusy}
            onButtonClick={()=>requestApiCall('Refresh Logs')}
          />
          <button className={`px-4 py-2 text-sm bg-red-500 text-white rounded flex items-center 
                  ${
                    isBusy
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-red-700'
                  }`} onClick={()=>requestApiCall('Clean Logs')}>
            {' '}
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
            Clear all logs
          </button>
        </div>

        {/* <pre className='bg-gray-100 p-4 rounded overflow-x-auto flex-grow'>
          {logsJson}
        </pre> */}
        <textarea
          placeholder='Logs JSON'
          className='p-2 border rounded h-48 flex-grow'
          value={logsJson}
          readOnly
        ></textarea>
      </div>
    </div>
  );
};

export default TestLog;
