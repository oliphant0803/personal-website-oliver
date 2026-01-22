'use client';

import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../styles/mapStyles.css';

// Get your own token from https://account.mapbox.com
// This is a temporary public token for development
mapboxgl.accessToken = 'pk.eyJ1IjoiaDJvc3Rhcm1lIiwiYSI6ImNtYndlYWw5ZzB6cGkyanExZW9vc3c5ZDAifQ.qOgFB9fV8hXE2hgS8_ZQ3g';

// More distinct but still minimal color palette
const colorsByType = {
  personal: '#546e7a',    // Slate blue-gray
  conference: '#d32f2f',  // Muted red
  internship: '#388e3c',  // Muted green
};

export default function TravelMap({ locations }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  // Initialize map when component mounts
  useEffect(() => {
    if (map.current) return; // Initialize map only once
    
    // Wait for a tick to ensure DOM is ready
    setTimeout(() => {
      try {
        // Double-check that container exists and is visible
        if (!mapContainer.current) return;
        
        // Initialize map with a minimal monochrome style
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/light-v11', // Minimal light style
          center: [0, 20], // Center the map on a global view
          zoom: 1.5,
          attributionControl: true,
          preserveDrawingBuffer: true,
          projection: 'mercator',
          renderWorldCopies: true,
          maxBounds: [[-180, -60], [180, 80]] // Limit vertical panning to exclude poles
        });

        // Add event listener for map load
        map.current.on('load', () => {
          map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
          setMapLoaded(true);
        });
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    }, 100); 
    
    // Clean up on unmount
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);
  
  // Update markers when locations or map changes
  useEffect(() => {
    if (!mapLoaded || !locations.length) return;
    
    // Group locations by type to create layers
    const locationsByType = {
      personal: [],
      conference: [],
      internship: []
    };

    locations.forEach(loc => {
      if (locationsByType[loc.type]) {
        locationsByType[loc.type].push({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [parseFloat(loc.lng), parseFloat(loc.lat)]
          },
          properties: {
            description: `<h4>${loc.city}</h4><p>Year: ${loc.year}</p>${loc.type === 'conference' ? `<p>Conference: ${loc.conference}</p>` : ''}${loc.type === 'internship' ? `<p>Company: ${loc.company}</p>` : ''}`
          }
        });
      }
    });

    // Add layers for each type
    Object.keys(locationsByType).forEach(type => {
      // Safety check to ensure map still exists
      if (!map.current) return;

      const layerId = `points-${type}`;
      
      // Clean up existing layers if any (though we re-render effectively)
      if (map.current.getLayer(layerId)) map.current.removeLayer(layerId);
      if (map.current.getSource(layerId)) map.current.removeSource(layerId);

      if (locationsByType[type].length === 0) return;

      map.current.addSource(layerId, {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: locationsByType[type]
        }
      });

      map.current.addLayer({
        id: layerId,
        type: 'circle',
        source: layerId,
        paint: {
          'circle-radius': 6,
          'circle-color': colorsByType[type] || '#546e7a',
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff'
        }
      });

      // Change cursor on hover
      map.current.on('mouseenter', layerId, () => {
        map.current.getCanvas().style.cursor = 'pointer';
      });
      
      map.current.on('mouseleave', layerId, () => {
        map.current.getCanvas().style.cursor = '';
      });

      // Add popup on click
      map.current.on('click', layerId, (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description;

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup({ className: 'minimal-popup' })
          .setLngLat(coordinates)
          .setHTML(description)
          .addTo(map.current);
      });
    });
    
  }, [locations, mapLoaded]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <div 
        ref={mapContainer} 
        className="map-canvas" 
        style={{ width: '100%', height: '100%' }}
      />
      
      <div className="map-legend" style={{ backgroundColor: 'rgba(255,255,255,0.85)', borderRadius: '4px', padding: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
        <div className="legend-title" style={{ fontWeight: '500', marginBottom: '8px' }}>Legend</div>
        <div className="legend-item">
          <span className="legend-marker" style={{ backgroundColor: colorsByType.personal, border: '1px solid #ffffff' }}></span>
          <span>Personal Travel</span>
        </div>
        <div className="legend-item">
          <span className="legend-marker" style={{ backgroundColor: colorsByType.conference, border: '1px solid #ffffff' }}></span>
          <span>Conference Travel</span>
        </div>
        <div className="legend-item">
          <span className="legend-marker" style={{ backgroundColor: colorsByType.internship, border: '1px solid #ffffff' }}></span>
          <span>Internship</span>
        </div>
      </div>
    </div>
  );
}
