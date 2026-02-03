import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Phone, MapPinned, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Custom marker icon with earthy colors
const createCustomIcon = () => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <svg width="40" height="50" viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.3"/>
          </filter>
        </defs>
        <path d="M20 0C11.7 0 5 6.7 5 15c0 10 15 35 15 35s15-25 15-35c0-8.3-6.7-15-15-15z" 
              fill="#6A3512" 
              filter="url(#shadow)"/>
        <circle cx="20" cy="15" r="6" fill="#DAA520"/>
      </svg>
    `,
    iconSize: [40, 50],
    iconAnchor: [20, 50],
    popupAnchor: [0, -50],
  });
};

const FitBounds = ({ locations }) => {
  const map = useMap();

  useEffect(() => {
    if (locations && locations.length > 0) {
      const validLocations = locations.filter(loc => loc.latitude && loc.longitude);
      if (validLocations.length > 0) {
        const bounds = validLocations.map(loc => [loc.latitude, loc.longitude]);
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
      }
    }
  }, [locations, map]);

  return null;
};

const Map = ({ locations, loading, searchQuery }) => {
  const [center] = useState([-15.8267, -47.9218]); // Brazil center
  const customIcon = createCustomIcon();

  const formatWhatsApp = (whatsapp) => {
    if (!whatsapp) return null;
    // Remove any non-digit characters
    const cleaned = whatsapp.replace(/\D/g, '');
    return cleaned;
  };

  // Filter locations based on search query
  const filteredLocations = locations.filter(loc => {
    if (!searchQuery || searchQuery.trim() === '') return true;
    
    const query = searchQuery.toLowerCase();
    const businessName = (loc.business_name || '').toLowerCase();
    const name = (loc.name || '').toLowerCase();
    const cityState = (loc.city_state || '').toLowerCase();
    
    return businessName.includes(query) || name.includes(query) || cityState.includes(query);
  });

  const validLocations = filteredLocations.filter(loc => loc.latitude && loc.longitude);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-[#F9F5F0]">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-[#6A3512] animate-spin mx-auto" />
          <p className="text-[#3E2723] font-medium">Carregando localizações...</p>
        </div>
      </div>
    );
  }

  if (validLocations.length === 0) {
    return (
      <div className="flex items-center justify-center h-full bg-[#F9F5F0]">
        <div className="text-center space-y-4 p-8">
          <MapPinned className="w-16 h-16 text-[#8D6E63] mx-auto" />
          <p className="text-[#3E2723] text-lg font-medium">
            {searchQuery ? 'Nenhum resultado encontrado' : 'Nenhuma localização encontrada'}
          </p>
          <p className="text-[#5D4037] text-sm">
            {searchQuery ? 'Tente outra busca' : 'Aguarde enquanto carregamos os dados da planilha.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <MapContainer
      center={center}
      zoom={5}
      className="h-full w-full rounded-lg"
      style={{ zIndex: 0 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      
      <FitBounds locations={validLocations} />
      
      {validLocations.map((location) => (
        <Marker
          key={location.id}
          position={[location.latitude, location.longitude]}
          icon={customIcon}
          aria-label={location.business_name || location.name}
        >
          <Popup
            maxWidth={300}
            className="custom-popup"
          >
            <div className="p-4 space-y-3" data-testid="location-popup">
              <div>
                <h3 className="font-semibold text-lg text-[#6A3512] mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {location.business_name || location.name}
                </h3>
                {location.business_name && (
                  <p className="text-sm text-[#5D4037]">{location.name}</p>
                )}
              </div>
              
              <div className="flex items-start gap-2 text-sm text-[#5D4037]">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#8D6E63]" />
                <span>{location.city_state}</span>
              </div>
              
              {location.whatsapp && (
                <a
                  href={`https://wa.me/${formatWhatsApp(location.whatsapp)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[#6A3512] hover:text-[#8B4513] font-medium transition-colors duration-200"
                  data-testid="whatsapp-link"
                >
                  <Phone className="w-4 h-4" />
                  <span>{location.whatsapp}</span>
                </a>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;