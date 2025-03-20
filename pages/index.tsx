import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import GameGrid from '../components/GameGrid';
import Header from '../components/Header';

// 模拟游戏数据
const GAMES_DATA = [
  {
    id: '1',
    title: '超级马里奥',
    system: 'FC',
    category: '动作',
    thumbnail: '/games/mario.png',
    romUrl: '/roms/mario.nes'
  },
  {
    id: '2',
    title: '魂斗罗',
    system: 'FC',
    category: '射击',
    thumbnail: '/games/contra.png',
    romUrl: '/roms/contra.nes'
  },
  {
    id: '3',
    title: '坦克大战',
    system: 'FC',
    category: '射击',
    thumbnail: '/games/tank.png',
    romUrl: '/roms/tank.nes'
  }
];

const Home: React.FC = () => {
  const router = useRouter();
  const { system: urlSystem } = router.query;
  const [activeSystem, setActiveSystem] = useState<string>('全部');
  const systems = ['全部', 'FC', 'SFC', 'GBA', 'MD'];

  // 从URL更新系统过滤器
  useEffect(() => {
    if (urlSystem && typeof urlSystem === 'string' && systems.includes(urlSystem)) {
      setActiveSystem(urlSystem);
    }
  }, [urlSystem]);

  const filteredGames = activeSystem === '全部' 
    ? GAMES_DATA 
    : GAMES_DATA.filter(game => game.system === activeSystem);

  const handleSystemChange = (system: string) => {
    setActiveSystem(system);
    router.push({
      pathname: '/',
      query: system === '全部' ? {} : { system }
    }, undefined, { shallow: true });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>经典游戏 - 即点即玩</title>
        <meta name="description" content="经典游戏在线玩" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">经典游戏</h1>
        
        <div className="flex justify-center space-x-4 mb-8">
          {systems.map(system => (
            <button
              key={system}
              className={`px-4 py-2 rounded-lg ${
                activeSystem === system 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => handleSystemChange(system)}
            >
              {system}
            </button>
          ))}
        </div>

        <GameGrid games={filteredGames} />
      </main>

      <footer className="text-center py-8 text-gray-600">
        <p>© 2024 经典游戏. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home; 