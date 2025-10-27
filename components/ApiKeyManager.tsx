import React, { useState } from 'react';

interface ApiKeyManagerProps {
  isApiKeySet: boolean;
  tokensUsed: number;
  tokenLimit: number;
  onApiKeySet: (key: string) => void;
}

export const ApiKeyManager: React.FC<ApiKeyManagerProps> = ({ 
  isApiKeySet, 
  tokensUsed, 
  tokenLimit,
  onApiKeySet 
}) => {
  const [apiKey, setApiKey] = useState('');
  const [showInput, setShowInput] = useState(!isApiKeySet);

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('GEMINI_API_KEY', apiKey.trim());
      onApiKeySet(apiKey.trim());
      setShowInput(false);
      setApiKey('');
    }
  };

  const handleRemoveApiKey = () => {
    localStorage.removeItem('GEMINI_API_KEY');
    onApiKeySet('');
    setShowInput(true);
  };

  if (!isApiKeySet || showInput) {
    return (
      <div className="mb-6 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-lg" role="alert">
        <strong className="font-bold">API Kulcs Beállítása</strong>
        <p className="block mt-2 mb-3 text-sm">
          A képgeneráláshoz szükséges egy Google Gemini API kulcs. 
          <a 
            href="https://aistudio.google.com/apikey" 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline ml-1 font-semibold hover:text-yellow-800"
          >
            Szerezz be egyet itt →
          </a>
        </p>
        <div className="flex gap-2 mt-2">
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Írd be az API kulcsod..."
            className="flex-1 px-3 py-2 bg-white text-gray-800 rounded border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-600"
            onKeyPress={(e) => e.key === 'Enter' && handleSaveApiKey()}
          />
          <button
            onClick={handleSaveApiKey}
            className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors font-semibold"
          >
            Mentés
          </button>
        </div>
      </div>
    );
  }

  const percentageUsed = tokenLimit > 0 ? (tokensUsed / tokenLimit) * 100 : 0;

  return (
    <div className="mb-6 bg-base-200 p-4 rounded-lg shadow">
        <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
                <span className="font-semibold text-text-primary text-sm">Napi Token Felhasználás</span>
                <button
                    onClick={handleRemoveApiKey}
                    className="text-xs text-red-400 hover:text-red-300 underline"
                    title="API kulcs eltávolítása"
                >
                    (kulcs törlése)
                </button>
            </div>
            <span className="text-text-secondary text-sm">{tokensUsed.toLocaleString()} / {tokenLimit.toLocaleString()}</span>
        </div>
        <div className="w-full bg-base-300 rounded-full h-2.5">
            <div 
                className="bg-gradient-to-r from-brand-secondary to-brand-primary h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${Math.min(percentageUsed, 100)}%` }}
            ></div>
        </div>
    </div>
  );
};
