import React from 'react';
import { CheckCircle2, Printer, ArrowRight, ShieldCheck } from 'lucide-react';

export default function FullConfirmationView({ onProceedToSuccess }) {
  return (
    <div style={{ padding: '60px 24px', background: 'var(--surface)', minHeight: 'calc(100vh - 120px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '640px', padding: '40px', background: '#ffffff', borderRadius: 'var(--radius-lg)' }}>
        
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 16px', borderRadius: 'var(--radius-pill)', background: '#e6f4ea', color: 'var(--primary-container)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '20px' }}>
          Stitch Step 7: Booking Confirmation Pass
        </div>

        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--ink-primary)', marginBottom: '8px' }}>
          Booking Review & Pass Preview
        </h1>
        <p style={{ fontSize: '0.92rem', color: 'var(--ink-secondary)', marginBottom: '28px' }}>
          Confirmation Code: <strong style={{ color: 'var(--primary-container)' }}>KA-89421</strong>
        </p>

        {/* Printable Ticket */}
        <div style={{ background: 'var(--surface-cream)', border: '2px dashed var(--primary-container)', padding: '28px', borderRadius: 'var(--radius-md)', marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--outline-variant)', paddingBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--ink-secondary)', fontWeight: 700 }}>PATIENT PASS</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-container)' }}>Sarah Jenkins (Age 68)</div>
            </div>
            <span className="badge-pill badge-green">APPOINTMENT RESERVED</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '0.92rem' }}>
            <div>
              <span style={{ color: 'var(--ink-secondary)', display: 'block', fontSize: '0.8rem' }}>Session Title:</span>
              <strong>Physiotherapy & Mobility Assessment</strong>
            </div>
            <div>
              <span style={{ color: 'var(--ink-secondary)', display: 'block', fontSize: '0.8rem' }}>Scheduled Time:</span>
              <strong>Tomorrow @ 10:00 AM EST</strong>
            </div>
            <div>
              <span style={{ color: 'var(--ink-secondary)', display: 'block', fontSize: '0.8rem' }}>Clinical Specialist:</span>
              <strong>Dr. Robert Vance, PT</strong>
            </div>
            <div>
              <span style={{ color: 'var(--ink-secondary)', display: 'block', fontSize: '0.8rem' }}>Location:</span>
              <strong>Main KineticAge Center (Room 3B)</strong>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button className="btn-secondary" onClick={() => window.print()}>
            <Printer size={16} /> Print Confirmation
          </button>
          <button className="btn-primary" onClick={onProceedToSuccess}>
            Finalize Booking (Step 8) <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </div>
  );
}
