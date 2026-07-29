import React from 'react';
import { ArrowRight, ShieldCheck, Star, Users, CheckCircle, Play } from 'lucide-react';

export default function HeroSection({ onOpenBooking, onOpenAuth }) {
  return (
    <section style={{ padding: '36px 40px 44px 40px', background: 'var(--surface)', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '48px', alignItems: 'center' }}>
          
          {/* Left Hero Text Content */}
          <div className="animate-fade-in">
            
            {/* Pill Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: 'var(--radius-pill)', background: 'var(--surface-cream)', border: '1px solid var(--outline-variant)', marginBottom: '16px' }}>
              <span className="badge-pill badge-green">NATIONWIDE SENIOR WELLNESS</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--ink-secondary)' }}>Better Mobility. Better Tomorrow.</span>
            </div>

            {/* Main Headline */}
            <h1 style={{ fontSize: ' clamp(2.4rem, 4vw, 3.4rem)', fontWeight: 800, color: 'var(--ink-primary)', lineHeight: 1.12, letterSpacing: '-0.02em', marginBottom: '16px' }}>
              Empowering Seniors to <span style={{ color: 'var(--primary-container)' }}>Move Freely</span> & Live Confidently
            </h1>

            {/* Sub-description */}
            <p style={{ fontSize: '1.05rem', color: 'var(--ink-secondary)', lineHeight: 1.5, marginBottom: '28px', maxWidth: '680px' }}>
              Evidence-based clinical physiotherapy, joint health coaching, and personalized geriatric care plans tailored to keep you active, safe, and independent at home.
            </p>

            {/* Call To Action Buttons */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '32px' }}>
              <button 
                className="btn-emerald" 
                style={{ padding: '14px 28px', fontSize: '1rem' }}
                onClick={onOpenBooking}
              >
                Schedule Free Consultation <ArrowRight size={18} />
              </button>
              
              <button 
                className="btn-secondary" 
                style={{ padding: '14px 24px', fontSize: '1rem', background: '#ffffff' }}
                onClick={onOpenAuth}
              >
                Sign In to Member Portal
              </button>
            </div>

            {/* Trust Badges & Social Proof */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '28px', borderTop: '1px solid var(--surface-container)', paddingTop: '20px' }}>
              <div>
                <div style={{ display: 'flex', gap: '2px', color: '#eab308', marginBottom: '2px' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#eab308" />)}
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--ink-primary)' }}>4.9 / 5 Rating</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--ink-secondary)' }}>From 2,400+ Verified Seniors</div>
              </div>

              <div style={{ height: '32px', width: '1px', background: 'var(--outline-variant)' }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ display: 'flex', marginLeft: '-8px' }}>
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=80" style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #fff' }} alt="User" />
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=80" style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #fff', marginLeft: '-8px' }} alt="User" />
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=80" style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #fff', marginLeft: '-8px' }} alt="User" />
                </div>
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--ink-primary)' }}>15,000+ Active Sessions</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--ink-secondary)' }}>Across India</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Hero Image Card */}
          <div style={{ position: 'relative' }}>
            <div className="glass-card" style={{ padding: '16px', borderRadius: 'var(--radius-lg)', background: '#ffffff' }}>
              <img 
                src="/assets/hero-physio.png" 
                alt="Senior Wellness Specialist" 
                style={{ width: '100%', height: '380px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
              />
              
              {/* Floating Live Telemetry Badge */}
              <div style={{ position: 'absolute', bottom: '32px', left: '-20px', background: '#ffffff', padding: '14px 18px', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)', display: 'flex', alignItems: 'center', gap: '14px', border: '1px solid var(--surface-container-high)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#e6f4ea', color: 'var(--primary-container)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                  92%
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--ink-primary)' }}>Mobility Recovery Rate</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--emerald-accent)', fontWeight: 600 }}>Verified Clinical Trial</div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
