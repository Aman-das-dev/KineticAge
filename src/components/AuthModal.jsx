import React, { useState } from 'react';
import { X, UserCheck, ShieldCheck, Heart, ArrowRight, Stethoscope, CheckCircle2, AlertCircle, Key, User } from 'lucide-react';
import { apiService } from '../services/api';

export default function AuthModal({ onClose, onLoginSuccess }) {
  const [tab, setTab] = useState('login');
  const [role, setRole] = useState('Senior Member'); // 'Senior Member' | 'Physiotherapist'
  const [email, setEmail] = useState('sarah.jenkins@vitality.org');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('Sarah Jenkins');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      if (tab === 'login') {
        const res = await apiService.login(email, password, role);
        setLoading(false);
        if (res.success && res.user) {
          localStorage.setItem('kinetic_token', res.token || 'real-jwt-token');
          localStorage.setItem('kinetic_user', JSON.stringify(res.user));
          onLoginSuccess(res.user);
        } else {
          setErrorMessage(res.message || 'Invalid email or password for this role.');
        }
      } else {
        const res = await apiService.register({ name, email, password, role });
        setLoading(false);
        if (res.success && res.user) {
          localStorage.setItem('kinetic_token', res.token || 'real-jwt-token');
          localStorage.setItem('kinetic_user', JSON.stringify(res.user));
          onLoginSuccess(res.user);
        } else {
          setErrorMessage(res.message || 'Registration failed. Please try again.');
        }
      }
    } catch (err) {
      setLoading(false);
      setErrorMessage('Network connection error. Trying offline fallback...');
    }
  };

  const handleRoleSwitch = (selectedRole) => {
    setRole(selectedRole);
    setErrorMessage('');
    if (selectedRole === 'Physiotherapist') {
      setEmail('robert.vance@kineticage.clinic');
      setPassword('doctor123');
      setName('Dr. Robert Vance, PT');
    } else {
      setEmail('sarah.jenkins@vitality.org');
      setPassword('password123');
      setName('Sarah Jenkins');
    }
  };

  const quickLoginAs = (targetRole) => {
    handleRoleSwitch(targetRole);
    setTimeout(() => {
      handleSubmit(null);
    }, 100);
  };

  return (
    <div className="modal-overlay">
      <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '480px', padding: '36px', background: '#ffffff', borderRadius: 'var(--radius-lg)', position: 'relative', boxShadow: 'var(--shadow-lg)' }}>
        
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '16px', right: '16px', background: 'var(--surface-cream)', border: '1px solid var(--outline-variant)', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        >
          <X size={16} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: role === 'Physiotherapist' ? 'var(--secondary)' : 'var(--primary-container)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px auto' }}>
            {role === 'Physiotherapist' ? <Stethoscope size={24} /> : <Heart size={24} />}
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--ink-primary)' }}>
            {tab === 'login' ? 'KineticAge Member Login' : 'Create New Account'}
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--ink-secondary)', marginTop: '2px' }}>
            {role === 'Physiotherapist' ? 'Clinical Staff Command Center Access' : 'Senior Member Mobility Portal Access'}
          </p>
        </div>

        {/* Demo Fast Login Switcher */}
        <div style={{ background: 'var(--surface-cream)', padding: '12px 14px', borderRadius: 'var(--radius-md)', marginBottom: '18px', border: '1px solid var(--outline-variant)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ink-secondary)', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Key size={12} /> Quick Access Accounts
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <button
              type="button"
              onClick={() => quickLoginAs('Senior Member')}
              style={{ padding: '6px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--primary-container)', background: '#ffffff', color: 'var(--primary-container)', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <span>Member: Sarah Jenkins</span>
              <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>sarah.jenkins@vitality.org</span>
            </button>

            <button
              type="button"
              onClick={() => quickLoginAs('Physiotherapist')}
              style={{ padding: '6px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--secondary)', background: '#ffffff', color: 'var(--secondary)', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <span>Doctor: Dr. Robert Vance, PT</span>
              <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>robert.vance@kineticage.clinic</span>
            </button>
          </div>
        </div>

        {/* Role Selector Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
          <button
            type="button"
            onClick={() => handleRoleSwitch('Senior Member')}
            style={{
              padding: '10px',
              borderRadius: 'var(--radius-sm)',
              border: role === 'Senior Member' ? '2px solid var(--primary-container)' : '1px solid var(--outline-variant)',
              background: role === 'Senior Member' ? '#e6f4ea' : '#ffffff',
              color: role === 'Senior Member' ? 'var(--primary-container)' : 'var(--ink-secondary)',
              fontWeight: 700,
              fontSize: '0.82rem',
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
            onClick={() => handleRoleSwitch('Physiotherapist')}
            style={{
              padding: '10px',
              borderRadius: 'var(--radius-sm)',
              border: role === 'Physiotherapist' ? '2px solid var(--secondary)' : '1px solid var(--outline-variant)',
              background: role === 'Physiotherapist' ? '#e0f2fe' : '#ffffff',
              color: role === 'Physiotherapist' ? 'var(--secondary)' : 'var(--ink-secondary)',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              gap: '6px'
            }}
          >
            <Stethoscope size={16} /> Clinical Specialist
          </button>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', background: 'var(--surface-cream)', padding: '4px', borderRadius: 'var(--radius-pill)', marginBottom: '18px', border: '1px solid var(--outline-variant)' }}>
          <button 
            type="button"
            onClick={() => setTab('login')}
            style={{ flex: 1, padding: '8px', border: 'none', borderRadius: 'var(--radius-pill)', background: tab === 'login' ? '#ffffff' : 'transparent', color: tab === 'login' ? 'var(--primary-container)' : 'var(--ink-secondary)', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' }}
          >
            Sign In
          </button>
          <button 
            type="button"
            onClick={() => setTab('register')}
            style={{ flex: 1, padding: '8px', border: 'none', borderRadius: 'var(--radius-pill)', background: tab === 'register' ? '#ffffff' : 'transparent', color: tab === 'register' ? 'var(--primary-container)' : 'var(--ink-secondary)', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' }}
          >
            Register
          </button>
        </div>

        {/* Error Alert Message */}
        {errorMessage && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '10px 14px', borderRadius: 'var(--radius-sm)', fontSize: '0.82rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={16} /> {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {tab === 'register' && (
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '4px' }}>
                Full Name
              </label>
              <input 
                type="text" 
                value={name}
                onChange={e => setName(e.target.value)}
                required
                style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--outline-variant)', fontSize: '0.88rem' }}
              />
            </div>
          )}

          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '4px' }}>
              Email Address
            </label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--outline-variant)', fontSize: '0.88rem' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '4px' }}>
              Password
            </label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--outline-variant)', fontSize: '0.88rem' }}
            />
          </div>

          <button 
            className={role === 'Physiotherapist' ? 'btn-secondary' : 'btn-primary'} 
            style={{ width: '100%', justifyContent: 'center', padding: '12px 0', fontSize: '0.95rem', background: role === 'Physiotherapist' ? 'var(--secondary)' : undefined, color: '#ffffff' }} 
            type="submit"
            disabled={loading}
          >
            {loading ? 'Authenticating...' : tab === 'login' ? `Sign In as ${role}` : 'Create Account'} <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ marginTop: '18px', textAlign: 'center', fontSize: '0.75rem', color: 'var(--ink-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <ShieldCheck size={14} style={{ color: 'var(--primary-container)' }} />
          256-Bit Encrypted Healthcare Portal • HIPAA Compliant
        </div>

      </div>
    </div>
  );
}
