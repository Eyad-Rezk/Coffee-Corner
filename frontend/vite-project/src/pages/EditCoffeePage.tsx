import React, { useState } from 'react';
import type { CoffeeFormData, ICoffee } from '../types/coffee';
import { Tag, FileText, List, Sparkles, ArrowLeft } from 'lucide-react';

const STANDARD_COFFEE_IMAGE =
  'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=700';

interface EditCoffeePageProps {
  coffee: ICoffee;
  onSubmit: (id: string, data: Partial<CoffeeFormData>) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export const EditCoffeePage: React.FC<EditCoffeePageProps> = ({
  coffee,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [formData, setFormData] = useState<CoffeeFormData>({
    name: coffee.name,
    img_uri: STANDARD_COFFEE_IMAGE,
    description: coffee.description,
    ingredients: coffee.ingredients,
    steps: coffee.steps,
  });

  const previewCoffee: ICoffee = {
    ...coffee,
    ...formData,
    img_uri: STANDARD_COFFEE_IMAGE,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!coffee._id) return;
    await onSubmit(coffee._id, {
      ...formData,
      img_uri: STANDARD_COFFEE_IMAGE,
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <button
        onClick={onCancel}
        className="inline-flex items-center gap-2 text-xs font-semibold text-[#6e5d50] hover:text-[#1f140e] mb-6 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Cancel editing
      </button>

      <div className="mb-8">
        <h2 className="text-3xl font-serif font-bold text-[#1f140e]">Edit Entry</h2>
        <p className="text-sm text-[#6e5d50]">
          Refine your recipe proportions, description, or steps.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-7 bg-white rounded-3xl border border-[#e8dfd3] p-6 sm:p-8 space-y-5 shadow-xs"
        >
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6e5d50] mb-1.5 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-[#8c533e]" /> Coffee Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl bg-white border border-[#e8dfd3] text-sm text-[#1f140e] focus:outline-none focus:ring-4 focus:ring-[#8c533e]/15 focus:border-[#8c533e]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6e5d50] mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#8c533e]" /> Description
            </label>
            <textarea
              rows={2}
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-3 rounded-2xl bg-white border border-[#e8dfd3] text-sm text-[#1f140e] focus:outline-none focus:ring-4 focus:ring-[#8c533e]/15 focus:border-[#8c533e]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6e5d50] mb-1.5 flex items-center gap-1.5">
              <List className="w-3.5 h-3.5 text-[#8c533e]" /> Ingredients
            </label>
            <textarea
              rows={2}
              required
              value={formData.ingredients}
              onChange={(e) =>
                setFormData({ ...formData, ingredients: e.target.value })
              }
              className="w-full px-4 py-3 rounded-2xl bg-white border border-[#e8dfd3] text-sm text-[#1f140e] focus:outline-none focus:ring-4 focus:ring-[#8c533e]/15 focus:border-[#8c533e]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6e5d50] mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#8c533e]" /> Preparation Steps
            </label>
            <textarea
              rows={3}
              required
              value={formData.steps}
              onChange={(e) => setFormData({ ...formData, steps: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl bg-white border border-[#e8dfd3] text-sm text-[#1f140e] focus:outline-none focus:ring-4 focus:ring-[#8c533e]/15 focus:border-[#8c533e]"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-3 rounded-full text-sm font-semibold text-[#6e5d50] hover:bg-[#f4ede4] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-7 py-3 rounded-full text-sm font-semibold bg-[#1f140e] text-[#fdfbf7] shadow-lg shadow-[#1f140e]/15 hover:bg-[#322015] transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Saving Changes...' : 'Save Changes'}
            </button>
          </div>
        </form>

        {/* Live Preview Column */}
        <div className="lg:col-span-5 sticky top-28">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6e5d50] block mb-3">
            Live Preview Card
          </span>
          <div className="bg-white rounded-3xl border border-[#e8dfd3] p-5 shadow-lg">
            <div className="relative h-48 rounded-2xl overflow-hidden bg-[#f4ede4] mb-4">
              <img
                src={previewCoffee.img_uri}
                alt={previewCoffee.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#1f140e] mb-2">
              {previewCoffee.name}
            </h3>
            <p className="text-sm text-[#6e5d50] leading-relaxed">
              {previewCoffee.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};