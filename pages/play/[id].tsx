import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Emulator from '../../components/Emulator';
import Header from '../../components/Header';

// 模拟游戏数据获取
const getGameById = (id: string) => {
  return GAMES_DATA.find(game => game.id === id);
};

const GAMES_DATA = [
  {
    id: '1',
    title: '超级马里奥',
    system: 'FC',
    category: '动作',
    thumbnail: '/games/mario.jpg',
    romUrl: '/roms/mario.nes'
  },
  {
    id: '2',
    title: '魂斗罗',
    system: 'FC',
    category: '射击',
    thumbnail: '/games/contra.jpg',
    romUrl: '/roms/contra.nes'
  },
  {
    id: '3',
    title: '坦克大战',
    system: 'FC',
    category: '射击',
    thumbnail: '/games/tank.jpg',
    romUrl: '/roms/tank.nes'
  }
];

interface Game {
  id: string;
  title: string;
  system: string;
  category: string;
  thumbnail: string;
  romUrl: string;
}

const PlayGame: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const game = id ? getGameById(id as string) : null;

  if (!game) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Header />
        <div className="container mx-auto px-4 py-8 text-white">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Head>
        <title>{game.title} - 经典游戏</title>
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-white mb-4">{game.title}</h1>
          
          <div className="bg-black rounded-lg overflow-hidden">
            <Emulator romUrl={game.romUrl} system={game.system} />
          </div>

          <div className="mt-4 text-white">
            <p>使用键盘控制：</p>
            <ul className="list-disc list-inside mt-2">
              <li>W/A/S/D：方向键</li>
              <li>K键：A按钮</li>
              <li>J键：B按钮</li>
              <li>Enter：开始</li>
              <li>空格：选择</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlayGame; 