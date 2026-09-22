import React from 'react';
import type { ICoffee } from '../types/coffee';
import { ArrowLeft, Heart, Trash2, Edit3 } from 'lucide-react';

const STANDARD_COFFEE_IMAGE =
  'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=700';

interface CoffeeDetailsPageProps {
  coffee: ICoffee;
  onBack: () => void;
  onToggleFavorite: (id: string) => void;
  onDeleteRequest: (coffee: ICoffee) => void;
  onEditRequest: (coffee: ICoffee) => void;
}

export const CoffeeDetailsPage: React.FC<CoffeeDetailsPageProps> = ({
  coffee,
  onBack,
  onToggleFavorite,
  onDeleteRequest,
  onEditRequest,
}) => {
  const ingredientsList = coffee.ingredients
    ? coffee.ingredients.split(',').map((item) => item.trim())
    : [];

  const stepsList = coffee.steps
    ? coffee.steps
        .split(/\n|\.\s+/)
        .map((step) => step.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-semibold text-[#6e5d50] hover:text-[#1f140e] mb-8 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to collection
      </button>

      <div className="bg-white rounded-3xl border border-[#e8dfd3] overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12">
        {/* Large Image Column */}
        <div className="lg:col-span-5 h-72 lg:h-auto bg-[#f4ede4] relative">
          <img
            src={coffee.img_uri || STANDARD_COFFEE_IMAGE}
            alt={coffee.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Editorial Journal Content */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1f140e]">
                {coffee.name}
              </h1>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onEditRequest(coffee)}
                  className="w-10 h-10 rounded-full border border-[#e8dfd3] flex items-center justify-center text-[#6e5d50] hover:text-[#1f140e] hover:bg-[#f4ede4] transition-colors cursor-pointer"
                  title="Edit entry"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => coffee._id && onToggleFavorite(coffee._id)}
                  className="w-10 h-10 rounded-full border border-[#e8dfd3] flex items-center justify-center hover:bg-[#f4ede4] transition-colors cursor-pointer"
                  title="Favorite"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      coffee.isFavorite
                        ? 'fill-[#8c533e] text-[#8c533e]'
                        : 'text-[#6e5d50]'
                    }`}
                  />
                </button>
                <button
                  onClick={() => onDeleteRequest(coffee)}
                  className="w-10 h-10 rounded-full border border-[#e8dfd3] flex items-center justify-center text-[#6e5d50] hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                  title="Delete entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-base text-[#6e5d50] leading-relaxed mb-8">
              {coffee.description}
            </p>

            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8c533e] mb-3">
                  Ingredients
                </h4>
                <ul className="space-y-1.5">
                  {ingredientsList.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-[#1f140e] flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8c533e]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8c533e] mb-3">
                  Preparation Steps
                </h4>
                <ol className="space-y-2.5">
                  {stepsList.map((step, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-[#1f140e] flex items-start gap-3"
                    >
                      <span className="font-mono text-xs font-bold text-[#8c533e] bg-[#8c533e]/10 w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};