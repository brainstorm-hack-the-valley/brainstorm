import React from 'react';
import { CloudLightning } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-blue-700 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <a className='flex items-center cursor-pointer'
          href="/">
            <CloudLightning className="w-20 h-20 text-yellow-500" />
            <h1 className="text-3xl font-bold ml-2">Brainstorm</h1>
        </a>
      </div>
    </header>
  );
};

export default Header;