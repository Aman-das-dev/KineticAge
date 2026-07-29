import React, { useState } from 'react';
import { UserPlus, ArrowRight, ShieldCheck, Stethoscope, User, Lock, Mail, Phone, Calendar } from 'lucide-react';
import { apiService } from '../services/api';

export default function FullRegisterView({ onRegisterSuccess, onGoToLogin }) {
  const [role, setRole] = useState('Senior Member'); // 'Senior Member' | 'Physiotherapist'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !email.trim() || !password.trim()) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      const res = await apiService.register({ name, email, password, age, phone, role });
      setLoading(false);
      if (res.success && res.user) {
        onRegisterSuccess(res.user);
      } else {
        setErrorMsg(res.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg('Server connection error. Please try again.');
    }
  };

  const handleRoleSwitch = (selectedRole) => {
    setRole(selectedRole);
    setErrorMsg('');
  };

  return (
    <div style={{ padding: '60px 24px', background: 'var(--surface)', minHeight: 'calc(100vh - 120px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '560px', padding: '40px', background: '#ffffff', borderRadius: 'var(--radius-lg)' }}>
        
        {/* Registration Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'var(--primary-container)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
            <UserPlus size={28} />
          </div>
          <h1 style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--ink-primary)' }}>
            Create KineticAge Account
          </h1>
          <p style={{ fontSize: '0.92rem', color: 'var(--ink-secondary)', marginTop: '4px' }}>
            Join India's leading senior wellness & mobility care network
          </p>
        </div>

        {/* Role Toggle Selector */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px' }}>
          <button
            type="button"
            onClick={() => handleRoleSwitch('Senior Member')}
            style={{
              padding: '12px',
              borderRadius: 'var(--radius-sm)',
              border: role === 'Senior Member' ? '2px solid var(--primary-container)' : '1px solid var(--outline-variant)',
              background: role === 'Senior Member' ? '#e6f4ea' : '#ffffff',
              color: role === 'Senior Member' ? 'var(--primary-container)' : 'var(--ink-primary)',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <User size={18} /> Senior Member
          </button>

          <button
            type="button"
            onClick={() => handleRoleSwitch('Physiotherapist')}
            style={{
              padding: '12px',
              borderRadius: 'var(--radius-sm)',
              border: role === 'Physiotherapist' ? '2px solid var(--secondary)' : '1px solid var(--outline-variant)',
              background: role === 'Physiotherapist' ? '#e0f2fe' : '#ffffff',
              color: role === 'Physiotherapist' ? 'var(--secondary)' : 'var(--ink-primary)',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <Stethoscope size={18} /> Physiotherapist / Doctor
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '10px 14px', borderRadius: 'var(--radius-sm)', marginBottom: '16px', fontSize: '0.85rem' }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '6px' }}>
              Full Legal Name *
            </label>
            <input 
              type="text" 
              placeholder={role === 'Physiotherapist' ? "e.g. Dr. Robert Vance, PT" : "e.g. Sarah Jenkins"}
              value={name}
              onChange={e => setName(e.target.value)}
              required
              style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--outline-variant)', fontSize: '0.9rem' }}
            />
          </div>

          {/* Email & Password */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '6px' }}>
                Email Address *
              </label>
              <input 
                type="email" 
                placeholder="name@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--outline-variant)', fontSize: '0.9rem' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '6px' }}>
                Create Password *
              </label>
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--outline-variant)', fontSize: '0.9rem' }}
              />
            </div>
          </div>

          {/* Age & Phone */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '6px' }}>
                Age
              </label>
              <input 
                type="number" 
                placeholder="68"
                value={age}
                onChange={e => setAge(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--outline-variant)', fontSize: '0.9rem' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '6px' }}>
                Contact Phone (+91)
              </label>
              <input 
                type="text" 
                placeholder="+91 98765 43210"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--outline-variant)', fontSize: '0.9rem' }}
              />
            </div>
          </div>

          <button 
            className="btn-primary" 
            style={{ width: '100%', justifyContent: 'center', padding: '12px 0', fontSize: '1rem' }} 
            type="submit"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : `Register as ${role}`} <ArrowRight size={18} />
          </button>
        </form>

        {/* Footer Link */}
        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.88rem', color: 'var(--ink-secondary)' }}>
          Already have a KineticAge account?{' '}
          <button 
            onClick={onGoToLogin} 
            style={{ background: 'none', border: 'none', color: 'var(--primary-container)', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}
          >
            Sign In Here
          </button>
        </div>

        <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '0.78rem', color: 'var(--ink-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <ShieldCheck size={14} style={{ color: 'var(--emerald-accent)' }} /> 256-Bit Encrypted Healthcare Portal • HIPAA Compliant
        </div>

      </div>
    </div>
  );
}
