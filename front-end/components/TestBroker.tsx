import React from 'react';
import ApiButton from '@/components/ApiButton';

interface TestBrokerProps {
  displayText?: string;
  isBusy: boolean;
  requestApiCall: (purpose: string, payload?: any) => void;
}

const TestBroker: React.FC<TestBrokerProps> = ({
  displayText,
  isBusy,
  requestApiCall,
}) => {
  return (
    <div className='flex flex-col items-center justify-center h-full space-y-4'>
      <ApiButton
        buttonText='Click to test broker'
        isBusy={isBusy}
        onButtonClick={() => requestApiCall('Test Broker')}
      />
      <p className='text-center'>{displayText || 'Click to test broker 👆🏻'}</p>
    </div>
  );
};

export default TestBroker;
