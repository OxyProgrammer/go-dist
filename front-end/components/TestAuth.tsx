'iuse client';
import React, { useState } from 'react';
import ApiButton from '@/components/ApiButton';

interface TestAuthProps {
  isBusy: boolean;
  isSuccess: boolean;
  requestApiCall: (purpose: string, payload?: any) => void;
}

const TestAuth: React.FC<TestAuthProps> = ({
  isBusy,
  isSuccess,
  requestApiCall,
}) => {
  const handleTestAuth = () => {
    requestApiCall('Test Auth', {
      action: 'auth',
      auth: { email, password },
    });
  };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className='flex flex-col items-center justify-center h-full bg-gray-100'>
      <div className='flex flex-col items-center'>
        <div className='flex flex-col items-start mb-4'>
          <label htmlFor='email'>Email:</label>
          <input
            id='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter email (admin@example.com)'
            className='p-2 border rounded w-64 text-sm'
          />
        </div>
        <div className='flex flex-col items-start mb-4'>
          <label htmlFor='password'>Password:</label>
          <input
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter password (verysecret)'
            className='p-2 border rounded w-64 text-sm'
          />
        </div>
        <div className='flex justify-between items-center w-64'>
          <span className={`text-${isSuccess ? 'green' : 'red'}-500`}>
            {`${isSuccess ? 'Success' : 'Failed'}`}
          </span>
          {/* <button className='px-4 py-2 bg-blue-500 text-white rounded'>
            Login
          </button> */}
          <ApiButton
            buttonText='Test Auth'
            isBusy={isBusy}
            onButtonClick={handleTestAuth}
          />
        </div>
       
      </div>
    </div>
  );
};

export default TestAuth;
