import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../stylesheets/damage.css';
import L from 'leaflet';

import { db, collection, onSnapshot } from '../firebase';

// --- Helper: create hotspot icon based on status ---
const createHotspotIcon = (status) => {
  const statusClassName = status.toLowerCase();
  return L.divIcon({
    className: 'hotspot-container',
    html: `
      <div class="hotspot ${statusClassName}">
        <div class="hotspot-dot"></div>
        <div class="hotspot-ring"></div>
      </div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

function DamageMap() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Fetch sensor-data
    const sensorRef = collection(db, 'sensor-data');
    const unsubscribeSensor = onSnapshot(sensorRef, (snapshot) => {
      const sensorData = snapshot.docs.map(doc => ({
        id: doc.id,
        type: doc.data().type,
        status: doc.data().status,
        position: doc.data().position,
        source: 'Sensor',
      }));
      setReports((prev) => [...prev.filter(r => r.source !== 'Sensor'), ...sensorData]);
    });

    // Fetch citizen-data
    const citizenRef = collection(db, 'citizen-data');
    const unsubscribeCitizen = onSnapshot(citizenRef, (snapshot) => {
      const citizenData = snapshot.docs.map(doc => ({
        id: doc.id,
        type: doc.data().type,
        status: doc.data().status,
        position: doc.data().position,
        source: 'Citizen',
        citizenName: doc.data().citizenName || doc.data().userID,
        imageUrl: doc.data().imageUrl,
      }));
      setReports((prev) => [...prev.filter(r => r.source !== 'Citizen'), ...citizenData]);
    });

    // Cleanup subscriptions
    return () => {
      unsubscribeSensor();
      unsubscribeCitizen();
    };
  }, []);

  const mapCenter = [11.0168, 76.9558];

  return (
    <div className="overall-map-container">
      <div className="overall-map">
        <MapContainer center={mapCenter} zoom={13} style={{ height: '100vh', width: '100vw' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {reports.map(report => (
            <Marker
              key={report.id}
              position={report.position}
              icon={createHotspotIcon(report.status)}
            >
              <Popup>
                <strong>Source:</strong> {report.source}<br />
                <strong>Status:</strong> {report.status}<br />
                <strong>Type:</strong> {report.type}<br />
                <strong>ID:</strong> {report.id}<br />
                {report.source === 'Citizen' && report.citizenName && (
                  <>
                    <strong>Reported by:</strong> {report.citizenName}<br />
                    {report.imageUrl && <img src={report.imageUrl} alt={report.type} style={{ width: '100px', marginTop: '5px', borderRadius: '5px' }} />}
                  </>
                )}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default DamageMap;
