import React, { useState } from 'react';
import { HeartPulse, ShieldCheck, Award, Smile, CheckCircle, Sparkles, Flame } from 'lucide-react';

export default function WhyChooseSection() {
  const [stepGoal, setStepGoal] = useState(8450);

  const features = [
    {
      icon: <HeartPulse size={26} style={{ color: 'var(--primary-container)' }} />,
      title: 'Geriatric Specialists',
      desc: '100% licensed physical therapists trained specifically in senior joint mechanics and fall prevention.'
    },
    {
      icon: <ShieldCheck size={26} style={{ color: 'var(--primary-container)' }} />,
      title: 'In-Home & Virtual Visits',
      desc: 'Flexible scheduling. Receive clinical care from the comfort of your living room or at local clinics.'
    },
    {
      icon: <Award size={26} style={{ color: 'var(--primary-container)' }} />,
      title: 'Medicare & Insurance Covered',
      desc: 'We assist with reimbursement claims and direct billing to minimize out-of-pocket expenses.'
    },
    {
      icon: <Smile size={26} style={{ color: 'var(--primary-container)' }} />,
      title: 'Dedicated Care Coordinator',
      desc: 'Personalized 1-on-1 support team to answer questions, adjust routines, and guide your journey.'
    }
  ];

  return (
    <section style={{ padding: '40px 40px', background: 'var(--surface-cream)', borderTop: '1px solid var(--outline-variant)', borderBottom: '1px solid var(--outline-variant)' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        
        <div style={{ textCenter: 'center', maxWidth: '720px', margin: '0 auto 36px auto', textAlign: 'center' }}>
          <span className="badge-pill badge-green" style={{ marginBottom: '10px' }}>CLINICAL EXCELLENCE</span>
          <h2 style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--ink-primary)', marginBottom: '10px' }}>
            Why Families Trust KineticAge
          </h2>
          <p style={{ fontSize: '0.98rem', color: 'var(--ink-secondary)', lineHeight: 1.5 }}>
            Designed specifically for older adults who want to maintain vitality, prevent injuries, and stay active with loved ones.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '32px' }}>
          {features.map((feat, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '24px', background: '#ffffff', borderRadius: 'var(--radius-md)', transition: 'transform 0.2s ease', cursor: 'pointer' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#e6f4ea', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                {feat.icon}
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '8px' }}>
                {feat.title}
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--ink-secondary)', lineHeight: 1.45 }}>
                {feat.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Interactive Senior Telemetry Goal Widget */}
        <div className="glass-card" style={{ padding: '24px 32px', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', border: '2px solid var(--primary-container)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--primary-container)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Flame size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-container)', textTransform: 'uppercase' }}>Interactive Senior Tracker Demo</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--ink-primary)' }}>Daily Step Goal: {stepGoal.toLocaleString()} steps</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              className="btn-secondary"
              onClick={() => setStepGoal(prev => prev + 250)}
              style={{ padding: '8px 16px', fontSize: '0.88rem' }}
            >
              + Add 250 Steps Walked
            </button>
            <span style={{ fontSize: '0.85rem', color: 'var(--emerald-accent)', fontWeight: 700 }}>
              <CheckCircle size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> Goal Reached Today!
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
