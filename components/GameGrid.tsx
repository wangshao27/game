import Link from 'next/link';
import React from 'react';

interface Game {
  id: string;
  title: string;
  system: string;
  category: string;
  thumbnail: string;
  romUrl: string;
}

interface GameGridProps {
  games: Game[];
}

const GameGrid: React.FC<GameGridProps> = ({ games }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {games.map((game) => (
        <Link href={`/play/${game.id}`} key={game.id}>
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
            <div className="aspect-w-16 aspect-h-9">
              <img 
                src={game.thumbnail} 
                alt={game.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{game.title}</h3>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm">
                  {game.system}
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-sm">
                  {game.category}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default GameGrid; 