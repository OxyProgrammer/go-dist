'use client';
import ButtonPanel from '@/components/ButtonPanel';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const environment = process.env.NODE_ENV;
  let baseApiUrl: string = '';
  if (environment === 'production') {
    baseApiUrl = 'http://localhost:8080';
  } else {
    baseApiUrl = 'http://localhost:8080';
  }
  console.log(baseApiUrl);

  const [sentText, setSentText] = useState('');
  const [receivedText, setReceivedText] = useState('');
  const [outputText, setOutputText] = useState('');

  return (
    <div className='flex flex-col h-screen'>
      {/* HEADER */}
      <header className='bg-gray-800 text-white py-4 px-8 flex items-center justify-between'>
        <div>
          <Image
            src='./logo.svg'
            alt='Logo'
            height={0}
            width={0}
            style={{ width: 'auto', height: '30px' }}
          />
        </div>
        <div className='space-x-4'>
          <a href='#' className='text-white'>
            Home
          </a>
          <a href='#' className='text-white'>
            Login
          </a>
        </div>
      </header>

      {/* Body */}
      <main className='flex-grow p-8'>
        <ButtonPanel baseApiUrl={baseApiUrl} />
        <textarea
          className='w-full p-4 border border-gray-300 rounded-md resize-none'
          placeholder='Response message shows here'
          rows={4}
          value={outputText}
          onChange={(e) => setOutputText(e.target.value)}
        />
        <div className='flex space-x-4 mt-4'>
          <div className='w-1/2'>
            <h2 className='font-bold text-2xl'>Sent</h2>
            <textarea
              className='w-full p-4 border border-gray-300 rounded-md resize-none'
              rows={4}
              placeholder='Sent'
              value={sentText}
              onChange={(e) => setSentText(e.target.value)}
            />
          </div>
          <div className='w-1/2'>
            <h2 className='font-bold text-2xl'>Received</h2>
            <textarea
              className='w-full p-4 border border-gray-300 rounded-md resize-none'
              rows={4}
              placeholder='Received'
              value={receivedText}
              onChange={(e) => setReceivedText(e.target.value)}
            />
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className='bg-gray-800 text-white py-4 px-8 text-center'>
        &copy; 2024 Go Kube. All rights reserved.
      </footer>
    </div>
  );
}
