'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import personalTravelData from '@/data/personal_travel.json';
import conferenceTravelData from '@/data/conference_travel.json';
import internshipTravelData from '@/data/internship_travel.json';
import '../../styles/travels.css';

// Dynamically import the map component with no SSR to avoid window not defined errors
const MapComponent = dynamic(() => import('@/components/TravelMap'), {
  ssr: false,
  loading: () => <div className="map-loading">Loading map...</div>
});

export default function TravelsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filteredData = useMemo(() => {
    let combinedData = [];
    
    if (activeFilter === 'all' || activeFilter === 'personal') {
      combinedData = [
        ...combinedData,
        ...personalTravelData.travels.map(item => ({
          ...item,
          type: 'personal'
        }))
      ];
    }
    
    if (activeFilter === 'all' || activeFilter === 'conference') {
      combinedData = [
        ...combinedData,
        ...conferenceTravelData.travels.map(item => ({
          ...item,
          type: 'conference'
        }))
      ];
    }
    
    if (activeFilter === 'all' || activeFilter === 'internship') {
      combinedData = [
        ...combinedData,
        ...internshipTravelData.travels.map(item => ({
          ...item,
          type: 'internship'
        }))
      ];
    }
    
    return combinedData;
  }, [activeFilter]);

  // Calculate statistics based on filtered data
  const cityCount = useMemo(() => {
    return Array.from(new Set(filteredData.map(item => item.city))).length;
  }, [filteredData]);
  
  const countryCount = useMemo(() => {
    const usStates = new Set([
      'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 
      'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 
      'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 
      'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 
      'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'DC'
    ]);

    return Array.from(new Set(
      filteredData.map(item => {
        const parts = item.city.split(', ');
        const region = parts[1] ? parts[1].trim() : '';
        // Map US states to USA
        return usStates.has(region) ? 'USA' : region;
      }).filter(Boolean)
    )).length;
  }, [filteredData]);

  return (
    <div className="travels-container">
      <div className="travels-header">
        <Link href="/" className="travel-back-button" aria-label="Back to home">
          <span className="back-arrow">◀</span>
          <span className="travel-back-text">Back</span>
        </Link>

        <div className="travel-stats-top">
          <span className="stat-item"><strong>{cityCount}</strong> Cities</span>
          <span className="stat-separator">•</span>
          <span className="stat-item"><strong>{countryCount}</strong> Countries</span>
        </div>
        
        <div className="travel-filters">
          <button 
            className={`travel-filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Travels
          </button>
          <button 
            className={`travel-filter-btn ${activeFilter === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveFilter('personal')}
          >
            Personal
          </button>
          <button 
            className={`travel-filter-btn ${activeFilter === 'conference' ? 'active' : ''}`}
            onClick={() => setActiveFilter('conference')}
          >
            Academic Conferences
          </button>
          <button 
            className={`travel-filter-btn ${activeFilter === 'internship' ? 'active' : ''}`}
            onClick={() => setActiveFilter('internship')}
          >
            Internships
          </button>
        </div>
      </div>
      
      <div className="map-container-full">
        <MapComponent locations={filteredData} />
      </div>
    </div>
  );
}

