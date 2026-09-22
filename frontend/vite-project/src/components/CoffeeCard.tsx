import React from 'react';
import type { ICoffee } from '../types/coffee';
import { Heart, ArrowUpRight } from 'lucide-react';

const STANDARD_COFFEE_IMAGE =
  'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=700';

interface CoffeeCardProps {
  coffee: ICoffee;
  onSelect: (coffee: ICoffee) => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
}

export const CoffeeCard: React.FC<CoffeeCardProps> = ({
  coffee,
  onSelect,
  onToggleFavorite,
}) => {
  const id = coffee._id || '';

  return (
    <article
      onClick={() => onSelect(coffee)}
      className="group bg-white rounded-3xl border border-[#e8dfd3]/90 p-4 shadow-[0_10px_30px_-10px_rgba(44,29,17,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(44,29,17,0.12)] hover:border-[#d4a373]/60 transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      <div>
        <div className="relative h-56 rounded-2xl overflow-hidden bg-[#f4ede4] mb-4">
          <img
            src={coffee.img_uri || STANDARD_COFFEE_IMAGE}
            alt={coffee.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(id, e);
            }}
            aria-label="Toggle favorite"
            className="absolute top-3 right-3 w-10 h-10 rounded-full backdrop-blur-md bg-white/85 text-[#1f140e] flex items-center justify-center shadow-sm hover:scale-105 transition-transform cursor-pointer"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                coffee.isFavorite ? 'fill-[#8c533e] text-[#8c533e]' : 'text-[#6e5d50]'
              }`}
            />
          </button>
        </div>

        <div className="px-1">
          <h3 className="text-xl font-serif font-bold text-[#1f140e] mb-1.5 group-hover:text-[#8c533e] transition-colors">
            {coffee.name}
          </h3>
          <p className="text-sm text-[#6e5d50] line-clamp-2 leading-relaxed mb-4">
            {coffee.description}
          </p>
        </div>
      </div>

      <div className="pt-3 border-t border-[#f4ede4] flex items-center justify-between text-xs font-semibold text-[#8c533e]">
        <span>Journal Entry</span>
        <span className="inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
          View Details <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </article>
  );
};