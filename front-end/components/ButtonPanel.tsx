'use client';
import React from 'react';

const buttonTexts: string[] = [
  'Test broker',
  'Test auth',
  'Test log',
  'Test email',
  'Test gRPC log',
];

interface ButtonPanelProps {
  baseApiUrl: string;
  setResponseMessage: (arg: string) => void;
  setRequestBody: (arg: string) => void;
  setResponseBody: (arg: string) => void;
}

const ButtonPanel: React.FC<ButtonPanelProps> = ({
  baseApiUrl,
  setResponseMessage,
  setRequestBody,
  setResponseBody,
}) => {
  async function sendRequest(buttonText: string) {
    let request: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };
    let apiUrl: string = `${baseApiUrl}`;
    try {
      switch (buttonText) {
        case 'Test broker':
          break;
        case 'Test auth':
          request.body = JSON.stringify({
            action: 'auth',
            auth: { email: 'admin@example.com', password: 'verysecret' },
          });
          apiUrl = `${baseApiUrl}/handle`;
          break;
        case 'Test log':
          request.body = JSON.stringify({
            action: 'log',
            log: { name: 'event', data: 'some event data.' },
          });
          apiUrl = `${baseApiUrl}/handle`;
          break;
        case 'Test email':
          request.body = JSON.stringify({
            action: 'mail',
            mail: {
              from: 'me@example.com',
              to: 'you@there.com',
              subject: 'Test email',
              message: 'Hello world!',
            },
          });
          apiUrl = `${baseApiUrl}/handle`;
          break;
        case 'Test gRPC log':
          break;
        default:
          throw new Error('Unknown button text');
      }
      request;
      setRequestBody(JSON.stringify(request, null, 2));
      const res = await fetch(apiUrl, request);
      const data = await res.json();
      setResponseBody(JSON.stringify(data, null, 2));
      setResponseMessage(data.message);
    } catch (error: any) {
      console.log(error);
      setResponseMessage(error.toString());
    }
  }

  return (
    <div className='space-x-4 mb-4'>
      {buttonTexts.map((text, _idx) => {
        return (
          <button
            key={_idx}
            className='bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded'
            onClick={() => sendRequest(text)}
          >
            {text}
          </button>
        );
      })}
    </div>
  );
};

export default ButtonPanel;
