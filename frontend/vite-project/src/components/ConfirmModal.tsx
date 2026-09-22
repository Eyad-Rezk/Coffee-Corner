import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  loading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1f140e]/40 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#fcf9f5] border border-[#e8dfd3] rounded-3xl max-w-sm w-full p-6 shadow-2xl">
        <div className="w-10 h-10 rounded-2xl bg-amber-950/10 text-amber-950 flex items-center justify-center mb-4">
          <AlertCircle className="w-5 h-5 text-[#8c533e]" />
        </div>
        <h3 className="font-serif font-bold text-xl text-[#1f140e] mb-2">{title}</h3>
        <p className="text-sm text-[#6e5d50] mb-6 leading-relaxed">{message}</p>
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#6e5d50] hover:bg-[#f4ede4] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-5 py-2.5 rounded-full text-xs font-semibold bg-red-800 text-white hover:bg-red-900 transition-colors cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Removing...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};