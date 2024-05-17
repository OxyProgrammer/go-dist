'use client';
import React, { useState } from 'react';
import ApiButton from '@/components/ApiButton';

interface TestEmailProps {
  emailLink: string;
  isBusy: boolean;
  requestApiCall: (purpose: string, payload?: any) => void;
}

const TestEmail: React.FC<TestEmailProps> = ({
  emailLink,
  isBusy,
  requestApiCall,
}) => {
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const onEmailSentRequested = () => {
    requestApiCall('Test Email', {
      action: 'mail',
      mail: {
        from: from,
        to: to,
        subject: subject,
        message: message,
      },
    });
  };
  return (
    <div className='flex flex-col h-full space-y-4'>
      <div className='flex flex-col space-y-2 flex-grow'>
        <input
          type='email'
          placeholder='From'
          className='p-2 border rounded'
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <input
          type='email'
          placeholder='To'
          className='p-2 border rounded'
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <input
          type='text'
          placeholder='Subject'
          className='p-2 border rounded'
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <textarea
          placeholder='Message'
          className='p-2 border rounded h-48 flex-grow'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
      </div>
      <div className='flex justify-between'>
        <a href={emailLink} target='_blank' className='text-blue-500 underline'>
          Open Email
        </a>

        <ApiButton
          buttonText='Send Email'
          isBusy={isBusy}
          onButtonClick={onEmailSentRequested}
        />
      </div>
    </div>
  );
};

export default TestEmail;
