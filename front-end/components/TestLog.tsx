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

  const handleRefreshLogs = () => {
    requestApiCall('Refresh Logs');
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
        <div className='flex justify-start mb-4 w-full'>
          <ApiButton
            buttonText='Refresh Logs'
            isBusy={isBusy}
            onButtonClick={handleRefreshLogs}
          />
        </div>

        {/* <pre className='bg-gray-100 p-4 rounded overflow-x-auto flex-grow'>
          {logsJson}
        </pre> */}
        <textarea
          placeholder='Message'
          className='p-2 border rounded h-48 flex-grow'
          value={logsJson}
          readOnly
        ></textarea>
      </div>
    </div>
  );
};

export default TestLog;
