import React, { useState } from 'react';
import { Calendar, Clock, Star, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function FullServiceDetailsView({ onProceedToPayment }) {
  const [selectedDate, setSelectedDate] = useState('2026-07-30');
  const [selectedSlot, setSelectedSlot] = useState('10:00 AM');

  const timeSlots = ['9:00 AM', '10:00 AM', '11:30 AM', '1:30 PM', '3:00 PM', '4:30 PM'];

  return (
    <div style={{ padding: '36px 24px', background: 'var(--surface)', minHeight: 'calc(100vh - 120px)' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px', alignItems: 'flex-start' }}>
          
          {/* Left Column: Service Details */}
          <div className="glass-card" style={{ padding: '28px' }}>
            <img 
              src="/assets/consultation.png" 
              alt="Physiotherapy Assessment" 
              style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '20px' }}
            />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span className="badge-pill badge-green">MOST POPULAR CLINICAL SESSION</span>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-container)' }}>₹1,499</div>
            </div>

            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--ink-primary)', marginBottom: '10px' }}>
              Physiotherapy & Mobility Assessment
            </h1>

            <p style={{ fontSize: '0.95rem', color: 'var(--ink-secondary)', lineHeight: 1.5, marginBottom: '20px' }}>
              Comprehensive 1-on-1 physical examination evaluating joint range of motion, gait symmetry, and muscle endurance with senior clinical specialists.
            </p>

            <div style={{ borderTop: '1px solid var(--surface-container)', paddingTop: '16px' }}>
              <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '8px' }}>Included in this 60-min Session:</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem', color: 'var(--ink-primary)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle size={15} style={{ color: 'var(--primary-container)' }} /> Full body gait & stride symmetry evaluation</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle size={15} style={{ color: 'var(--primary-container)' }} /> Joint fluid lubrication & flexibility testing</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle size={15} style={{ color: 'var(--primary-container)' }} /> Custom 4-week exercise roadmap generation</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Time Slot Selector */}
          <div className="glass-card-cream" style={{ padding: '28px', border: '2px solid var(--primary-container)' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--ink-primary)', marginBottom: '14px' }}>
              Select Date & Slot
            </h2>

            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '6px' }}>
                Session Date
              </label>
              <input 
                type="date" 
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--outline-variant)', fontSize: '0.9rem' }}
              />
            </div>

            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '8px' }}>
              Available Time Slots
            </label>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '24px' }}>
              {timeSlots.map(time => (
                <button
                  key={time}
                  onClick={() => setSelectedSlot(time)}
                  style={{
                    padding: '10px',
                    borderRadius: 'var(--radius-sm)',
                    border: selectedSlot === time ? '2px solid var(--primary-container)' : '1px solid var(--outline-variant)',
                    background: selectedSlot === time ? 'var(--primary-container)' : '#ffffff',
                    color: selectedSlot === time ? '#ffffff' : 'var(--ink-primary)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: '0.85rem'
                  }}
                >
                  {time}
                </button>
              ))}
            </div>

            <button 
              className="btn-primary" 
              style={{ width: '100%', justifyContent: 'center', padding: '12px 0', fontSize: '0.95rem' }}
              onClick={() => onProceedToPayment({ date: selectedDate, slot: selectedSlot })}
            >
              Proceed to Payment Details <ArrowRight size={16} />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
