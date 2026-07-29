import React from 'react';
import { CheckCircle2, Calendar, Heart, ArrowRight } from 'lucide-react';

export default function FullSuccessView({ onGoToDashboard }) {
  return (
    <div style={{ padding: '60px 24px', background: 'var(--surface)', minHeight: 'calc(100vh - 120px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '560px', padding: '48px', background: '#ffffff', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
        
        <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#e6f4ea', color: 'var(--primary-container)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto' }}>
          <CheckCircle2 size={44} />
        </div>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 16px', borderRadius: 'var(--radius-pill)', background: '#e6f4ea', color: 'var(--primary-container)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '16px' }}>
          Stitch Step 8: Booking Success Screen
        </div>

        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--ink-primary)', marginBottom: '12px' }}>
          Appointment Successfully Booked!
        </h1>

        <p style={{ fontSize: '1.05rem', color: 'var(--ink-secondary)', lineHeight: 1.6, marginBottom: '32px' }}>
          Your appointment is locked in for <strong>Tomorrow @ 10:00 AM EST</strong>. A confirmation SMS with directions and prep details has been sent to (555) 234-5678.
        </p>

        <button className="btn-primary" style={{ padding: '14px 32px', fontSize: '1.05rem', margin: '0 auto' }} onClick={onGoToDashboard}>
          <Heart size={18} /> Open Senior Member Dashboard (Step 9) <ArrowRight size={18} />
        </button>

      </div>
    </div>
  );
}
