'use client';
import React from 'react';

interface ButtonPanelProps {
  baseApiUrl: string;
}

const ButtonPanel: React.FC<ButtonPanelProps> = ({ baseApiUrl }) => {


  async function sendRequest() {   
    try {
      const requestOptions: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'value' }), // Replace 'key' and 'value' with your actual data
      };

      const res = await fetch(`${baseApiUrl}`, requestOptions);
      const data = await res.json();

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='space-x-4 mb-4'>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded'
        onClick={sendRequest}
      >
        Test broker
      </button>
      <button className='bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded'>
        Test auth
      </button>
      <button className='bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded'>
        Test email
      </button>
      <button className='bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded'>
        Test log
      </button>
      <button className='bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded'>
        Test gRPC log
      </button>
    </div>
  );
};

export default ButtonPanel;
