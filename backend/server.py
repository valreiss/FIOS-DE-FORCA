from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import httpx
import pandas as pd
from io import StringIO
import asyncio
from functools import lru_cache

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Google Sheets configuration
SHEETS_URL = "https://docs.google.com/spreadsheets/d/1DeXFssC8Cuq8Y4OWAiopoDiZm5GHCf53b5kYx74IWIk/export?format=csv&gid=2056419411"

# Geocoding cache to avoid repeated API calls
geocode_cache = {}

# Models
class Location(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    business_name: Optional[str] = None
    whatsapp: Optional[str] = None
    city_state: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    story: Optional[str] = None
    activity: Optional[str] = None

class LocationsResponse(BaseModel):
    locations: List[Location]
    total: int
    last_updated: datetime

async def geocode_location(city_state: str) -> tuple[Optional[float], Optional[float]]:
    """Geocode a city/state string to lat/lon using Nominatim (OpenStreetMap)"""
    if city_state in geocode_cache:
        return geocode_cache[city_state]
    
    try:
        # Clean and normalize the location string
        location = city_state.strip()
        
        # Nominatim API (free, no key required)
        url = "https://nominatim.openstreetmap.org/search"
        params = {
            "q": location,
            "format": "json",
            "limit": 1,
            "countrycodes": "br"  # Brazil country code
        }
        headers = {
            "User-Agent": "BrechoMapApp/1.0"
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.get(url, params=params, headers=headers, timeout=10.0)
            response.raise_for_status()
            data = response.json()
            
            if data and len(data) > 0:
                lat = float(data[0]['lat'])
                lon = float(data[0]['lon'])
                geocode_cache[city_state] = (lat, lon)
                logger.info(f"Geocoded {city_state} to ({lat}, {lon})")
                return lat, lon
            else:
                logger.warning(f"No geocoding results for: {city_state}")
                geocode_cache[city_state] = (None, None)
                return None, None
                
    except Exception as e:
        logger.error(f"Geocoding error for {city_state}: {str(e)}")
        return None, None

async def fetch_sheet_data() -> List[Location]:
    """Fetch and parse data from Google Sheets"""
    try:
        async with httpx.AsyncClient(follow_redirects=True) as client:
            response = await client.get(SHEETS_URL, timeout=30.0)
            response.raise_for_status()
            
            # Parse CSV
            csv_data = StringIO(response.text)
            df = pd.read_csv(csv_data)
            
            logger.info(f"Fetched {len(df)} rows from Google Sheets")
            
            locations = []
            
            # Process each row
            for _, row in df.iterrows():
                try:
                    # Extract fields
                    name = str(row.get('Nome Completo', '')).strip()
                    business_name = str(row.get('Qual o nome do seu negócio (brechó ou outro)', '')).strip()
                    whatsapp = str(row.get('WhatsApp com DDD (Essencial para criar a lista de transmissão depois)', '')).strip()
                    city_state = str(row.get('Cidade e Estado onde mora', '')).strip()
                    story = str(row.get('Quer nos contar um pouco sobre você?', '')).strip()
                    activity = str(row.get('Qual é a sua principal atividade na moda circular?', '')).strip()
                    
                    # Skip if no name or city
                    if not name or name == 'nan' or not city_state or city_state == 'nan':
                        continue
                    
                    # Clean values
                    if business_name == 'nan' or not business_name:
                        business_name = None
                    if whatsapp == 'nan' or not whatsapp:
                        whatsapp = None
                    if story == 'nan' or not story:
                        story = None
                    if activity == 'nan' or not activity:
                        activity = None
                    
                    # Geocode the location
                    await asyncio.sleep(1)  # Rate limiting for Nominatim (max 1 req/sec)
                    lat, lon = await geocode_location(city_state)
                    
                    location = Location(
                        name=name,
                        business_name=business_name,
                        whatsapp=whatsapp,
                        city_state=city_state,
                        latitude=lat,
                        longitude=lon,
                        story=story,
                        activity=activity
                    )
                    
                    locations.append(location)
                    
                except Exception as e:
                    logger.error(f"Error processing row: {str(e)}")
                    continue
            
            logger.info(f"Successfully processed {len(locations)} locations")
            return locations
            
    except Exception as e:
        logger.error(f"Error fetching sheet data: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error fetching data: {str(e)}")

# Cache for locations data
locations_cache = {
    "data": None,
    "timestamp": None
}

@api_router.get("/locations", response_model=LocationsResponse)
async def get_locations(force_refresh: bool = False):
    """Get all locations from the Google Sheet with geocoding"""
    try:
        # Check cache (5 minute expiry)
        now = datetime.now(timezone.utc)
        
        if not force_refresh and locations_cache["data"] and locations_cache["timestamp"]:
            elapsed = (now - locations_cache["timestamp"]).total_seconds()
            if elapsed < 300:  # 5 minutes
                logger.info("Returning cached locations data")
                return LocationsResponse(
                    locations=locations_cache["data"],
                    total=len(locations_cache["data"]),
                    last_updated=locations_cache["timestamp"]
                )
        
        # Fetch fresh data
        logger.info("Fetching fresh data from Google Sheets")
        locations = await fetch_sheet_data()
        
        # Update cache
        locations_cache["data"] = locations
        locations_cache["timestamp"] = now
        
        return LocationsResponse(
            locations=locations,
            total=len(locations),
            last_updated=now
        )
        
    except Exception as e:
        logger.error(f"Error in get_locations: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/")
async def root():
    return {"message": "Mapa de Brechós - MOVIMENTO FIOS DE FORÇA"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()