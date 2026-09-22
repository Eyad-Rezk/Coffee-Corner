import React, { useState } from 'react';
import type { ICoffee } from '../types/coffee';
import { CoffeeCard } from '../components/CoffeeCard';
import { EmptyState } from '../components/EmptyState';
import { Search } from 'lucide-react';

interface CollectionPageProps {
  coffees: ICoffee[];
  filterMode: 'all' | 'favorites';
  onFilterChange: (mode: 'all' | 'favorites') => void;
  onSelectCoffee: (coffee: ICoffee) => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onNavigateAdd: () => void;
}

export const CollectionPage: React.FC<CollectionPageProps> = ({
  coffees,
  filterMode,
  onFilterChange,
  onSelectCoffee,
  onToggleFavorite,
  onNavigateAdd,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const favoriteCount = coffees.filter((c) => c.isFavorite).length;

  const visibleCoffees = coffees.filter((c) => {
    const matchesFilter = filterMode === 'favorites' ? c.isFavorite : true;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#e8dfd3] mb-8">
        <div>
          <h2 className="text-4xl font-serif font-bold text-[#1f140e] mb-2">
            Your Coffee Collection
          </h2>
          <p className="text-sm text-[#6e5d50]">
            A little collection of the coffees you love.
          </p>
        </div>

        {/* Stats Summary Strip */}
        <div className="flex items-center gap-6 text-xs font-medium text-[#6e5d50] bg-white border border-[#e8dfd3] px-5 py-3 rounded-2xl shadow-xs">
          <div>
            <strong className="font-serif text-lg font-bold text-[#1f140e] block">
              {coffees.length}
            </strong>
            Coffees
          </div>
          <div className="w-px h-8 bg-[#e8dfd3]" />
          <div>
            <strong className="font-serif text-lg font-bold text-[#1f140e] block">
              {favoriteCount}
            </strong>
            Favorites
          </div>
        </div>
      </div>

      {/* Search & Segment Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-[#8e7a6b] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search your coffees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-[#e8dfd3] text-sm text-[#1f140e] placeholder-[#8e7a6b] focus:outline-none focus:ring-4 focus:ring-[#8c533e]/15 focus:border-[#8c533e]"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-[#f4ede4]/80 p-1 rounded-full">
          <button
            onClick={() => onFilterChange('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              filterMode === 'all'
                ? 'bg-[#1f140e] text-[#fdfbf7]'
                : 'text-[#6e5d50] hover:text-[#1f140e]'
            }`}
          >
            All Coffees
          </button>
          <button
            onClick={() => onFilterChange('favorites')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              filterMode === 'favorites'
                ? 'bg-[#1f140e] text-[#fdfbf7]'
                : 'text-[#6e5d50] hover:text-[#1f140e]'
            }`}
          >
            Favorites
          </button>
        </div>
      </div>

      {/* Grid or Empty */}
      {visibleCoffees.length === 0 ? (
        <EmptyState
          title={
            filterMode === 'favorites'
              ? 'No favorite coffees yet.'
              : 'Your collection is empty.'
          }
          description="Start building your personal coffee collection."
          onAction={onNavigateAdd}
          isFilterActive={Boolean(searchQuery || filterMode === 'favorites')}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleCoffees.map((coffee) => (
            <CoffeeCard
              key={coffee._id}
              coffee={coffee}
              onSelect={onSelectCoffee}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};