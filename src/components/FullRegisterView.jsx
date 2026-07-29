import React, { useState } from 'react';
import { UserPlus, ArrowRight, ShieldCheck } from 'lucide-react';
import { apiService } from '../services/api';

export default function FullRegisterView({ onRegisterSuccess, onGoToLogin }) {
  const [name, setName] = useState('Sarah Jenkins');
  const [email, setEmail] = useState('sarah.jenkins@vitality.org');
  const [age, setAge] = useState('68');
  const [phone, setPhone] = useState('(555) 234-5678');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await apiService.register({ name, email, age, phone, role: 'Senior Member' });
    setLoading(false);
    if (res.success) {
      onRegisterSuccess(res.user);
    }
  };

  return (
    <div style={{ padding: '60px 24px', background: 'var(--surface)', minHeight: 'calc(100vh - 120px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '520px', padding: '40px', background: '#ffffff', borderRadius: 'var(--radius-lg)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'var(--primary-container)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
            <UserPlus size={28} />
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--ink-primary)' }}>
            Senior Member Registration
          </h1>
          <p style={{ fontSize: '0.92rem', color: 'var(--ink-secondary)', marginTop: '6px' }}>
            Stitch Step 3: Register for personalized mobility plans & Medicare coverage
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '6px' }}>
              Full Patient Name
            </label>
            <input 
              type="text" 
              value={name}
              onChange={e => setName(e.target.value)}
              required
              style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--outline-variant)', fontSize: '0.95rem' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '6px' }}>
                Email Address
              </label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--outline-variant)', fontSize: '0.95rem' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '6px' }}>
                Age
              </label>
              <input 
                type="text" 
                value={age}
                onChange={e => setAge(e.target.value)}
                required
                style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--outline-variant)', fontSize: '0.95rem' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '6px' }}>
              Contact Phone
            </label>
            <input 
              type="text" 
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
              style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--outline-variant)', fontSize: '0.95rem' }}
            />
          </div>

          <button 
            className="btn-primary" 
            style={{ width: '100%', justifyContent: 'center', padding: '14px 0', fontSize: '1.05rem' }} 
            type="submit"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Complete Senior Registration'} <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.9rem', color: 'var(--ink-secondary)' }}>
          Already registered?{' '}
          <button 
            onClick={onGoToLogin} 
            style={{ background: 'none', border: 'none', color: 'var(--primary-container)', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}
          >
            Sign In Here (Step 2)
          </button>
        </div>

      </div>
    </div>
  );
}
