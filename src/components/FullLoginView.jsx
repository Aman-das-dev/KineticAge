import React, { useState } from 'react';
import { Heart, Stethoscope, ArrowRight, ShieldCheck, UserCheck, Key, AlertCircle } from 'lucide-react';
import { apiService } from '../services/api';

export default function FullLoginView({ onLoginSuccess, onGoToRegister }) {
  const [role, setRole] = useState('Senior Member');
  const [email, setEmail] = useState('sarah.jenkins@vitality.org');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await apiService.login(email, password, role);
      setLoading(false);
      if (res.success && res.user) {
        localStorage.setItem('kinetic_token', res.token || 'real-jwt-token');
        localStorage.setItem('kinetic_user', JSON.stringify(res.user));
        onLoginSuccess(res.user);
      } else {
        setErrorMessage(res.message || 'Invalid email or password for this role.');
      }
    } catch (err) {
      setLoading(false);
      setErrorMessage('Network connection error. Trying offline fallback...');
    }
  };

  const quickLoginAs = (targetRole) => {
    setRole(targetRole);
    if (targetRole === 'Physiotherapist') {
      setEmail('robert.vance@kineticage.clinic');
      setPassword('doctor123');
    } else {
      setEmail('sarah.jenkins@vitality.org');
      setPassword('password123');
    }
    setTimeout(() => {
      handleSubmit(null);
    }, 100);
  };

  return (
    <div style={{ padding: '60px 24px', background: 'var(--surface)', minHeight: 'calc(100vh - 120px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '480px', padding: '40px', background: '#ffffff', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: role === 'Physiotherapist' ? 'var(--secondary)' : 'var(--primary-container)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px auto', boxShadow: '0 8px 16px rgba(13,99,27,0.2)' }}>
            {role === 'Physiotherapist' ? <Stethoscope size={28} /> : <Heart size={28} />}
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--ink-primary)' }}>
            KineticAge Member Login
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--ink-secondary)', marginTop: '4px' }}>
            Access your senior care metrics & clinical consultations
          </p>
        </div>

        {/* 1-Click Fast Login Box */}
        <div style={{ background: 'var(--surface-cream)', padding: '14px', borderRadius: 'var(--radius-md)', marginBottom: '20px', border: '1px solid var(--outline-variant)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ink-secondary)', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Key size={12} /> Quick Access Accounts
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <button
              type="button"
              onClick={() => quickLoginAs('Senior Member')}
              style={{ padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--primary-container)', background: '#ffffff', color: 'var(--primary-container)', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <span>Member: Sarah Jenkins</span>
              <span style={{ fontSize: '0.72rem', opacity: 0.85 }}>sarah.jenkins@vitality.org</span>
            </button>

            <button
              type="button"
              onClick={() => quickLoginAs('Physiotherapist')}
              style={{ padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--secondary)', background: '#ffffff', color: 'var(--secondary)', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <span>Doctor: Dr. Robert Vance, PT</span>
              <span style={{ fontSize: '0.72rem', opacity: 0.85 }}>robert.vance@kineticage.clinic</span>
            </button>
          </div>
        </div>

        {/* Role Toggle */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
          <button
            type="button"
            onClick={() => { setRole('Senior Member'); setEmail('sarah.jenkins@vitality.org'); setPassword('password123'); }}
            style={{
              padding: '10px',
              borderRadius: 'var(--radius-sm)',
              border: role === 'Senior Member' ? '2px solid var(--primary-container)' : '1px solid var(--outline-variant)',
              background: role === 'Senior Member' ? '#e6f4ea' : '#ffffff',
              color: role === 'Senior Member' ? 'var(--primary-container)' : 'var(--ink-secondary)',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              gap: '6px'
            }}
          >
            <UserCheck size={16} /> Senior Member
          </button>
          
          <button
            type="button"
            onClick={() => { setRole('Physiotherapist'); setEmail('robert.vance@kineticage.clinic'); setPassword('doctor123'); }}
            style={{
              padding: '10px',
              borderRadius: 'var(--radius-sm)',
              border: role === 'Physiotherapist' ? '2px solid var(--secondary)' : '1px solid var(--outline-variant)',
              background: role === 'Physiotherapist' ? '#e0f2fe' : '#ffffff',
              color: role === 'Physiotherapist' ? 'var(--secondary)' : 'var(--ink-secondary)',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              gap: '6px'
            }}
          >
            <Stethoscope size={16} /> Doctor Portal
          </button>
        </div>

        {/* Error Alert Message */}
        {errorMessage && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '10px 14px', borderRadius: 'var(--radius-sm)', fontSize: '0.82rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={16} /> {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '6px' }}>
              Email Address
            </label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--outline-variant)', fontSize: '0.92rem' }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '6px' }}>
              Password
            </label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--outline-variant)', fontSize: '0.92rem' }}
            />
          </div>

          <button 
            className="btn-primary" 
            style={{ width: '100%', justifyContent: 'center', padding: '12px 0', fontSize: '1rem', background: role === 'Physiotherapist' ? 'var(--secondary)' : undefined, color: '#ffffff' }} 
            type="submit"
            disabled={loading}
          >
            {loading ? 'Authenticating...' : `Sign In as ${role}`} <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.88rem', color: 'var(--ink-secondary)' }}>
          Don't have a senior member account?{' '}
          <button 
            onClick={onGoToRegister} 
            style={{ background: 'none', border: 'none', color: 'var(--primary-container)', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}
          >
            Register New Account
          </button>
        </div>

      </div>
    </div>
  );
}
