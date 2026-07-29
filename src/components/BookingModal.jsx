import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, User, Phone, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export default function BookingModal({ selectedService, onClose, onBookingSuccess }) {
  const [step, setStep] = useState(1); // 1: Patient Info, 2: Slot Picker, 3: Confirmation
  const [patientName, setPatientName] = useState('Sarah Jenkins');
  const [phone, setPhone] = useState('(555) 234-5678');
  const [date, setDate] = useState('2026-07-30');
  const [slot, setSlot] = useState('10:00 AM');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const serviceTitle = selectedService ? selectedService.title : 'Physiotherapy & Mobility Assessment';
  const servicePrice = selectedService ? selectedService.price : '₹1,499';

  const timeSlots = ['9:00 AM', '10:00 AM', '11:30 AM', '1:30 PM', '3:00 PM', '4:30 PM'];

  const handleConfirmBooking = async () => {
    setIsSubmitting(true);
    const bookingPayload = {
      serviceTitle,
      patientName,
      phone,
      date,
      slot,
      price: servicePrice,
      status: 'Confirmed'
    };

    if (onBookingSuccess) {
      await onBookingSuccess(bookingPayload);
    }

    setIsSubmitting(false);
    setStep(3);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div className="glass-card animate-scale-up" style={{ width: '100%', maxWidth: '520px', background: '#ffffff', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
        
        {/* Modal Header */}
        <div style={{ background: 'var(--primary-container)', color: '#ffffff', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.9 }}>
              Clinical Session Booking
            </div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800 }}>
              {serviceTitle}
            </div>
          </div>

          <button 
            onClick={onClose}
            style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#ffffff', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px' }}>
          
          {/* Progress Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: step >= 1 ? 'var(--primary-container)' : '#e2e8f0', color: step >= 1 ? '#ffffff' : '#64748b', fontSize: '0.82rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1</div>
            <div style={{ width: '40px', height: '2px', background: step >= 2 ? 'var(--primary-container)' : '#e2e8f0' }} />
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: step >= 2 ? 'var(--primary-container)' : '#e2e8f0', color: step >= 2 ? '#ffffff' : '#64748b', fontSize: '0.82rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</div>
            <div style={{ width: '40px', height: '2px', background: step >= 3 ? 'var(--primary-container)' : '#e2e8f0' }} />
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: step >= 3 ? 'var(--primary-container)' : '#e2e8f0', color: step >= 3 ? '#ffffff' : '#64748b', fontSize: '0.82rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</div>
          </div>

          {step === 1 && (
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '16px' }}>
                Step 1: Patient Information
              </h3>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '6px' }}>
                  Full Patient Name
                </label>
                <input 
                  type="text" 
                  value={patientName}
                  onChange={e => setPatientName(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--outline-variant)', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '6px' }}>
                  Contact Phone Number
                </label>
                <input 
                  type="text" 
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--outline-variant)', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ background: 'var(--surface-cream)', padding: '12px 16px', borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--ink-secondary)' }}>Session Fee:</span>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary-container)' }}>{servicePrice}</span>
              </div>

              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setStep(2)}>
                Next: Choose Date & Slot <ArrowRight size={16} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '16px' }}>
                Step 2: Choose Appointment Time
              </h3>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '6px' }}>
                  Select Date
                </label>
                <input 
                  type="date" 
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--outline-variant)', fontSize: '0.9rem' }}
                />
              </div>

              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '8px' }}>
                Available Time Slots
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '24px' }}>
                {timeSlots.map(t => (
                  <button
                    key={t}
                    onClick={() => setSlot(t)}
                    style={{
                      padding: '10px',
                      borderRadius: 'var(--radius-sm)',
                      border: slot === t ? '2px solid var(--primary-container)' : '1px solid var(--outline-variant)',
                      background: slot === t ? '#e6f4ea' : '#ffffff',
                      color: slot === t ? 'var(--primary-container)' : 'var(--ink-primary)',
                      fontWeight: slot === t ? 700 : 500,
                      cursor: 'pointer',
                      fontSize: '0.85rem'
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="btn-secondary" style={{ flex: 1 }} onClick={() => setStep(1)}>Back</button>
                <button 
                  className="btn-primary" 
                  style={{ flex: 2, justifyContent: 'center' }} 
                  onClick={handleConfirmBooking}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving to Database...' : 'Confirm Session'}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ textAlign: 'center', padding: '12px 0' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#e6f4ea', color: 'var(--primary-container)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                <CheckCircle2 size={36} />
              </div>

              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--ink-primary)', marginBottom: '6px' }}>
                Booking Saved to MongoDB!
              </h3>
              
              <p style={{ fontSize: '0.9rem', color: 'var(--ink-secondary)', marginBottom: '20px' }}>
                Your appointment for <strong>{patientName}</strong> is reserved for <strong>{date} at {slot}</strong>. Fee: <strong>{servicePrice}</strong>.
              </p>

              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={onClose}>
                Done
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
