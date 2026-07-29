import React from 'react';
import { Activity, ShieldCheck, Heart, PhoneCall, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: '#111827', color: '#9ca3af', borderTop: '1px solid #1f2937', padding: '40px 40px 24px 40px' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr repeat(3, 1fr)', gap: '40px', marginBottom: '32px' }}>
          
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ffffff', marginBottom: '14px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--primary-container)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Activity size={20} />
              </div>
              <span style={{ fontFamily: 'var(--font-headline)', fontWeight: 800, fontSize: '1.4rem' }}>
                Kinetic<span style={{ color: 'var(--emerald-accent)' }}>Age</span>
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '16px', maxWidth: '320px' }}>
              India's premier senior wellness & mobility platform. Evidence-based physiotherapy, joint care, and fall prevention for active older adults.
            </p>
            <div style={{ fontSize: '0.8rem', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={14} style={{ color: 'var(--emerald-accent)' }} /> ISO 27001 Certified Health Platform
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.9rem', fontWeight: 700, marginBottom: '12px', textTransform: 'uppercase' }}>Clinical Care</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
              <li>Physiotherapy Assessment</li>
              <li>Joint Mobility Coaching</li>
              <li>Fall Prevention & Balance</li>
              <li>Geriatric Telehealth</li>
            </ul>
          </div>

          {/* Senior Support */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.9rem', fontWeight: 700, marginBottom: '12px', textTransform: 'uppercase' }}>Senior Support</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
              <li>Senior Vitality Pass</li>
              <li>Medicare Billing Help</li>
              <li>Family Caregiver Guide</li>
              <li>Find Clinical Center</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.9rem', fontWeight: 700, marginBottom: '12px', textTransform: 'uppercase' }}>Contact Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><PhoneCall size={14} /> 1-800-KINETIC (546-3842)</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Mail size={14} /> care@kineticage.in</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={14} /> New Delhi • Mumbai • Bengaluru</div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid #1f2937', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: '#6b7280' }}>
          <div>© 2026 KineticAge Senior Care Systems India Pvt. Ltd. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>HIPAA Compliance</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
