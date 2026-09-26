import React, { useState } from 'react';
import { Lock, ArrowRight } from 'lucide-react';

interface PasswordGateProps {
  onUnlock: () => void;
}

const DECK_PASSWORD = '112233';

export const PasswordGate: React.FC<PasswordGateProps> = ({ onUnlock }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value === DECK_PASSWORD) {
      setError(false);
      onUnlock();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white border border-slate-200 rounded-xl p-6 text-center"
      >
        <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center mx-auto mb-4">
          <Lock className="w-4 h-4 text-white" />
        </div>
        <h2 className="text-base font-semibold text-slate-900">Executive Deck terkunci</h2>
        <p className="text-sm text-slate-500 mt-1 mb-4">
          Konten ini bersifat privat. Masukkan kata sandi untuk melanjutkan.
        </p>
        <input
          type="password"
          autoFocus
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError(false);
          }}
          placeholder="Kata sandi"
          className={`w-full px-3 py-2 text-sm rounded-lg border outline-none text-center tracking-widest ${
            error
              ? 'border-rose-300 focus:border-rose-400 bg-rose-50/50'
              : 'border-slate-200 focus:border-slate-400'
          }`}
        />
        {error && (
          <p className="text-xs text-rose-600 mt-2">Kata sandi salah. Coba lagi.</p>
        )}
        <button
          type="submit"
          className="w-full mt-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5"
        >
          <span>Buka Deck</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
