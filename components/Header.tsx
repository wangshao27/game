import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold">经典游戏</h1>
          </Link>
          
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="hover:text-blue-300">
                  首页
                </Link>
              </li>
              <li>
                <Link href="/?system=FC" className="hover:text-blue-300">
                  FC游戏
                </Link>
              </li>
              <li>
                <Link href="/?system=SFC" className="hover:text-blue-300">
                  SFC游戏
                </Link>
              </li>
              <li>
                <Link href="/?system=GBA" className="hover:text-blue-300">
                  GBA游戏
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 