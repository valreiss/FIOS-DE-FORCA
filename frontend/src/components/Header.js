import React from 'react';
import { RefreshCw } from 'lucide-react';

const Header = ({ onRefresh, loading, lastUpdated }) => {
  const formatTime = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <header className="bg-white border-b border-[#E6DCCF] shadow-sm sticky top-0 z-50" data-testid="app-header">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center gap-3 sm:gap-4">
            <img 
              src="https://customer-assets.emergentagent.com/job_geobrecho-finder/artifacts/isyuk4cg_logo%20MULHERES%20QUE%20TECEM%20O%20FUTURO%20SUSTENT%C3%81VEL%20%281%29.png"
              alt="Movimento Fios de Força"
              className="h-10 sm:h-12 w-auto"
            />
            <div>
              <h1 
                className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#6A3512]" 
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Mapa de Brechós
              </h1>
              <p className="hidden sm:block text-xs sm:text-sm text-[#5D4037] mt-0.5">
                Movimento Fios de Força
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-4">
            {lastUpdated && (
              <span className="hidden sm:inline text-xs text-[#8D6E63]">
                Atualizado às {formatTime(lastUpdated)}
              </span>
            )}
            <button
              onClick={onRefresh}
              disabled={loading}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#6A3512] text-white rounded-xl hover:bg-[#8B4513] active:bg-[#50280E] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:-translate-y-0.5 shadow-md hover:shadow-lg"
              data-testid="refresh-button"
              aria-label="Atualizar localizações"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline text-sm font-medium">Atualizar</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;