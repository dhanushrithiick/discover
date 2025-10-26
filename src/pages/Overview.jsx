import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db, collection, onSnapshot, doc, updateDoc } from '../firebase';
import '../stylesheets/overview.css';

// --- SENSOR CARD ---
const SensorCard = ({ data, onVerify }) => {
  const getStatusColorClass = (status) => {
    switch (status) {
      case 'Critical': return 'status-critical';
      case 'Warning': return 'status-warning';
      case 'High': return 'status-high';
      default: return 'status-default';
    }
  };

  return (
    <motion.div layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }} className="card">
      <div>
        <div className="card-header">
          <p className="chip chip-type">Sensor Report</p>
          <p className={`chip ${data.verified ? 'chip-verified' : 'chip-unverified'}`}>{data.verified ? 'Verified' : 'Unverified'}</p>
        </div>

        <h3 className="card-title">{data.type}</h3>
        <p className={`card-status ${getStatusColorClass(data.status)}`}>{data.status} Status</p>

        <div className="card-details">
          <div className="detail-item">
            <p className="detail-label">Moisture:</p>
            <p className="detail-value">{data.moisture}</p>
          </div>
          <div className="detail-item">
            <p className="detail-label">Vibration:</p>
            <p className="detail-value">{data.vibration}</p>
          </div>
          <div className="detail-item">
            <p className="detail-label">Position:</p>
            <p className="detail-value">{Array.isArray(data.position) ? data.position.join(', ') : ''}</p>
          </div>
        </div>
      </div>

      <div className="card-footer">
        {!data.verified ? (
          <div className="button-group">
            <button className="btn btn-secondary">View Details</button>
            <button className="btn btn-success" onClick={() => onVerify(data.id)}>Verify</button>
          </div>
        ) : (
          <button className="btn btn-primary">View Details</button>
        )}
      </div>
    </motion.div>
  );
};

// --- CITIZEN CARD ---
const CitizenCard = ({ data, onVerify }) => {
  const getStatusColorClass = (status) => {
    switch (status) {
      case 'Critical': return 'status-critical';
      case 'Medium': return 'status-warning';
      case 'Low': return 'status-default';
      default: return 'status-default';
    }
  };

  return (
    <motion.div layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }} className="card">
      <div>
        <div className="card-header citizen-header">
          <p className="chip chip-type">Citizen Report</p>
          <p className={`chip ${data.verified ? 'chip-verified' : 'chip-unverified'}`}>{data.verified ? 'Verified' : 'Unverified'}</p>
        </div>

        <p className="citizen-byline">By: {data.citizenName || data.userID}</p>
        <h3 className="card-title">{data.type}</h3>
        <p className={`card-status ${getStatusColorClass(data.status)}`}>{data.status} Status</p>

        <img
          src={data.imageUrl}
          alt={data.type}
          className="citizen-image"
          onError={(e) => { e.target.src = 'https://placehold.co/600x400/cccccc/ffffff?text=Image+Error'; }}
        />

        <div className="card-details">
          <div className="detail-item">
            <p className="detail-label">Position:</p>
            <p className="detail-value">{Array.isArray(data.position) ? data.position.join(', ') : ''}</p>
          </div>
        </div>
      </div>

      <div className="card-footer">
        {!data.verified ? (
          <div className="button-group">
            <button className="btn btn-secondary">View Media</button>
            <button className="btn btn-success" onClick={() => onVerify(data.id)}>Verify</button>
          </div>
        ) : (
          <button className="btn btn-primary">View Media</button>
        )}
      </div>
    </motion.div>
  );
};

// --- MAIN PAGE ---
export default function HotspotsPage() {
  const [activeTab, setActiveTab] = useState('sensors');
  const [sensorAnomalies, setSensorAnomalies] = useState([]);
  const [citizenAnomalies, setCitizenAnomalies] = useState([]);

  // Fetch sensor-data
  useEffect(() => {
    const sensorRef = collection(db, 'sensor-data');
    const unsubscribe = onSnapshot(sensorRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setSensorAnomalies(data);
    });
    return () => unsubscribe();
  }, []);

  // Fetch citizen-data
  useEffect(() => {
    const citizenRef = collection(db, 'citizen-data');
    const unsubscribe = onSnapshot(citizenRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCitizenAnomalies(data);
    });
    return () => unsubscribe();
  }, []);

  // Verify handlers
  const handleVerifySensor = async (id) => {
    const docRef = doc(db, 'sensor-data', id);
    await updateDoc(docRef, { verified: true });
  };

  const handleVerifyCitizen = async (id) => {
    const docRef = doc(db, 'citizen-data', id);
    await updateDoc(docRef, { verified: true });
  };

  const TabButton = ({ id, title }) => (
    <button onClick={() => setActiveTab(id)} className={`tab-button ${activeTab === id ? 'active' : ''}`}>
      {title}
    </button>
  );

  return (
    <div className="hotspots-page">
      <div className="container">
        <div className="header">
          <h1>Overview</h1>
          <p>Detailed feed of active sensor and citizen reports.</p>
        </div>

        <div className="tab-nav">
          <TabButton id="sensors" title="Sensor Reports" />
          <TabButton id="citizens" title="Citizen Reports" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.2 }}>
            <div className="grid-layout">
              {activeTab === 'sensors'
                ? sensorAnomalies.map((data) => <SensorCard key={data.id} data={data} onVerify={handleVerifySensor} />)
                : citizenAnomalies.map((data) => <CitizenCard key={data.id} data={data} onVerify={handleVerifyCitizen} />)}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
