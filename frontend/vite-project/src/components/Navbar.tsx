import React from 'react';
import { Coffee, Heart, Plus, BookOpen } from 'lucide-react';
import type { ViewRoute } from '../types/coffee';

interface NavbarProps {
  currentRoute: ViewRoute;
  onRouteChange: (route: ViewRoute) => void;
  favoritesCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onRouteChange,
  favoritesCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#fcf9f5]/85 backdrop-blur-xl border-b border-[#e8dfd3]/85">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => onRouteChange('home')}
          className="flex items-center gap-3 text-left cursor-pointer"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#1f140e] to-[#4a2e1a] text-[#fdfbf7] flex items-center justify-center shadow-md">
            <Coffee className="w-5 h-5 text-[#d4a373]" />
          </div>
          <div>
            <span className="block font-serif font-bold text-lg text-[#1f140e] tracking-tight">
              Coffee Corner
            </span>
            <span className="block text-[11px] text-[#6e5d50] tracking-wide">
              Personal Coffee Journal
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="flex items-center gap-2">
          <button
            onClick={() => onRouteChange('collection')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              currentRoute === 'collection'
                ? 'bg-[#1f140e] text-[#fdfbf7]'
                : 'text-[#6e5d50] hover:bg-[#f4ede4]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Collection
          </button>

          <button
            onClick={() => onRouteChange('favorites')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              currentRoute === 'favorites'
                ? 'bg-[#1f140e] text-[#fdfbf7]'
                : 'text-[#6e5d50] hover:bg-[#f4ede4]'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            Favorites
            {favoritesCount > 0 && (
              <span className="text-[10px] bg-[#8c533e]/15 text-[#8c533e] px-2 py-0.5 rounded-full font-mono">
                {favoritesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onRouteChange('add')}
            className="inline-flex items-center gap-2 bg-[#1f140e] hover:bg-[#322015] text-[#fdfbf7] text-xs font-semibold px-5 py-2.5 rounded-full shadow-md transition-all cursor-pointer ml-2"
          >
            <Plus className="w-3.5 h-3.5 text-[#d4a373]" />
            Add Coffee
          </button>
        </nav>
      </div>
    </header>
  );
};