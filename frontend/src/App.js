import { useEffect, useState, useCallback } from 'react';
import '@/App.css';
import axios from 'axios';
import Map from '@/components/Map';
import Header from '@/components/Header';
import { Toaster, toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Auto-refresh interval (5 minutes)
const AUTO_REFRESH_INTERVAL = 5 * 60 * 1000;

function App() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchLocations = useCallback(async (forceRefresh = false, showToast = false) => {
    try {
      setLoading(true);
      
      const response = await axios.get(`${API}/locations`, {
        params: { force_refresh: forceRefresh }
      });
      
      setLocations(response.data.locations);
      setLastUpdated(response.data.last_updated);
      
      if (showToast) {
        toast.success(`${response.data.total} localizações carregadas`, {
          description: 'Dados atualizados com sucesso'
        });
      }
      
    } catch (error) {
      console.error('Error fetching locations:', error);
      toast.error('Erro ao carregar localizações', {
        description: 'Tente novamente em alguns instantes'
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial load
    fetchLocations(false, false);

    // Set up auto-refresh
    const interval = setInterval(() => {
      fetchLocations(true, false);
    }, AUTO_REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [fetchLocations]);

  const handleRefresh = () => {
    fetchLocations(true, true);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="App">
      <Toaster 
        position="top-right" 
        richColors
        toastOptions={{
          style: {
            fontFamily: 'Manrope, sans-serif',
          },
        }}
      />
      <Header 
        onRefresh={handleRefresh} 
        loading={loading}
        lastUpdated={lastUpdated}
        onSearch={handleSearch}
        locations={locations}
      />
      <main className="map-container" data-testid="map-container">
        <Map 
          locations={locations} 
          loading={loading}
          searchQuery={searchQuery}
        />
      </main>
    </div>
  );
}

export default App;