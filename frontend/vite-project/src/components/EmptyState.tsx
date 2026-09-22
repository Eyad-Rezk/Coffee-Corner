import React from 'react';
import { Coffee as CoffeeIcon } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  isFilterActive?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Your collection is empty.',
  description = 'Start building your personal coffee collection.',
  actionText = '+ Add Your First Coffee',
  onAction,
  isFilterActive = false,
}) => {
  return (
    <div className="text-center py-24 px-6 bg-[#f4ede4]/40 rounded-3xl border border-dashed border-[#e8dfd3]">
      <div className="w-14 h-14 rounded-2xl bg-white border border-[#e8dfd3] flex items-center justify-center mx-auto mb-4 text-[#8c533e] shadow-xs">
        <CoffeeIcon className="w-6 h-6" />
      </div>
      <h3 className="text-2xl font-serif font-bold text-[#1f140e] mb-2">{title}</h3>
      <p className="text-sm text-[#6e5d50] max-w-sm mx-auto mb-6">{description}</p>
      {onAction && !isFilterActive && (
        <button
          onClick={onAction}
          className="px-6 py-3 rounded-full text-sm font-semibold bg-[#1f140e] text-[#fdfbf7] shadow-lg shadow-[#1f140e]/15 hover:bg-[#322015] transition-all cursor-pointer"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};