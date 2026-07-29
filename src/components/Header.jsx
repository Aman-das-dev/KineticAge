import React from 'react';
import { Activity, PhoneCall, Calendar, UserCheck, ShieldCheck, Stethoscope, LogOut, LogIn } from 'lucide-react';

export default function Header({ currentView, setCurrentView, onOpenAuth, onOpenBooking, user, isLoggedIn, onLogout }) {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--outline-variant)' }}>
      
      {/* Top Emergency Hotline & Compliance Banner */}
      <div style={{ background: 'var(--primary-container)', color: '#ffffff', padding: '6px 40px', fontSize: '0.82rem', fontWeight: 500, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <PhoneCall size={14} /> <span>Need immediate assistance? <strong>Senior Care Hotline: 1-800-KINETIC (546-3842)</strong></span>
        </div>
        
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <span><ShieldCheck size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> HIPAA & Medicare Compliant</span>
          <span>•</span>
          <span>Open Mon - Sat: 7am - 8pm EST</span>
        </div>
      </div>

      {/* Main Wide Header Bar */}
      <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '12px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Brand Logo */}
        <div 
          onClick={() => setCurrentView('landing')} 
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        >
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'var(--primary-container)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', boxShadow: '0 4px 12px rgba(13, 99, 27, 0.25)' }}>
            <Activity size={24} />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-headline)', fontWeight: 800, fontSize: '1.45rem', color: 'var(--ink-primary)', leading: 1 }}>
              Kinetic<span style={{ color: 'var(--primary-container)' }}>Age</span>
            </div>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-secondary)' }}>
              Senior Wellness & Mobility
            </div>
          </div>
        </div>

        {/* Clean Center: Active Portal Badge if Logged In */}
        <nav style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {isLoggedIn && (
            user.role === 'Senior Member' ? (
              <button 
                className="btn-secondary"
                onClick={() => setCurrentView('dashboard')}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary-container)', fontWeight: 700, padding: '8px 16px', borderRadius: 'var(--radius-pill)', fontSize: '0.88rem' }}
              >
                <Activity size={16} /> My Senior Dashboard
              </button>
            ) : (
              <button 
                className="btn-secondary"
                onClick={() => setCurrentView('admin')}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--secondary)', fontWeight: 700, padding: '8px 16px', borderRadius: 'var(--radius-pill)', fontSize: '0.88rem' }}
              >
                <Stethoscope size={16} /> Clinical Command Portal
              </button>
            )
          )}
        </nav>

        {/* Action Buttons & User Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button className="btn-secondary" style={{ padding: '10px 20px', fontSize: '0.9rem' }} onClick={onOpenBooking}>
            <Calendar size={16} /> Book Session
          </button>

          {isLoggedIn ? (
            /* Logged In User Profile Pill & Sign Out */
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div 
                onClick={() => setCurrentView(user.role === 'Senior Member' ? 'dashboard' : 'admin')}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--surface-cream)', padding: '6px 14px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--outline-variant)', cursor: 'pointer' }}
              >
                <img 
                  src={user.role === 'Physiotherapist' ? "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=120" : "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"} 
                  alt={user.name} 
                  style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--ink-primary)', lineHeight: 1.1 }}>{user.name}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--primary-container)', fontWeight: 600 }}>{user.role}</div>
                </div>
              </div>

              <button 
                onClick={onLogout}
                title="Sign Out"
                style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', borderRadius: '50%', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            /* Guest Sign In Trigger */
            <button 
              className="btn-primary" 
              style={{ padding: '10px 22px', fontSize: '0.9rem' }}
              onClick={onOpenAuth}
            >
              <LogIn size={16} /> Sign In
            </button>
          )}
        </div>

      </div>
    </header>
  );
}
