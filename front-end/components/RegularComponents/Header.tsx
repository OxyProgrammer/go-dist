import React from 'react';
import Image from 'next/image';

interface HeaderProps {
  selectedTab: string;
}

const Header: React.FC<HeaderProps> = ({ selectedTab }) => {
  return (
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
        <span className='text-blue-300'>Selected Tab:</span>
        <span className='text-white'> {selectedTab}</span>
      </div>
    </header>
  );
};

export default Header;
