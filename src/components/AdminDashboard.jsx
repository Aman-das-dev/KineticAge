import React, { useState, useEffect } from 'react';
import { Users, Stethoscope, Activity, Calendar, AlertTriangle, Search, Filter, CheckCircle2, ChevronRight, Sparkles, RefreshCw, User, MessageSquare, Award } from 'lucide-react';
import ProfileView from './ProfileView';
import { apiService } from '../services/api';

export default function AdminDashboard({ user }) {
  const [activeTab, setActiveTab] = useState('roster'); // 'roster' | 'doctor-profile' | 'analytics' | 'messages'

  const [patients, setPatients] = useState([
    { id: 'KA-89421', name: 'Sarah Jenkins', age: 68, mobilityScore: 92, lastVisit: '2026-07-28', riskLevel: 'Low', plan: 'Active Senior Vitality', phone: '+91 98765 43210' },
    { id: 'KA-89422', name: 'Arthur Pendelton', age: 74, mobilityScore: 78, lastVisit: '2026-07-25', riskLevel: 'Medium', plan: 'Joint Rehabilitation', phone: '+91 98234 56789' },
    { id: 'KA-89423', name: 'Eleanor Vance', age: 81, mobilityScore: 64, lastVisit: '2026-07-20', riskLevel: 'High', plan: 'Fall Prevention & Balance', phone: '+91 98345 67890' },
    { id: 'KA-89424', name: 'Robert Chen', age: 71, mobilityScore: 88, lastVisit: '2026-07-27', riskLevel: 'Low', plan: 'Cardio & Flexibility', phone: '+91 98456 78901' }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterRisk, setFilterRisk] = useState('All');
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [doctorProfile, setDoctorProfile] = useState(user || {
    name: 'Dr. Robert Vance, PT',
    email: 'robert.vance@kineticage.clinic',
    role: 'Physiotherapist'
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    const data = await apiService.getPatients();
    if (data && data.patients) {
      setPatients(data.patients);
    }
  };

  const filteredPatients = patients.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRisk = filterRisk === 'All' || p.riskLevel === filterRisk;
    return matchesSearch && matchesRisk;
  });

  return (
    <div style={{ padding: '36px 40px', background: 'var(--surface)', minHeight: 'calc(100vh - 120px)' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        
        {/* Clinical Portal Header Banner */}
        <div className="glass-card" style={{ padding: '24px 32px', marginBottom: '24px', background: 'linear-gradient(135deg, #1e293b, var(--primary-container))', color: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Stethoscope size={28} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Clinical Command Portal</h1>
                  <span className="badge-pill badge-green" style={{ background: '#ffffff', color: 'var(--primary-container)' }}>Live Roster Active</span>
                </div>
                <p style={{ fontSize: '0.88rem', opacity: 0.9, marginTop: '2px' }}>
                  Log in as: <strong>{doctorProfile?.name || 'Dr. Robert Vance, PT'}</strong> • Lead Senior Physiotherapist
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '1.3rem', fontWeight: 800 }}>142</div>
                <div style={{ fontSize: '0.72rem', opacity: 0.8 }}>Active Seniors</div>
              </div>
              <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '1.3rem', fontWeight: 800 }}>98.4%</div>
                <div style={{ fontSize: '0.72rem', opacity: 0.8 }}>Safety Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Portal Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '28px', borderBottom: '2px solid var(--outline-variant)', paddingBottom: '12px' }}>
          <button
            onClick={() => setActiveTab('roster')}
            style={{
              padding: '10px 20px',
              borderRadius: 'var(--radius-pill)',
              border: activeTab === 'roster' ? '2px solid var(--secondary)' : '1px solid var(--outline-variant)',
              background: activeTab === 'roster' ? '#e0f2fe' : '#ffffff',
              color: activeTab === 'roster' ? 'var(--secondary)' : 'var(--ink-primary)',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Users size={18} /> Patient Roster & EHR Records ({patients.length})
          </button>

          <button
            onClick={() => setActiveTab('doctor-profile')}
            style={{
              padding: '10px 20px',
              borderRadius: 'var(--radius-pill)',
              border: activeTab === 'doctor-profile' ? '2px solid var(--secondary)' : '1px solid var(--outline-variant)',
              background: activeTab === 'doctor-profile' ? '#e0f2fe' : '#ffffff',
              color: activeTab === 'doctor-profile' ? 'var(--secondary)' : 'var(--ink-primary)',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <User size={18} /> Doctor Profile & Credentials
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            style={{
              padding: '10px 20px',
              borderRadius: 'var(--radius-pill)',
              border: activeTab === 'analytics' ? '2px solid var(--secondary)' : '1px solid var(--outline-variant)',
              background: activeTab === 'analytics' ? '#e0f2fe' : '#ffffff',
              color: activeTab === 'analytics' ? 'var(--secondary)' : 'var(--ink-primary)',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Activity size={18} /> Practice Analytics & Vitality Stats
          </button>
        </div>

        {/* TAB 1: PATIENT ROSTER & EHR RECORDS */}
        {activeTab === 'roster' && (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '28px' }}>
            
            {/* Main Roster Column */}
            <div className="glass-card" style={{ padding: '24px', background: '#ffffff' }}>
              
              {/* Filter & Search Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ position: 'relative', minWidth: '280px' }}>
                  <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-secondary)' }} />
                  <input 
                    type="text" 
                    placeholder="Search patient name or ID..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    style={{ width: '100%', padding: '8px 12px 8px 36px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--outline-variant)', fontSize: '0.85rem' }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Filter size={16} style={{ color: 'var(--ink-secondary)' }} />
                  <span style={{ fontSize: '0.82rem', fontWeight: 700 }}>Risk Level:</span>
                  {['All', 'Low', 'Medium', 'High'].map(risk => (
                    <button
                      key={risk}
                      onClick={() => setFilterRisk(risk)}
                      style={{
                        padding: '4px 12px',
                        borderRadius: 'var(--radius-pill)',
                        border: filterRisk === risk ? '2px solid var(--secondary)' : '1px solid var(--outline-variant)',
                        background: filterRisk === risk ? '#e0f2fe' : '#ffffff',
                        color: filterRisk === risk ? 'var(--secondary)' : 'var(--ink-primary)',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {risk}
                    </button>
                  ))}
                </div>
              </div>

              {/* Patients Table */}
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--surface-container-high)', textAlign: 'left', color: 'var(--ink-secondary)' }}>
                      <th style={{ padding: '10px' }}>Patient</th>
                      <th style={{ padding: '10px' }}>Age</th>
                      <th style={{ padding: '10px' }}>Mobility Score</th>
                      <th style={{ padding: '10px' }}>Risk Level</th>
                      <th style={{ padding: '10px' }}>Care Plan</th>
                      <th style={{ padding: '10px' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPatients.map(p => (
                      <tr 
                        key={p.id}
                        onClick={() => setSelectedPatient(p)}
                        style={{ 
                          borderBottom: '1px solid var(--surface-container)', 
                          cursor: 'pointer',
                          background: selectedPatient?.id === p.id ? '#e0f2fe' : 'transparent',
                          transition: 'background 0.2s ease'
                        }}
                      >
                        <td style={{ padding: '12px 10px', fontWeight: 700, color: 'var(--ink-primary)' }}>
                          {p.name}
                          <div style={{ fontSize: '0.75rem', color: 'var(--ink-secondary)', fontWeight: 500 }}>ID: {p.id}</div>
                        </td>
                        <td style={{ padding: '12px 10px' }}>{p.age} yrs</td>
                        <td style={{ padding: '12px 10px' }}>
                          <strong style={{ color: 'var(--primary-container)', fontSize: '1rem' }}>{p.mobilityScore}</strong> / 100
                        </td>
                        <td style={{ padding: '12px 10px' }}>
                          <span className={`badge-pill ${p.riskLevel === 'High' ? 'badge-amber' : p.riskLevel === 'Medium' ? 'badge-amber' : 'badge-green'}`}>
                            {p.riskLevel} Risk
                          </span>
                        </td>
                        <td style={{ padding: '12px 10px', fontSize: '0.82rem', color: 'var(--ink-secondary)' }}>{p.plan}</td>
                        <td style={{ padding: '12px 10px' }}>
                          <button className="btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
                            Review EHR <ChevronRight size={12} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>

            {/* Selected Patient Details Panel */}
            <div>
              <div className="glass-card-cream" style={{ padding: '24px', border: '2px solid var(--secondary)' }}>
                {selectedPatient ? (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--ink-primary)' }}>Patient File: {selectedPatient.name}</h3>
                      <span className="badge-pill badge-green">ACTIVE CLINICAL RECORD</span>
                    </div>

                    <div style={{ background: '#ffffff', padding: '14px', borderRadius: 'var(--radius-sm)', marginBottom: '16px', fontSize: '0.85rem' }}>
                      <div style={{ marginBottom: '6px' }}><strong>Phone:</strong> {selectedPatient.phone}</div>
                      <div style={{ marginBottom: '6px' }}><strong>Last Exam Date:</strong> {selectedPatient.lastVisit}</div>
                      <div style={{ marginBottom: '6px' }}><strong>Prescribed Care Plan:</strong> {selectedPatient.plan}</div>
                      <div><strong>Mobility Score:</strong> <span style={{ color: 'var(--primary-container)', fontWeight: 800 }}>{selectedPatient.mobilityScore}/100</span></div>
                    </div>

                    <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '8px' }}>Physiotherapist Clinical Notes:</h4>
                    <textarea 
                      rows={4}
                      defaultValue="Gait symmetry improved by 6%. Patient reports minimal morning joint stiffness after initiating quadriceps stretching routine."
                      style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--outline-variant)', fontSize: '0.85rem', marginBottom: '16px' }}
                    />

                    <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '10px 0', fontSize: '0.9rem', background: 'var(--secondary)' }}>
                      Save & Update Patient File
                    </button>
                  </>
                ) : (
                  <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--ink-secondary)' }}>
                    <Users size={36} style={{ margin: '0 auto 12px auto', opacity: 0.5 }} />
                    <p style={{ fontSize: '0.9rem' }}>Select any patient row on the left to inspect their EHR record and update clinical notes.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: DOCTOR PROFILE & CREDENTIALS */}
        {activeTab === 'doctor-profile' && (
          <ProfileView 
            user={doctorProfile}
            role="Physiotherapist"
            onUpdateProfile={(updated) => setDoctorProfile({ ...doctorProfile, ...updated })}
          />
        )}

        {/* TAB 3: PRACTICE ANALYTICS */}
        {activeTab === 'analytics' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            <div className="glass-card" style={{ padding: '24px', background: '#ffffff' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--ink-secondary)', textTransform: 'uppercase', marginBottom: '8px' }}>
                TOTAL REHABILITATION SESSIONS
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--secondary)' }}>1,480+</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--ink-secondary)', marginTop: '8px' }}>Completed across all Delhi & NCR clinical branches</p>
            </div>

            <div className="glass-card" style={{ padding: '24px', background: '#ffffff' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--ink-secondary)', textTransform: 'uppercase', marginBottom: '8px' }}>
                AVG MOBILITY IMPROVEMENT
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary-container)' }}>+18.4%</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--ink-secondary)', marginTop: '8px' }}>Measured over 30-day post-op & arthritis care cycles</p>
            </div>

            <div className="glass-card" style={{ padding: '24px', background: '#ffffff' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--ink-secondary)', textTransform: 'uppercase', marginBottom: '8px' }}>
                FALL PREVENTION SUCCESS
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#166534' }}>99.2%</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--ink-secondary)', marginTop: '8px' }}>Zero reported incident rate among enrolled seniors</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
