import React, { useState, useEffect } from 'react';
import { Activity, Heart, Calendar, CheckCircle2, MessageSquare, Video, ShieldCheck, ChevronRight, Award, Plus, Sparkles, TrendingUp, RefreshCw, User, FileText } from 'lucide-react';
import ProfileView from './ProfileView';

export default function UserDashboard({ user, onBookSession }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'profile' | 'records' | 'chat'
  const [userProfile, setUserProfile] = useState(user || {
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@vitality.org',
    role: 'Senior Member',
    id: 'KA-89421'
  });

  const [exercises, setExercises] = useState([
    { id: 1, title: 'Seated Ankle Pumps (15 reps)', completed: true, time: 'Morning' },
    { id: 2, title: 'Standing Quadriceps Stretch (30s)', completed: true, time: 'Morning' },
    { id: 3, title: 'Chair Squat Fluidity (10 reps)', completed: false, time: 'Afternoon' },
    { id: 4, title: 'Gentle Arm Circles (12 reps)', completed: false, time: 'Evening' },
  ]);

  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([
    { sender: 'doc', text: `Hello ${userProfile?.name || 'Sarah'}! Great job hitting 8,450 steps today. Your knee symmetry index looks fantastic!` },
    { sender: 'user', text: 'Thank you Dr. Vance! The morning ankle pumps really helped reduce joint stiffness.' }
  ]);

  const [dbBookings, setDbBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  useEffect(() => {
    fetchUserBookings();
  }, []);

  const fetchUserBookings = async () => {
    setLoadingBookings(true);
    try {
      const response = await fetch('http://localhost:5000/api/bookings');
      const data = await response.json();
      if (data.success && data.bookings) {
        setDbBookings(data.bookings);
      }
    } catch (err) {
      console.warn('Booking fetch warning:', err);
    }
    setLoadingBookings(false);
  };

  const toggleExercise = (id) => {
    setExercises(exercises.map(ex => ex.id === id ? { ...ex, completed: !ex.completed } : ex));
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setChatLog([...chatLog, { sender: 'user', text: message }]);
    setMessage('');
    setTimeout(() => {
      setChatLog(prev => [...prev, { sender: 'doc', text: `Thanks for updating me! I will review your latest telemetry before our appointment.` }]);
    }, 1200);
  };

  const latestBooking = dbBookings.length > 0 ? dbBookings[0] : null;

  return (
    <div style={{ padding: '36px 40px 80px 40px', background: 'var(--surface)', minHeight: 'calc(100vh - 120px)' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        
        {/* User Welcome Banner */}
        <div className="glass-card-cream" style={{ padding: '24px 32px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <img 
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200" 
              alt={userProfile?.name || 'Senior Member'}
              style={{ width: '68px', height: '68px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--primary-container)' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h1 style={{ fontSize: '1.7rem', fontWeight: 800, color: 'var(--ink-primary)' }}>Welcome back, {userProfile?.name || 'Sarah'}!</h1>
                <span className="badge-pill badge-green"><Sparkles size={12} /> Verified Member Portal</span>
              </div>
              <p style={{ fontSize: '0.92rem', color: 'var(--ink-secondary)', marginTop: '4px' }}>
                Member ID: {userProfile?.id || 'KA-89421'} • Care Specialist: <strong>Dr. Robert Vance, PT</strong>
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn-emerald" onClick={onBookSession}>
              <Calendar size={16} /> Book Next Session
            </button>
          </div>
        </div>

        {/* Portal Section Navigation Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '28px', borderBottom: '2px solid var(--outline-variant)', paddingBottom: '12px' }}>
          <button
            onClick={() => setActiveTab('overview')}
            style={{
              padding: '10px 20px',
              borderRadius: 'var(--radius-pill)',
              border: activeTab === 'overview' ? '2px solid var(--primary-container)' : '1px solid var(--outline-variant)',
              background: activeTab === 'overview' ? '#e6f4ea' : '#ffffff',
              color: activeTab === 'overview' ? 'var(--primary-container)' : 'var(--ink-primary)',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Activity size={18} /> Vitality Dashboard
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            style={{
              padding: '10px 20px',
              borderRadius: 'var(--radius-pill)',
              border: activeTab === 'profile' ? '2px solid var(--primary-container)' : '1px solid var(--outline-variant)',
              background: activeTab === 'profile' ? '#e6f4ea' : '#ffffff',
              color: activeTab === 'profile' ? 'var(--primary-container)' : 'var(--ink-primary)',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <User size={18} /> My Profile & Health Passport
          </button>

          <button
            onClick={() => setActiveTab('records')}
            style={{
              padding: '10px 20px',
              borderRadius: 'var(--radius-pill)',
              border: activeTab === 'records' ? '2px solid var(--primary-container)' : '1px solid var(--outline-variant)',
              background: activeTab === 'records' ? '#e6f4ea' : '#ffffff',
              color: activeTab === 'records' ? 'var(--primary-container)' : 'var(--ink-primary)',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <FileText size={18} /> Medical Session History ({dbBookings.length})
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            style={{
              padding: '10px 20px',
              borderRadius: 'var(--radius-pill)',
              border: activeTab === 'chat' ? '2px solid var(--primary-container)' : '1px solid var(--outline-variant)',
              background: activeTab === 'chat' ? '#e6f4ea' : '#ffffff',
              color: activeTab === 'chat' ? 'var(--primary-container)' : 'var(--ink-primary)',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <MessageSquare size={18} /> Doctor Care Chat
          </button>
        </div>

        {/* TAB 1: OVERVIEW & TELEMETRY */}
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '28px' }}>
            
            {/* LEFT COLUMN: Metrics & Trackers */}
            <div>
              
              {/* Top Vitality Score & Daily Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
                
                {/* Mobility Index Card */}
                <div className="glass-card" style={{ padding: '20px' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink-secondary)', textTransform: 'uppercase', marginBottom: '8px' }}>
                    MOBILITY VITALITY INDEX
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                    <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary-container)', fontFamily: 'var(--font-headline)' }}>92</span>
                    <span style={{ fontSize: '1rem', color: 'var(--ink-secondary)', fontWeight: 600 }}>/ 100</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--emerald-accent)', fontSize: '0.82rem', fontWeight: 600, marginTop: '6px' }}>
                    <TrendingUp size={14} /> +4% this week
                  </div>
                </div>

                {/* Step Goal Tracker */}
                <div className="glass-card" style={{ padding: '20px' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink-secondary)', textTransform: 'uppercase', marginBottom: '8px' }}>
                    DAILY STEPS
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--ink-primary)', fontFamily: 'var(--font-headline)' }}>
                    8,450
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--primary-container)', fontWeight: 600, marginTop: '6px' }}>
                    Goal: 8,000 steps (105% met)
                  </div>
                </div>

                {/* Heart Rate & Active mins */}
                <div className="glass-card" style={{ padding: '20px' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink-secondary)', textTransform: 'uppercase', marginBottom: '8px' }}>
                    ACTIVE MINUTES
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--secondary)', fontFamily: 'var(--font-headline)' }}>
                    45 <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>mins</span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--ink-secondary)', fontWeight: 600, marginTop: '6px' }}>
                    Avg HR: 72 bpm
                  </div>
                </div>

              </div>

              {/* Prescribed Daily Exercises Routine */}
              <div className="glass-card" style={{ padding: '24px', marginBottom: '28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--ink-primary)' }}>Prescribed Daily Exercises</h3>
                  <span style={{ fontSize: '0.82rem', color: 'var(--ink-secondary)', fontWeight: 600 }}>2 of 4 Completed</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {exercises.map(ex => (
                    <div 
                      key={ex.id}
                      onClick={() => toggleExercise(ex.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justify: 'space-between',
                        padding: '12px 16px',
                        borderRadius: 'var(--radius-sm)',
                        background: ex.completed ? '#f0fdf4' : '#ffffff',
                        border: ex.completed ? '1px solid #bbf7d0' : '1px solid var(--surface-container-high)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '22px', height: '22px', borderRadius: '50%', border: ex.completed ? 'none' : '2px solid var(--outline)', background: ex.completed ? 'var(--primary-container)' : 'transparent', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {ex.completed && <CheckCircle2 size={14} />}
                        </div>
                        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: ex.completed ? 'var(--ink-secondary)' : 'var(--ink-primary)', textDecoration: ex.completed ? 'line-through' : 'none' }}>
                          {ex.title}
                        </span>
                      </div>
                      <span className="badge-pill" style={{ background: '#ffffff', color: 'var(--ink-secondary)', fontSize: '0.72rem' }}>
                        {ex.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Appointments & Telehealth Chat Preview */}
            <div>
              
              {/* Upcoming Appointment Card */}
              <div className="glass-card-cream" style={{ padding: '22px', marginBottom: '28px', border: '2px solid var(--primary-container)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-container)', fontWeight: 700, fontSize: '0.82rem', marginBottom: '12px' }}>
                  <Calendar size={16} /> UPCOMING CLINICAL SESSION
                </div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--ink-primary)', marginBottom: '4px' }}>
                  {latestBooking ? latestBooking.serviceTitle : 'Physiotherapy & Mobility Assessment'}
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--ink-secondary)', marginBottom: '14px' }}>
                  {latestBooking ? `${latestBooking.date} @ ${latestBooking.slot}` : 'Tomorrow @ 10:00 AM IST'}
                </p>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#ffffff', padding: '10px', borderRadius: 'var(--radius-sm)', marginBottom: '14px' }}>
                  <img 
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=120" 
                    alt="Dr. Vance" 
                    style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--ink-primary)' }}>Dr. Robert Vance, PT</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--ink-secondary)' }}>Lead Senior Physiotherapist</div>
                  </div>
                </div>

                <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '10px 0' }}>
                  <Video size={16} /> Join Virtual Room
                </button>
              </div>

              {/* Direct Chat Preview */}
              <div className="glass-card" style={{ padding: '22px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MessageSquare size={18} style={{ color: 'var(--primary-container)' }} />
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink-primary)' }}>Care Specialist Chat</h3>
                  </div>
                  <button onClick={() => setActiveTab('chat')} style={{ background: 'none', border: 'none', color: 'var(--primary-container)', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}>
                    Expand Chat ➔
                  </button>
                </div>

                <div style={{ background: 'var(--surface-cream)', padding: '12px', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', color: 'var(--ink-primary)', lineHeight: 1.4 }}>
                  <strong>Dr. Vance:</strong> Great job hitting 8,450 steps today. Your knee symmetry index looks fantastic!
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: EDITABLE MEMBER PROFILE */}
        {activeTab === 'profile' && (
          <ProfileView 
            user={userProfile} 
            role="Senior Member" 
            onUpdateProfile={(updated) => setUserProfile({ ...userProfile, ...updated })}
          />
        )}

        {/* TAB 3: MEDICAL SESSION HISTORY */}
        {activeTab === 'records' && (
          <div className="glass-card" style={{ padding: '28px', background: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--ink-primary)' }}>Complete Medical & Session Records</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--ink-secondary)', marginTop: '2px' }}>Verified clinical logs, payments, and physiotherapist notes</p>
              </div>
              <button onClick={fetchUserBookings} className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.82rem' }}>
                <RefreshCw size={14} /> Refresh Records
              </button>
            </div>

            {loadingBookings ? (
              <p style={{ fontSize: '0.9rem', color: 'var(--ink-secondary)' }}>Loading medical logs...</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--outline-variant)', textAlign: 'left', color: 'var(--ink-secondary)' }}>
                      <th style={{ padding: '12px' }}>Booking Ref</th>
                      <th style={{ padding: '12px' }}>Clinical Care Service</th>
                      <th style={{ padding: '12px' }}>Date & Time Slot</th>
                      <th style={{ padding: '12px' }}>Payment Amount</th>
                      <th style={{ padding: '12px' }}>Payment Mode</th>
                      <th style={{ padding: '12px' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dbBookings.map((b, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid var(--surface-container)' }}>
                        <td style={{ padding: '14px 12px', fontWeight: 700, color: 'var(--primary-container)' }}>{b.bookingId || b._id}</td>
                        <td style={{ padding: '14px 12px', fontWeight: 700 }}>{b.serviceTitle}</td>
                        <td style={{ padding: '14px 12px' }}>{b.date} @ {b.slot}</td>
                        <td style={{ padding: '14px 12px', fontWeight: 800 }}>{b.price}</td>
                        <td style={{ padding: '14px 12px', fontSize: '0.82rem', color: 'var(--ink-secondary)' }}>{b.paymentMethod || 'UPI / Vitality Pass'}</td>
                        <td style={{ padding: '14px 12px' }}>
                          <span className="badge-pill badge-green">{b.status || 'Confirmed'}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: EXPANDED DOCTOR CARE CHAT */}
        {activeTab === 'chat' && (
          <div className="glass-card" style={{ padding: '28px', background: '#ffffff', maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px', borderBottom: '1px solid var(--surface-container-high)', pb: '14px' }}>
              <img 
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=120" 
                alt="Dr. Vance" 
                style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--ink-primary)' }}>Dr. Robert Vance, PT</h3>
                <div style={{ fontSize: '0.82rem', color: 'var(--emerald-accent)', fontWeight: 700 }}>🟢 Online • Lead Senior Physiotherapist</div>
              </div>
            </div>

            {/* Chat Box */}
            <div style={{ height: '360px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '10px', marginBottom: '20px' }}>
              {chatLog.map((c, i) => (
                <div 
                  key={i} 
                  style={{
                    alignSelf: c.sender === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '75%',
                    background: c.sender === 'user' ? 'var(--primary-container)' : 'var(--surface-cream)',
                    color: c.sender === 'user' ? '#ffffff' : 'var(--ink-primary)',
                    padding: '12px 18px',
                    borderRadius: '16px',
                    fontSize: '0.92rem',
                    lineHeight: 1.5,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }}
                >
                  {c.text}
                </div>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={sendMessage} style={{ display: 'flex', gap: '10px' }}>
              <input 
                type="text" 
                placeholder="Type your message to Dr. Vance..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                style={{ flex: 1, padding: '12px 18px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--outline-variant)', fontSize: '0.95rem' }}
              />
              <button type="submit" className="btn-emerald" style={{ padding: '12px 24px', fontSize: '0.95rem' }}>
                Send Message
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
