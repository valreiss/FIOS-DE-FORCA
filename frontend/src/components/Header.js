import React, { useState } from 'react';
import { RefreshCw, Search } from 'lucide-react';

const Header = ({ onRefresh, loading, lastUpdated, onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const formatTime = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  const handleSearchClear = () => {
    setSearchValue('');
    onSearch('');
  };

  return (
    <header className="bg-white border-b border-[#E6DCCF] shadow-sm sticky top-0 z-50" data-testid="app-header">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16 sm:h-20">
          <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
            <img 
              src="https://customer-assets.emergentagent.com/job_geobrecho-finder/artifacts/isyuk4cg_logo%20MULHERES%20QUE%20TECEM%20O%20FUTURO%20SUSTENT%C3%81VEL%20%281%29.png"
              alt="Movimento Fios de Força"
              className="h-10 sm:h-12 w-auto"
            />
            <div>
              <h1 
                className="text-lg sm:text-xl lg:text-2xl font-bold text-[#6A3512]" 
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Mapa de Brechós e Moda Sustentável
              </h1>
              <p className="hidden sm:block text-xs sm:text-sm text-[#5D4037] mt-0.5">
                Movimento Fios de Força
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Input */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#8D6E63]" />
              <input
                type="text"
                placeholder="Buscar brechó..."
                value={searchValue}
                onChange={handleSearchChange}
                className="pl-10 pr-4 py-2 w-48 lg:w-64 border border-[#E6DCCF] rounded-xl bg-[#F9F5F0] text-[#3E2723] placeholder-[#8D6E63] focus:outline-none focus:ring-2 focus:ring-[#DAA520] focus:border-transparent text-sm transition-all duration-200"
                data-testid="search-input"
              />
              {searchValue && (
                <button
                  onClick={handleSearchClear}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8D6E63] hover:text-[#6A3512] transition-colors"
                  aria-label="Limpar busca"
                >
                  ×
                </button>
              )}
            </div>

            {lastUpdated && (
              <span className="hidden lg:inline text-xs text-[#8D6E63]">
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
        
        {/* Mobile Search */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#8D6E63]" />
            <input
              type="text"
              placeholder="Buscar brechó..."
              value={searchValue}
              onChange={handleSearchChange}
              className="pl-10 pr-4 py-2 w-full border border-[#E6DCCF] rounded-xl bg-[#F9F5F0] text-[#3E2723] placeholder-[#8D6E63] focus:outline-none focus:ring-2 focus:ring-[#DAA520] focus:border-transparent text-sm transition-all duration-200"
              data-testid="search-input-mobile"
            />
            {searchValue && (
              <button
                onClick={handleSearchClear}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8D6E63] hover:text-[#6A3512] transition-colors text-xl"
                aria-label="Limpar busca"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;