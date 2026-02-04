import React, { useState, useMemo } from 'react';
import { RefreshCw, Search, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

const Header = ({ onRefresh, loading, lastUpdated, onSearch, locations }) => {
  const [searchValue, setSearchValue] = useState('');
  const [showCityList, setShowCityList] = useState(false);

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

  const cityStats = useMemo(() => {
    if (!locations || locations.length === 0) return [];
    
    const stats = {};
    locations.forEach(loc => {
      if (loc.city_state) {
        const city = loc.city_state;
        if (!stats[city]) {
          stats[city] = { count: 0, locations: [] };
        }
        stats[city].count++;
        stats[city].locations.push(loc);
      }
    });
    
    return Object.entries(stats)
      .sort((a, b) => b[1].count - a[1].count)
      .map(([city, data]) => ({ city, ...data }));
  }, [locations]);

  const totalCount = locations ? locations.length : 0;

  const handleCityClick = (city) => {
    setSearchValue(city);
    onSearch(city);
    setShowCityList(false);
  };

  return (
    <>
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

              <button
                onClick={() => setShowCityList(!showCityList)}
                className="hidden lg:flex items-center gap-2 px-3 py-2 bg-[#F0EBE5] text-[#6A3512] rounded-xl hover:bg-[#E6DCCF] transition-all duration-200 border border-[#E6DCCF]"
                data-testid="city-stats-button"
              >
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">{totalCount} brechós</span>
                {showCityList ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

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
          
          <div className="md:hidden pb-3">
            <div className="flex gap-2">
              <div className="relative flex-1">
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
              <button
                onClick={() => setShowCityList(!showCityList)}
                className="flex items-center gap-1 px-3 py-2 bg-[#F0EBE5] text-[#6A3512] rounded-xl hover:bg-[#E6DCCF] transition-all duration-200 border border-[#E6DCCF] flex-shrink-0"
              >
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">{totalCount}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {showCityList && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-[#E6DCCF] shadow-lg z-40 max-h-96 overflow-y-auto" data-testid="city-list">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h3 className="text-sm font-semibold text-[#6A3512] mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
              Brechós por Região ({cityStats.length} cidades)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {cityStats.map(({ city, count }) => (
                <button
                  key={city}
                  onClick={() => handleCityClick(city)}
                  className="flex items-center justify-between p-3 bg-[#F9F5F0] hover:bg-[#F0EBE5] rounded-lg transition-colors duration-200 text-left group"
                  data-testid={`city-item-${city}`}
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <MapPin className="w-4 h-4 text-[#8D6E63] flex-shrink-0" />
                    <span className="text-sm text-[#3E2723] truncate">{city}</span>
                  </div>
                  <span className="ml-2 px-2 py-1 bg-[#6A3512] text-white text-xs rounded-full font-medium flex-shrink-0 group-hover:bg-[#8B4513] transition-colors">
                    {count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
