import React from 'react';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';

interface HomePageProps {
  onNavigateAdd: () => void;
  onNavigateCollection: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigateAdd,
  onNavigateCollection,
}) => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      {/* Left Column */}
      <div className="lg:col-span-6 space-y-6">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#8c533e] bg-[#8c533e]/10 px-3.5 py-1.5 rounded-full">
          <Sparkles className="w-3.5 h-3.5" /> Private Coffee Journal
        </div>
        <h1 className="text-5xl sm:text-6xl font-serif font-bold text-[#1f140e] leading-[1.12]">
          Your Coffee. <br />
          <span className="italic font-normal">Your Collection.</span>
        </h1>
        <p className="text-base text-[#6e5d50] leading-relaxed max-w-lg">
          Keep your favorite coffee creations, proportions, and personal ritual steps in one warm, distraction-free digital space.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            onClick={onNavigateAdd}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold bg-[#1f140e] text-[#fdfbf7] shadow-xl shadow-[#1f140e]/15 hover:bg-[#322015] transition-all cursor-pointer"
          >
            + Add Your First Coffee
          </button>
          <button
            onClick={onNavigateCollection}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-[#1f140e] bg-white border border-[#e8dfd3] hover:bg-[#f4ede4] transition-all cursor-pointer"
          >
            Explore My Collection <ArrowRight className="w-4 h-4 text-[#8c533e]" />
          </button>
        </div>
      </div>

      {/* Right Column: Editorial Visual Card Composition */}
      <div className="lg:col-span-6 relative">
        <div className="relative bg-white rounded-3xl border border-[#e8dfd3] p-6 shadow-2xl">
          <div className="relative h-64 rounded-2xl overflow-hidden mb-5 bg-[#f4ede4]">
            <img
              src="https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80&w=800"
              alt="Cappuccino art"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3 w-10 h-10 rounded-full backdrop-blur-md bg-white/90 flex items-center justify-center">
              <Heart className="w-4 h-4 fill-[#8c533e] text-[#8c533e]" />
            </div>
          </div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-serif font-bold text-2xl text-[#1f140e]">Caramel Macchiato</h3>
            <span className="text-xs font-semibold text-[#8c533e] bg-[#8c533e]/10 px-3 py-1 rounded-full">
              Morning Ritual
            </span>
          </div>
          <p className="text-sm text-[#6e5d50] leading-relaxed mb-4">
            Layered microfoam with organic caramel drizzle and double-shot espresso base.
          </p>
          <div className="pt-3 border-t border-[#f4ede4] flex items-center justify-between text-xs font-mono text-[#6e5d50]">
            <span>Ingredients: 4 items</span>
            <span>4 preparation steps</span>
          </div>
        </div>
      </div>
    </section>
  );
};