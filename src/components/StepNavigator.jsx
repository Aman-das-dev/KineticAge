import React from 'react';
import { ArrowRight, CheckCircle2, ChevronRight, Play } from 'lucide-react';

export default function StepNavigator({ currentStep, setStepView }) {
  const steps = [
    { num: 1, id: 'landing', label: '1. Landing Page' },
    { num: 2, id: 'login', label: '2. Login' },
    { num: 3, id: 'register', label: '3. Registration' },
    { num: 4, id: 'services', label: '4. Services Catalog' },
    { num: 5, id: 'slot-picker', label: '5. Details & Slots' },
    { num: 6, id: 'payment', label: '6. Payment Details' },
    { num: 7, id: 'confirmation', label: '7. Booking Confirmation' },
    { num: 8, id: 'success', label: '8. Booking Success' },
    { num: 9, id: 'dashboard', label: '9. Member Dashboard' },
    { num: 10, id: 'admin', label: '10. Clinical Admin' }
  ];

  return (
    <div style={{ background: '#111827', color: '#ffffff', padding: '10px 24px', borderBottom: '2px solid var(--primary-container)', fontSize: '0.82rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: '#88d982' }}>
          <Play size={14} fill="#88d982" />
          <span>STITCH PROTOTYPE STEP FLOW (10 SCENARIOS):</span>
        </div>

        {/* Step Pills Row */}
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px', flex: 1, justifyContent: 'center' }}>
          {steps.map((s) => {
            const isActive = currentStep === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setStepView(s.id)}
                style={{
                  padding: '5px 12px',
                  borderRadius: 'var(--radius-pill)',
                  border: isActive ? '1px solid #88d982' : '1px solid #374151',
                  background: isActive ? 'var(--primary-container)' : '#1f2937',
                  color: isActive ? '#ffffff' : '#9ca3af',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease'
                }}
              >
                {s.label}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
